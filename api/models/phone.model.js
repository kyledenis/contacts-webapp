module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        number: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        contactId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "contacts",
                key: "id",
            },
        },
    });

    return Phone;
};
