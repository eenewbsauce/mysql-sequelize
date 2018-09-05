const sequelize = require('sequelize');

class BaseModel {
    constructor(params) {
        if (!params.connection) {
            throw new Error('Missing "connection" parameter');
        }

        if (!params.model) {
            throw new Error('Missing "model" parameter');
        }

        this.connection = params.connection;
        this.model = params.model;
    }

    connect() {
        return this
            .connection
            .authenticate();
    }

    count(params) {
        return this
            .connect()
            .then(() => {
                return this.model.count(params);
            });
    }

    insert(params) {
        const isBulk = Array.isArray(params);

        this
            .connect()
            .then(() => isBulk ? this.model.bulkCreate(params, { ignoreDuplicates: true }) : this.model.create(params));
    }

    get(params = {}) {
        return this
            .connect()
            .then(() => {
                return this.model.findAll(params);
            });
    }

}

module.exports = BaseModel;