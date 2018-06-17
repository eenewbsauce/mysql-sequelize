const sequelize = require('sequelize');

class BaseModel {
    constructor(params) {
        if (!params.connection) {
            throw new Error('Missing "connection" parameter');
        }

        if (!params.model) {``
            throw new Error('Missing "model" parameter');
        }

        this.connection = params.connection;
        this.model = params.model;
    }

    insert(params) {
        const isBulk = Array.isArray(params);

        this
            .connection
            .authenticate()
            .then(() => isBulk ? this.model.bulkCreate(params, { ignoreDuplicates: true }) : this.model.create(params));
    }

}

module.exports = BaseModel;