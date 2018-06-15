const Sequelize = require('sequelize');

class Db {
    constructor(params = {}) {
        this.host = params.host;
        this.password = params.password;
        this.username = params.username;
        this.schema = params.schema;

        this.sequelize = new Sequelize(this.schema, this.username, this.password, {
            host: this.host,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            operatorsAliases: false
        });
    }
}

module.exports = Db;