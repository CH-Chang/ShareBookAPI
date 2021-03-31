const pool = require("../utils/SQLHelper");

const District = class District{
    constructor(id, district, zipcode, city){
        this.id = id;
        this.district = district;
        this.zipcode = zipcode;
        this.city = city;
    }

    static getAllDistrict(){
        return pool.execute("SELECT * FROM district;");
    }
    static getAllDistrictWithCity(){
        return pool.execute("SELECT C.id AS cityId, C.city AS cityName, D.id AS districtId, D.district AS districtName, D.zipcode AS zipcode FROM district AS D LEFT JOIN city AS C ON D.city=C.id ORDER BY cityId, districtId;");
    }

    static getDistrictById(districtId){
        return pool.execute("SELECT * FROM district WHERE id=?;", [districtId]);
    }

    
}

module.exports = District;