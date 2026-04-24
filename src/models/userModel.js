const { sequelize } = require("../config/dbConfig");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
    'User',
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 20]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 20]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Please enter a valid email address."
                }
            }

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING,
        }
    },
    {
        tableName: 'users',
    },
);

module.exports = User;