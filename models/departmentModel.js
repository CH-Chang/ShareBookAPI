const pool = require("../utils/SQLHelper");

const Department = class Department {
    constructor(id, department, college, phoneextension, fax, email, website){
        this.id = id;
        this.department = department;
        this.college = college;
        this.phoneextension = phoneextension;
        this.fax = fax;
        this.email = email;
        this.website = website;
    }

    static getAllSchool(){
        return pool.execute("SELECT U.id AS universityId, U.universityTW AS universityTW, C.id AS collegeId, C.college AS college, D.id AS departmentId, D.department AS department FROM department AS D, college AS C, university AS U WHERE C.id=D.college AND C.university=U.id ORDER BY U.id, C.id, D.id;")
    }
}

module.exports = Department;