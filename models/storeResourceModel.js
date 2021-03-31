const pool = require("../utils/SQLHelper");

const StoreResource = class StoreResource{
    constructor(id, storeresource){
        this.id = id;
        this.storeresource = storeresource;
    }

    static getAllStoreResource(){
        return pool.execute("SELECT * FROM storeresource;");
    }
} 

module.exports = StoreResource;