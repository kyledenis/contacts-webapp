const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    console.log("Received POST request for contact creation");
    console.log("Request Headers:", req.headers);

    if (!req.body.name) {
        console.log("Name field is empty, aborting operation");
        res.status(400).send({
            message: "Name cannot be empty",
        });
        return;
    }

    const contact = {
        name: req.body.name,
    };

    console.log(`Attempting to create contact with name: ${contact.name}`);

    Contacts.create(contact)
        .then((data) => {
            console.log("Contact successfully created:", data);
            res.send(data);
        })
        .catch((err) => {
            console.log("Error encountered:", err);
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while creating the contact",
            });
        });
};

// Get all contacts
exports.findAll = (_req, res) => {
    console.log("Received GET request to fetch all contacts");

    Contacts.findAll({ include: ["phones"] })
        .then((data) => {
            console.log(`Retrieved ${data.length} contacts`);
            res.send(data);
        })
        .catch((err) => {
            console.log("Error encountered:", err);
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while retrieving contacts",
            });
        });
};

// Get one contact by id
exports.findOne = (req, res) => {
    const contactId = req.params.contactId;
    console.log(`Received GET request to fetch contact with id: ${contactId}`);

    Contacts.findByPk(contactId, { include: ["phones"] })
        .then((data) => {
            if (!data) {
                console.log(`Contact with id ${contactId} not found`);
                res.status(404).send({
                    message: `Contact with id ${contactId} not found`,
                });
            } else {
                console.log(`Contact found:`, data);
                res.send(data);
            }
        })
        .catch((err) => {
            console.log("Error encountered:", err);
            res.status(500).send({
                message: `Error retrieving contact with id ${contactId}`,
            });
        });
};

// Update one contact by id
exports.update = (req, res) => {
    const contactId = req.params.contactId;
    console.log(`Received PUT request to update contact with id: ${contactId}`);

    Contacts.update(req.body, { where: { contactId } })
        .then((num) => {
            console.log(`Number of records updated: ${num}`);

            if (num === 1) {
                res.send({
                    message: `Contact with id ${contactId} was updated successfully`,
                });
            } else {
                console.log(
                    `Cannot update contact with id ${contactId}. Contact not found`,
                );
                res.send({
                    message: `Cannot update contact with id ${contactId}. Contact not found`,
                });
            }
        })
        .catch((err) => {
            console.log("Error encountered:", err);
            res.status(500).send({
                message: `Error updating contact with id ${contactId}`,
            });
        });
};

// Delete one contact by id
exports.delete = (req, res) => {
    // Log the request information
    console.log("Received DELETE request for contact deletion");
    console.log("Request Headers:", req.headers);

    const contactId = req.params.contactId;

    // Log the variable
    console.log(`Attempting to delete contact with id: ${contactId}`);

    Contacts.destroy({ where: { id: contactId } })
        .then((num) => {
            // Log the result of database operation
            console.log(`Number of records deleted: ${num}`);

            if (num === 1) {
                res.send({
                    message: `Contact with id ${contactId} was deleted successfully`,
                });
            } else {
                res.send({
                    message: `Cannot delete contact with id ${contactId}. Contact not found`,
                });
            }
        })
        .catch((err) => {
            // Log the error
            console.log("Error encountered:", err);

            res.status(500).send({
                message: `Error deleting contact with id ${id}`,
            });
        });
};
