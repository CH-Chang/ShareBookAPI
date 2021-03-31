const pool = require("../utils/SQLHelper");

const Product = class Product{
    constructor(id, product, store, book, allowwrite, status, price){
        this.id = id;
        this.product = product;
        this.store = store;
        this.book = book;
        this.allowwrite = allowwrite;
        this.status = status;
        this.price = price;
    }

    static searchProduct(keyword, city, district, university, delivery, resource, payment, other, review){
        if(!keyword) return;

        let cmd = "";

        // 處理基礎keyword
        cmd += `
            SELECT * 
            FROM product AS PR
            LEFT JOIN productdelivery AS PD ON PD.product=PR.id
            LEFT JOIN productpayment as PP ON PP.product=PR.id
            LEFT JOIN store AS S ON PR.store=S.id
            LEFT JOIN storeresource AS SR ON S.resource=SR.id
            LEFT JOIN book AS B ON PR.book=B.id
            LEFT JOIN publisher AS P ON B.publisher=P.id
            LEFT JOIN bookauthor AS BA ON BA.book=B.id
            LEFT JOIN author AS A ON BA.author=A.id
            WHERE (B.title LIKE "%${keyword}%" OR B.isbn LIKE "%${keyword}%" OR P.publisher LIKE "%${keyword}%" OR A.author LIKE "%${keyword}%" OR PR.product LIKE "%${keyword}%")
        `;

        // 處理篩選area
        if(city && district){
            cmd += ` AND S.district=${district}`;
        }

        // 處理篩選大學
        if(university){
            cmd += ` AND S.university IN (${university.toString()})`;
        }

        // 處理篩選交貨方式
        if(delivery){
            cmd += ` AND PD.delivery IN (${delivery.toString()})`;
        }

        // 處理商店來源
        if(resource){
            cmd += ` AND S.resource IN (${resource.toString()})`;
        }

        // 處理付款方式
        if(payment){
            cmd += ` AND PP.payment IN (${payment.toString()})`;
        }

        // 處理評價 暫時不寫
        if(review){

        }

        // 結尾
        cmd += ";";

        console.log(cmd);

        return pool.execute(cmd);
    }
}

module.exports = Product;