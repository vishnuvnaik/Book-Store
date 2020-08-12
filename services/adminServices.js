const bookModel = require("../model/admin");
const redisDb = require("./cache");
const logger = require("../config/logger");
module.exports = class AdminServices {
  async refreshRedis(uniqueId) {
    try {
      let redisResult = await redisDb.deleteKeys(uniqueId);
      logger.info("redis result", redisResult);
      if (redisResult) {
        return redisResult;
      } else {
        return false;
      }
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
  addBooks = (req) => {
    try {
      let uniqueId = "books1234";
      return new Promise((resolve, reject) => {
        bookModel
          .addBooks(req)
          .then((data) => {
            resolve(data);

            if (data !== null && data.length <= 0) {
              let refreshResult = this.refreshRedis(uniqueId);
              if (refreshResult) {
                logger.info(`Redis refreshed !`);
                return {
                  success: true,
                  message: "Books added SUCCESFULLY !",
                  data: data,
                };
              } else {
                // problem occured while refreshing redis
                logger.info(`Redis not refreshed .`);
                return {
                  success: true,
                  message:
                    "books added SUCCESFULLY (NO DATA IN REDIS TO REFRESH )",
                  data: data,
                };
              }
            } else {
              reject({ message: "data not received" });
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      return err;
    }
  };
  async getAllBooksService(req) {
    let findQuery = {
      find: req.find,
    };
    try {
      let result = await redisDb.getCache("books1234");
      if (result) {
        //checking for the data present in redis cache
        //books retrieved from redis database
        // normal request to get all books without giving page no and size
        if (req.pageNo === undefined || req.size === undefined) {
          logger.info(`A request is being made without pagination !`);
          return {
            success: true,
            message: "ALL BOOKS LOADED SUCCESSFULLY !",
            data: JSON.parse(result),
          };
        } else {
          // request with page no and size
          let pageNo = parseInt(req.pageNo);
          let size = parseInt(req.size);
          logger.info(
            `A request is being made with pagination ! Page no - ${pageNo} , Size - ${size}`
          );

          let parsedResult = JSON.parse(result);
          logger.info("All books --->", parsedResult);
          //slice used for pagination
          let sliceResult = await parsedResult.slice(
            (pageNo - 1) * size,
            pageNo * size
          ); //range is set here

          if (sliceResult.length > 0) {
            logger.info("Redis result", sliceResult);
            return {
              success: true,
              message: "ALL Books LOADED SUCCESSFULLY !",
              data: sliceResult,
            };
          }
        }
      } else {
        return new Promise((resolve, reject) => {
          bookModel
            .getBooks(findQuery)
            .then((data) => {
              if (data.length > 0) {
                let key = "books1234";
                let redisResult = redisDb.setCache(key, JSON.stringify(data));
                logger.info("redis result ", redisResult);
                return {
                  success: true,
                  message: "ALL BOOKS LOADED SUCCESSFULLY !",
                  data: data,
                };
              } else {
                reject(err);
              }
            })
            .catch((err) => reject(err));
        });
      }
    } catch (err) {
      return err;
    }
  }
  updateBooks = (_id, req) => {
    return new Promise((resolve, reject) => {
      bookModel
        .updateBook(_id, req)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  deleteBook = (_id) => {
    return new Promise((resolve, reject) => {
      bookModel
        .deleteBook(_id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  async searchingBooks(searchingData) {
    try {
      let enteredData = searchingData.search;
      let findingQuery = {
        $and: [
          {
            $or: [
              { bookName: { $regex: new RegExp(enteredData) } },
              { description: { $regex: new RegExp(enteredData) } },
              { authorName: { $regex: new RegExp(enteredData) } },
              // { price: { $regex: enteredData } },
              // { quantity: { $regex: enteredData } },
            ],
          },
        ],
      };
      let searchQuery = { findingQuery };
      let searchResultArray = await bookModel.searchingBooks(searchQuery);
      logger.info("Result of searching --> ", searchResultArray);

      if (searchResultArray.length > 0) {
        return {
          success: true,
          message: "ALL books FOUND !",
          data: searchResultArray,
        };
      } else {
        return {
          success: false,
          message: "NO books FOUND !",
          data: searchResultArray,
        };
      }
    } catch (error) {
      logger.error(error);
      let response = {};
      response.success = false;
      response.message = `ERROR IN SERVICE`;
      response.error = error;
      return response;
    }
  }
};
