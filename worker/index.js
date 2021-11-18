const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000, // on disconnect, try to reconnect every 1000 ms
});

const sub = redisClient.duplicate(); // recommended by docs

const fib = (index) => {
  if (index < 2) {
    return 1;
  }
  return fib(index - 1) + fib(index - 2);
};

sub.on("message", (channel, message) => {
  redisClient.hset("values", message, fib(parseInt(message)));
});

sub.subscribe("insert");
