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
}

module.exports = ApiFeatures;
