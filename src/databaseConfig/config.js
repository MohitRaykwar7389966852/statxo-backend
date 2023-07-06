require("dotenv").config();

const config = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    server: process.env.DATABASE_SERVER,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    authentication: {
        type: "default",
    },
    options: {
        encrypt: true,
    },
    connectionPool: {
        max: 100, 
        min: 0,
        // idleTimeoutMillis: 30000
    },
    requestTimeout: 30000
};
console.log("starting...");

module.exports = config;
