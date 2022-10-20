// const { create } = require('domain')
// const { async } = require('q')
const { client } = require('./')

const {regulators} = require('./regulatorsData')

async function createTables() {
    try {
        await client.query(`
            CREATE TABLE regulators(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                affiliation VARCHAR(255) UNIQUE NOT NULL,
                accuracy INTEGER NOT NULL,
                draw INTEGER NOT NULL
            );
        `);
    } catch (error) {
        console.log("create tables error",error)
    }
}

async function dropTables() {

    try {
        await client.query(`
            DROP TABLE IF EXISTS regulators;
        `
        )
    } catch (error) {
        console.log("drop tables error",error)
    } 

}

async function buildTables() {
    try {
        client.connect();

        dropTables();

        console.log("tables dropped");

        createTables();
        console.log('tables created')
    } catch (error) {
        console.log("this is the error",error);
    }
}

buildTables()
.catch(console.error)
.finally(() => client.end());