const redis = require("redis");
const logger = require("../config/logger");
const client = new redis.createClient();
class RedisService {
  setCache(key, value) {
    return new Promise((resolve, reject) => {
      client.set(key, value, (err, result) => {
        if (err) {
          reject(err);
        } else if (result == "OK") {
          console.log(`\n\n\tResult of setting --> ${result}`);
          resolve(result);
        } else {
          reject(false);
        }
      });
    });
  }

  async getCache(key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async deleteKeys(key) {
    return new Promise((resolve, reject) => {
      client.del(key, (err, data) => {
        if (err) {
          reject(err);
        } else {
          console.log("----> deleting result -->", data);
          resolve(data);
        }
      });
    });
  }

  async flushRedis() {
    return new Promise((resolve, reject) => {
      client.flushdb((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
module.exports = new RedisService();
