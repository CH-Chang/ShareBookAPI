const districtModel = require("../../models/districtModel");
const universityModel = require("../../models/universityModel");
const storeResourceModel = require("../../models/storeResourceModel");
const deliveryModel = require("../../models/deliveryModel");
const paymentModel = require("../../models/paymentModel");
const productModel = require("../../models/productModel");

exports.getSuggestion = async (req, res, next) => {
    return res.json({
        res: 0,
        msg: "成功",
        data: [
            {
                title: "普通物理",
                link: "普通物理"
            },
            {
                title: "初級會計學",
                link: "初級會計學"
            },
            {
                title: "管理學",
                link: "管理學"
            },
            {
                title: "希臘文學",
                link: "希臘文學"
            },
            {
                title: "Python程式設計",
                link: "Python程式設計"
            },
            
        ]
    })
}

exports.search = async (req, res, next) => {

    // 取得參數
    let keyword = req.query.keyword;
    let city = req.query.city;
    let district = req.query.district;
    let university = req.query.university;
    let delivery = req.query.delivery;
    let resource = req.query.resource;
    let other = req.query.other;
    let payment = req.query.payment;
    let review = req.query.review;

    // 整理參數
    try{
        if(city){
            if(city=="undefined") city = undefined;
            else city = Number(city);
        }
        if(district){
            if(district=="undefined") district = undefined;
            else district = Number(district);
        }
        if(university){
            university = university.split(",");
            for(let i=0;i<university.length;i++){
                university[i] = Number(university[i]);
            }
        }
        if(delivery){
            delivery = delivery.split(",");
            for(let i=0;i<delivery.length;i++){
                delivery[i] = Number(delivery[i]);
            }
        }
        if(resource){
            resource = resource.split(",");
            for(let i=0;i<resource.length;i++){
                resource[i] = Number(resource[i]);
            }
        }
        if(payment){
            payment = payment.split(",");
            for(let i=0;i<payment.length;i++){
                payment[i] = Number(payment[i]);
            }
        }
        if(other){
            other = other.split(",");
            for(let i=0;i<other.length;i++){
                other[i] = Number(other[i]);
            }
        }
        if(review){
            review = Number(review);
        }
    } catch(err){
        return res.status(200).json({
            res: -1,
            msg: "查詢參數錯誤，請重試"
        })
    }


    // 資料庫查詢
    let rawProduct;
    try{
        await productModel.searchProduct(keyword, city, district, university, delivery, resource, payment, other, review)
            .then(([rows])=>{
                rows = rawProduct;
            })
    } catch(err){
        console.log(err);
        return res.status(400).json({
            res: -1,
            msg: "後端資料庫查詢錯誤，請聯繫開發人員"
        })
    }

    



}

exports.getCondition = async (req, res, next) => {

    // 獲取行政區資料
    let admArea;
    try{
        await districtModel.getAllDistrictWithCity().then(([rows]) => {
            admArea = rows;
        });
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端伺服器查詢資料錯誤，請聯繫開發人員"
        })
    }


    // 整理行政區資料
    let area = [];
    let lastCityId = -1;
    for(let i=0;i<admArea.length;i++){
        if(lastCityId != admArea[i].cityId){
            area.push({
                label: admArea[i].cityName,
                value: admArea[i].cityId,
                children: [],
            })
            lastCityId = admArea[i].cityId;
        }

        area[area.length-1].children.push({
            label: admArea[i].districtName,
            value: admArea[i].districtId,
        })
    }

    // 獲取大學資料
    let rawUniversity;
    try{
        await universityModel.getAllUniversity().then(([rows]) => {
            rawUniversity = rows;
        })
    }catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端伺服器查詢資料錯誤，請聯繫開發人員"
        })
    }

    // 整理大學資料
    let university = [];
    for(let i=0;i<rawUniversity.length;i++){
        university.push({
            label: rawUniversity[i].universityTW,
            value: rawUniversity[i].id 
        })
    }

    // 獲取商店來源
    let rawStoreResource;
    try{
        await storeResourceModel.getAllStoreResource()
            .then(([rows]) => {
                rawStoreResource = rows;
            })
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端伺服器查詢資料錯誤，請聯繫開發人員"
        })
    }


    // 整理商店來源
    let storeResource = [];
    for(let i=0;i<rawStoreResource.length;i++){
        storeResource.push({
            label: rawStoreResource[i].storeresource,
            value: rawStoreResource[i].id,
        })
    }

    // 獲取運送方式
    let rawDelivery;
    try{
        await deliveryModel.getAllDelivery()
            .then(([rows]) => {
                rawDelivery = rows;
            })
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端四負其查詢資料錯誤，請聯繫開發人員"
        })
    }

    // 整理運送方式
    let delivery = [];
    for(let i=0;i<rawDelivery.length;i++){
        delivery.push({
            label: rawDelivery[i].delivery,
            value: rawDelivery[i].id,
        })
    }

    // 取得付款方式
    let rawPayment;
    try{
        await paymentModel.getAllPayment()
            .then(([rows]) => {
                rawPayment = rows;
            })
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端四負其查詢資料錯誤，請聯繫開發人員"
        })
    }

    // 整理付款方式
    let payment = [];
    for(let i=0;i<rawPayment.length;i++){
        payment.push({
            label: rawPayment[i].payment,
            value: rawPayment[i].id,
        })
    }


    return res.status(200).json({
        res: 0,
        msg: "成功",
        data: {
            area: area,
            university: university,
            delivery: delivery,
            resource: storeResource,
            payment: payment,
            other: [
                {
                    label: "禁止劃記",
                    value: 0
                }
            ]
            
        }
    })
}