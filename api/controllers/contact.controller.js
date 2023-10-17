const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Name cannot be empty",
        });
        return;
    }

    const contact = {
        name: req.body.name,
    };

    Contacts.create(contact)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while creating the contact",
            });
        });
};

// Get all contacts
exports.findAll = (_req, res) => {
    Contacts.findAll({ include: ["phones"] })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while retrieving contacts",
            });
        });
};

// Get one contact by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Contacts.findByPk(id, { include: ["phones"] })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Contact with id ${id} not found`,
                });
            } else {
                res.send(data);
            }
        })
        .catch((_err) => {
            res.status(500).send({
                message: `Error retrieving contact with id ${id}`,
            });
        });
};

// Update one contact by id
exports.update = (req, res) => {
    const id = req.params.id;

    Contacts.update(req.body, { where: { id } })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: `Contact with id ${id} was updated successfully`,
                });
            } else {
                res.send({
                    message: `Cannot update contact with id ${id}. Contact not found`,
                });
            }
        })
        .catch((_err) => {
            res.status(500).send({
                message: `Error updating contact with id ${id}`,
            });
        });
};

// Delete one contact by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Contacts.destroy({ where: { id } })
        .then((num) => {
            
            if (num == 1) {
                res.send({
                    message: `Contact with id ${id} was deleted successfully`,
                });
            } else {
                res.send({
                    message: `Cannot delete contact with id ${id}. Contact not found`,
                });
            }
        })
        .catch((_err) => {
            res.status(500).send({
                message: `Error deleting contact with id ${id}`,
            });
        });
};
