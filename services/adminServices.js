const bookModel = require("../model/admin");
const redisDb = require('./cache')
const logger = require("../config/logger")
module.exports = class AdminServices {
  async refreshRedis(uniqueId) {
    try {
      let redisResult = await redisDb.deleteKeys(uniqueId)
      logger.info("redis result", redisResult)
      if (redisResult) {
        return redisResult
      }
      else {
        return false
      }
    } catch (error) {
      logger.error(error)
      return error
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

            if (data !== null) {
              let refreshResult = this.refreshRedis(uniqueId)
              if (refreshResult) {
                logger.info(`Redis refreshed !`)
                return { "success": true, "message": "Books added SUCCESFULLY !", "data": data }
              } else { // problem occured while refreshing redis
                logger.info(`Redis not refreshed .`)
                return { "success": true, "message": "books added SUCCESFULLY (NO DATA IN REDIS TO REFRESH )", "data": noteResult }
              }
            }
            else {
              reject({ message: "data not received" })
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
  getAllBooksService = (req) => {
    let findQuery = {
      find: req.find,
    };
    try {
      return new Promise((resolve, reject) => {
        bookModel
          .getBooks(findQuery)
          .then((data) => {
            resolve(data);

            if (data.length > 0) {

              let key = "books1234";
              let redisResult = redisDb.setCache(key, JSON.stringify(data))
              logger.info('redis result ', redisResult)
              return { "success": true, "message": "ALL BOOKS LOADED SUCCESSFULLY !", "data": data }
            }
            else {
              reject(err)
            }
          })
          .catch((err) => reject(err));
      });
    } catch (err) {
      return err
    }
  };
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
      let enteredData = searchingData.search
      let findingQuery = {
        $and: [{
          $or:
            [
              { 'bookName': { $regex: enteredData, $options: 'i' } },
              { 'description': { $regex: enteredData, $options: 'i' } },
              { 'authorName': { $regex: enteredData, $options: 'i' } },
              { 'price': { $regex: enteredData } },
              { 'quantity': { $regex: enteredData } }
            ]
        }]
      }
      let searchResultArray = await bookModel.searchingBooks(findingQuery)
      logger.info("Result of searching --> ", searchResultArray);

      if (searchResultArray.length > 0) {
        return { "success": true, "message": "ALL books FOUND !", "data": searchResultArray }
      } else {
        return { "success": false, "message": "NO books FOUND !", "data": searchResultArray }
      }

    } catch (error) {
      logger.error(error);
      let response = {}
      response.success = false
      response.message = `ERROR IN SERVICE`
      response.error = error
      return response
    }
  }
}