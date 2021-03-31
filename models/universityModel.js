const pool = require("../utils/SQLHelper");

const University = class University {
    constructor(id, universityTW, universityEN, universityType, universitySystem, city, district, address, phone, fax, website){
        this.id = id;
        this.universityEN = universityEN;
        this.universityTW = universityTW;
        this.universityType = universityType;
        this.universitySystem = universitySystem;
        this.city = city;
        this.district = district;
        this.address = address;
        this.phone = phone;
        this.fax = fax;
        this.website = website;
    }

    static getAllUniversity(){
        return pool.execute("SELECT * FROM university;");
    }

    static getUniversityById(id){
        return pool.execute("SELECT * FROM university WHERE id=? ;", [id]);
    }
}

module.exports = University;