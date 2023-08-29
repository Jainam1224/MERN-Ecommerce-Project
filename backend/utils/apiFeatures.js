class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            // Here regex is used to get internal searching like jain is our keyword then jainam will also be our search result.
            // also option: "i" mean case in-sensitive so ABC is our keyword then abc would also be our search result.
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this; // return this class itself
  }

  filter() {
    // To create the copy of queryStr if we do below approach then it is wrong as this.queryStr is an object and it is passed by reference and so if we change queryCopy it will update queryStr as well.
    // const queryCopy = this.queryStr;

    const queryCopy = { ...this.queryStr }; // pass by value.

    // Removing some fields from category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter for price and ratings
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr)); // filtering on basis of category
    return this; // return this class itself
  }
}

module.exports = ApiFeatures;
