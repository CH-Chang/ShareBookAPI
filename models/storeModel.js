const pool = require("../utils/SQLHelper");

const Store = class Store{
    constructor(id, store, account, district, university, resource){
        this.id = id;
        this.store = store;
        this.account = account;
        this.district = district;
        this.university = university;
        this.resource = resource;
    }

    static getStoreByAccountId(accountId){
        return pool.execute("SELECT S.id AS storeId, S.store AS storeName, A.id AS accountId, A.account AS account, C.id AS cityId, C.city AS city, D.id AS districtId, D.district AS district, U.id AS universityId, U.universityTW AS university, SR.id AS resourceId, SR.storeresource AS resource FROM store AS S, account AS A, city AS C, district AS D, storeresource AS SR, university AS U WHERE S.account=A.id AND D.city=C.id AND S.district=D.id AND S.resource=SR.id AND U.id=S.university AND A.id=?;", [accountId])
    }
}

module.exports = Store;