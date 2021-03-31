const Redis = require("redis");
const AsyncRedis = require("async-redis");

const client = Redis.createClient({
    host: "127.0.0.1",
    port: 6379
})

const asyncClient = AsyncRedis.decorate(client);

module.exports = asyncClient;