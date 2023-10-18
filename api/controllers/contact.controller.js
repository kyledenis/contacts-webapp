const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

const logRequestStart = (message) => {
    console.log("---------- NEW REQUEST ----------");
    console.log(message);
};

const logError = (message, err) => {
    console.log(message, err);
};

const sendError = (res, message, status = 500) => {
    res.status(status).send({
        message,
    });
};

const validateRequest = (req, res) => {
    if (!req.body.name) {
        logError("Name field is empty, aborting operation");
        sendError(res, "Name cannot be empty", 400);
        return false;
    }
    return true;
};

// Create contact
exports.create = (req, res) => {
    logRequestStart("Received POST request for contact creation");

    if (!validateRequest(req, res)) return;

    const contact = {
        name: req.body.name,
    };

    Contacts.create(contact)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            logError("Error encountered:", err);
            sendError(
                res,
                err.message || "An error occurred while creating the contact",
            );
        });
};

// Get all contacts
exports.findAll = (_req, res) => {
    logRequestStart("Received GET request to fetch all contacts");

    Contacts.findAll({ include: ["phones"] })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            logError("Error encountered:", err);
            sendError(
                res,
                err.message || "An error occurred while retrieving contacts",
            );
        });
};

// Get one contact by id
exports.findOne = (req, res) => {
    const contactId = req.params.contactId;

    logRequestStart(
        "Received GET request to fetch contact with id:",
        contactId,
    );

    Contacts.findByPk(contactId, { include: ["phones"] })
        .then((data) => {
            if (!data) {
                sendError(res, `Contact with id ${contactId} not found`, 404);
            } else {
                res.send(data);
            }
        })
        .catch((err) => {
            logError("Error encountered:", err);
            sendError(res, `Error retrieving contact with id ${contactId}`);
        });
};

// Update one contact by id
exports.update = (req, res) => {
    const contactId = req.params.contactId;

    logRequestStart(
        `Received PUT request to update contact (id: ${contactId})`,
    );

    Contacts.update(req.body, { where: { id: contactId } })
        .then((num) => {
            if (num === 1) {
                res.send({
                    message: `Contact with id ${contactId} was updated successfully`,
                });
            } else {
                sendError(
                    res,
                    `Cannot update contact with id ${contactId}. Contact not found`,
                    404,
                );
            }
        })
        .catch((err) => {
            logError("Error encountered:", err);
            sendError(res, `Error updating contact with id ${contactId}`);
        });
};

// Delete one contact by id
exports.delete = (req, res) => {
    const contactId = req.params.contactId;

    logRequestStart(
        `Received DELETE request for contact deletion (id: ${contactId})`,
    );

    Contacts.destroy({ where: { id: contactId } })
        .then((num) => {
            if (num === 1) {
                res.send({
                    message: `Contact with id ${contactId} was deleted successfully`,
                });
            } else {
                sendError(
                    res,
                    `Cannot delete contact with id ${contactId}. Contact not found`,
                    404,
                );
            }
        })
        .catch((err) => {
            logError("Error encountered:", err);
            sendError(res, `Error deleting contact with id ${contactId}`);
        });
};
