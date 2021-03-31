const pool = require("../utils/SQLHelper");

const Delivery = class Delivery {
    constructor(id, delivery){
        this.id = id;
        this.delivery = delivery;
    }

    static getAllDelivery(){
        return pool.execute("SELECT * FROM delivery;");
    }
}

module.exports = Delivery;