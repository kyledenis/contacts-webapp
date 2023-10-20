const db = require("../models");
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

const validatePhoneRequest = (req, res) => {
    if (!req.body.name || !req.body.number || !req.body.contactId) {
        logError("Missing fields, aborting operation");
        sendError(res, "Name, Number and ContactID cannot be empty", 400);
        return false;
    }
    return true;
};

// Create phone
exports.create = (req, res) => {
    logRequestStart("Received POST request for phone creation");

    if (!validatePhoneRequest(req, res)) return;

    const phone = {
        name: req.body.name,
        number: req.body.number,
        contactId: req.body.contactId,
    };

    Phones.create(phone)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            logError("Error encountered:", err);
            sendError(
                res,
                err.message ||
                    "An error occurred while creating the phone number",
            );
        });
};

// Get all phones
exports.findAll = (req, res) => {
    logRequestStart("Received GET request to fetch all phone numbers");

    Phones.findAll({ where: { contactId: req.params.contactId } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            logError("Error encountered:", err);
            sendError(
                res,
                err.message ||
                    "An error occurred while retrieving phone numbers",
            );
        });
};

// Get one phone by id
exports.findOne = (req, res) => {
    const phoneId = req.params.phoneId;

    logRequestStart(`Received GET request to fetch phone with id: ${phoneId}`);

    Phones.findByPk(phoneId)
        .then((data) => {
            if (!data) {
                sendError(
                    res,
                    `Phone number with id ${phoneId} not found`,
                    404,
                );
            } else {
                res.send(data);
            }
        })
        .catch((err) => {
            logError("Error encountered:", err);
            sendError(
                res,
                err.message ||
                    `Error retrieving phone number with id ${phoneId}`,
            );
        });
};

// Update one phone by id
exports.update = (req, res) => {
    const phoneId = req.params.phoneId;

    logRequestStart(`Received PUT request to update phone (id: ${phoneId})`);

    Phones.update(req.body, { where: { id: phoneId } })
        .then((num) => {
            if (num === 1) {
                res.send({
                    message: `Phone number with id ${phoneId} was updated successfully`,
                });
            } else {
                sendError(
                    res,
                    `Cannot update phone number with id ${phoneId}. Phone not found`,
                    404,
                );
            }
        })
        .catch((err) => {
            logError("Error encountered:", err);
            sendError(
                res,
                err.message || `Error updating phone number with id ${phoneId}`,
            );
        });
};

// Delete one phone by id
exports.delete = (req, res) => {
    const phoneId = req.params.phoneId;

    logRequestStart(
        `Received DELETE request for phone deletion (id: ${phoneId})`,
    );

    Phones.destroy({ where: { id: phoneId } })
        .then((num) => {
            if (num === 1) {
                res.send({
                    message: `Phone number with id ${phoneId} was deleted successfully`,
                });
            } else {
                sendError(
                    res,
                    `Cannot delete phone number with id ${phoneId}. Phone not found`,
                    404,
                );
            }
        })
        .catch((err) => {
            logError("Error encountered:", err);
            sendError(
                res,
                err.message || `Error deleting phone number with id ${phoneId}`,
            );
        });
};
