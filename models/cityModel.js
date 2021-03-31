const pool = require("../utils/SQLHelper");

const City = class City {
    constructor(id, city){
        this.id = id;
        this.city = city;
    }

    static getAllCity(){
        return pool.execute("SELECT * FROM city;");
    }
}

module.exports = City;