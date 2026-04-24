const { Sequelize } = require('sequelize');
const dbName = process.env.DATABASE_NAME
const dbUsername = process.env.DATABASE_USERNAME
const dbPassword = process.env.DATABASE_PASSWORD

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


module.exports = { sequelize, testConnection }