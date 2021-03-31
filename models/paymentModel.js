const pool = require("../utils/SQLHelper");

const Payment = class Payment{
    constructor(id, payment){
        this.id = id;
        this.payment = payment;
    }

    static getAllPayment(){
        return pool.execute("SELECT * FROM payment;");
    }
}

module.exports = Payment;