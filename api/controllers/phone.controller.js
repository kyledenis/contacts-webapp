const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
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
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while creating the phone number",
            });
        });
};

// Get all phones
exports.findAll = (req, res) => {
    Phones.findAll({ where: { contactId: req.params.contactId } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while retrieving phone numbers",
            });
        });
};

// Get one phone by id
exports.findOne = (req, res) => {
    const phoneId = req.params.phoneId;

    Phones.findByPk(phoneId)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Phone number with id ${phoneId} not found`,
                });
            } else {
                res.send(data);
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    `An error occurred while retrieving phone number with id ${phoneId}`,
            });
        });
};

// Update one phone by id
exports.update = (req, res) => {
    const phoneId = req.params.phoneId;

    Phones.update(req.body, { where: { id: phoneId } })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: `Phone number with id ${phoneId} was updated successfully`,
                });
            } else {
                res.send({
                    message: `Phone number with id ${phoneId} was not found`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    `An error occurred while updating phone number with id ${phoneId}`,
            });
        });
};

// Delete one phone by id
exports.delete = (req, res) => {
    const phoneId = req.params.phoneId;

    Phones.destroy({ where: { id: phoneId } })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: `Phone number with id ${phoneId} was deleted successfully`,
                });
            } else {
                res.send({
                    message: `Phone number with id ${phoneId} was not found`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    `An error occurred while deleting phone number with id ${phoneId}`,
            });
        });
};
