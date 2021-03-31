const pool = require("../utils/SQLHelper");


const SchoolVerify = class SchoolVerify {
    constructor(id, account, title, department, schoolemail, timestamp){
        this.id = id;
        this.account = account;
        this.title = title;
        this.department = department;
        this.schoolemail = schoolemail;
        this.timestamp = timestamp;
    }

    static getSchoolVerifyByAccountId(accountId){
        return pool.execute("SELECT SV.id as schoolVerifyId, SV.account AS accountId, U.id as universityId, U.universityTW as university, C.id as collegeId, C.college as college, D.id as departmentId, D.department as department, ST.id as schooltitleId, ST.schooltitle as schooltitle, SV.schoolemail as schoolemail, SV.timestamp as timestamp FROM schoolverify AS SV, department AS D, college AS C, university AS U, schooltitle AS ST WHERE D.college=C.id AND C.university=U.id AND SV.department=D.id AND ST.id=SV.title AND SV.account=?;", [accountId]);
    }

    static verify(accountId, department, schoolEmail){
        return pool.execute("INSERT INTO schoolverify (account, title, department, schoolemail) VALUE (?,1,?,?);", [accountId, department, schoolEmail]);
    }
}

module.exports = SchoolVerify;