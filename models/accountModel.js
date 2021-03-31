const pool = require("../utils/SQLHelper");

const Account = class Account{
    constructor(id, account, password, name, nickname, sex, birthday, email, phone, cellphone, address, timestamp){
        this.id = id;
        this.account = account;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.sex = sex;
        this.birthday = birthday;
        this.email = email;
        this.phone = phone;
        this.cellphone = cellphone;
        this.address = address;
        this.timestamp = timestamp;
    }

    static loginByAccount(account, hashedPassword){
        return pool.execute('SELECT A.id AS accountId, A.account AS account, A.firstName AS firstName, A.secondName AS secondName, A.nickname AS nickname, A.sex AS sex, A.birthday AS birthday, A.email AS email, A.phone AS phone, A.cellphone AS cellphone, C.id AS cityId, C.city AS city, D.id AS districtId, D.district AS district, A.address AS address, A.timestamp AS timestamp FROM account AS A, city AS C, district AS D WHERE D.city=C.id AND D.id=A.district AND A.account=? AND A.password=?;', [account, hashedPassword]);
    }

    static register(account, password, firstName, secondName, nickName, sex, birthday, email, phone, cellphone, district, address){
        return pool.execute('INSERT INTO account (account, password, firstName, secondName, nickName, sex, birthday, email, phone, cellphone, district, address) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);', [account, password, firstName, secondName, nickName, sex, birthday, email, phone, cellphone, district, address]);
    }

    static getAccountByEmail(email){
        return pool.execute('SELECT * FROM account WHERE email=?;', [email]);
    }

    static getAccountByCellphone(cellphone){
        return pool.execute('SELECT * FROM account WHERE cellphone=?;', [cellphone]);
    }

    static getAccountByAccount(account){
        return pool.execute('SELECT * FROM account WHERE account=?;', [account]);
    }
}

module.exports = Account;