const moment = require("moment");

const RSAHelper = require("../../utils/RSAHelper");
const JWTHelper = require("../../utils/JWTHelper");
const HMACSHA256Helper = require("../../utils/HMACSHA256Helper");
const RedisHelper = require("../../utils/RedisHelper");
const NodemailerHelper = require("../../utils/NodemailerHelper");

const RSAConfig = require("../../configs/web/RSAConfig");
const JWTConfig = require("../../configs/web/JWTConfig");
const HMACSHA256Config = require("../../configs/web/HMACSHA256Config");

const accountModel = require("../../models/accountModel");
const districtModel = require("../../models/districtModel");
const storeModel = require("../../models/storeModel");
const schoolVerifyModel = require("../../models/schoolVerifyModel");
const universityModel = require("../../models/universityModel");
const departmentModel = require("../../models/departmentModel");

exports.login = async (req, res, next) => {

    let {account, password} = req.body;

    try{
        account = RSAHelper.RSADecrypt(account, RSAConfig.privateKey);
        password = RSAHelper.RSADecrypt(password, RSAConfig.privateKey);
    } catch(err) {
        return res.status(400).json({
            res: -1,
            msg: "伺服器解碼錯誤，請聯繫開發人員",
        })
    }

    let hashedPassword;
    try{
        hashedPassword = HMACSHA256Helper.HMACSHA256Hash(password, HMACSHA256Config.key);
    } catch(err) {
        return res.status(400).json({
            res: -1,
            msg: "伺服器加密錯誤，請聯繫開發人員",
        })
    }


    let accountInfo = undefined;
    try{
        await accountModel.loginByAccount(account, hashedPassword).then(([rows])=>{
            if (rows.length!=0) accountInfo=rows[0];
        })
    } catch(err) {
        console.log(err);
        return res.status(400).json({
            res: -1,
            msg: "查詢資料庫錯誤，請聯繫開發人員"
        })
    }

    if (typeof accountInfo === 'undefined'){
        return res.status(200).json({
            res: -1,
            msg: "帳號或密碼錯誤，請重試",
        })
    }

    // 查詢store資訊
    let rawStore;
    try{
        await storeModel.getStoreByAccountId(accountInfo.accountId)
            .then(([rows]) => {
                if(rows.length!=0){
                    rawStore = rows[0];
                }
            })
    } catch(err) {
        return res.status(400).json({
            res: -1,
            msg: "資料庫查詢錯誤，請聯繫開發人員"
        })
    }

    // 查詢學生驗證資料
    let rawSchoolVerify;
    try{
        await schoolVerifyModel.getSchoolVerifyByAccountId(accountInfo.accountId)
            .then(([rows]) => {
                if(rows.length!=0){
                    rawSchoolVerify = rows[0];
                }
            })
    } catch(err) {
        return res.status(400).json({
            res: -1,
            msg: "資料庫查詢錯誤，請聯繫開發人員"
        })
    }

    // 產生權杖
    let token;
    try {
        token = JWTHelper.sign({
            accountId: accountInfo.accountId,
            account: accountInfo.account,
        }, "1 days", JWTConfig.key);
    } catch(err) {
        return res.status(400).json({
            res: -1,
            msg: "伺服器加密錯誤，請聯繫開發人員"
        })
    }

    // 包裝帳號資料
    let accountRes = {
        accountId: accountInfo.accountId,
        account: accountInfo.account,
        firstName: accountInfo.firstName,
        secondName: accountInfo.secondName,
        nickname: accountInfo.nickname,
        sex: accountInfo.sex,
        birthday: moment(accountInfo.birthday).format("YYYY-MM-DD"),
        email: accountInfo.email,
        phone: accountInfo.phone,
        cellphone: accountInfo.cellphone,
        cityId: accountInfo.cityId,
        city: accountInfo.city,
        districtId: accountInfo.districtId,
        district: accountInfo.district,
        address: accountInfo.address,
        timestamp: moment(accountInfo.timestamp).format("YYYY-MM-DD HH:mm:ss"),
    }

    // 包裝校園認證資料
    if(rawSchoolVerify){
        accountRes.university = {
            universityId: rawSchoolVerify.universityId,
            university: rawSchoolVerify.university,
            collegeId: rawSchoolVerify.collegeId,
            college: rawSchoolVerify.college,
            departmentId: rawSchoolVerify.departmentId,
            department: rawSchoolVerify.department,
            schoolEmail: rawSchoolVerify.schoolemail,
            verifyTimestamp: moment(rawSchoolVerify.timestamp).format("YYYY-MM-DD HH:mm:ss"),
        }
    }

    // 包裝商店資料
    let storeRes;
    if(rawStore){
        storeRes = {
            storeId: rawStore.storeId,
            storeName: rawStore.storeName,
            cityId: rawStore.cityId,
            city: rawStore.city,
            districtId: rawStore.districtId,
            district: rawStore.district,
            universityId: rawStore.universityId,
            university: rawStore.university,
            resourceId: rawStore.resourceId,
            resource: rawStore.resource,
        }
    }


    return res.status(200).json({
        res: 0,
        msg: "登入成功",
        data: {
            token: token,
            account: accountRes,
            store: storeRes
        }
    })
}

exports.register = async (req, res, next) => {

    // 獲取前端資料
    const encryptedAccount = req.body.account;
    const encryptedPassword = req.body.password;
    const encryptedEmail = req.body.email;
    const encryptedSex = req.body.sex;
    const encryptedFirstName = req.body.firstName;
    const encryptedSecondName = req.body.secondName;
    const encryptedBirthday = req.body.birthday;
    const encryptedPhone = req.body.phone;
    const encryptedCellphone = req.body.cellphone;
    const encryptedRegisterValidateCode = req.body.registerValidateCode;
    const encryptedCity = req.body.city;
    const encryptedDistrict = req.body.district;
    const encryptedAddress = req.body.address;
    
    // 解密前端資料
    let account, password, email, sex, firstName, secondName, birthday, phone, cellphone, registerValidateCode, city, district, address;
    try{
        account = RSAHelper.RSADecrypt(encryptedAccount, RSAConfig.privateKey);
        password = RSAHelper.RSADecrypt(encryptedPassword, RSAConfig.privateKey);
        email = RSAHelper.RSADecrypt(encryptedEmail, RSAConfig.privateKey);
        sex = Number(RSAHelper.RSADecrypt(encryptedSex, RSAConfig.privateKey));
        firstName = RSAHelper.RSADecrypt(encryptedFirstName, RSAConfig.privateKey);
        secondName = RSAHelper.RSADecrypt(encryptedSecondName, RSAConfig.privateKey);
        birthday = RSAHelper.RSADecrypt(encryptedBirthday, RSAConfig.privateKey);
        phone = RSAHelper.RSADecrypt(encryptedPhone, RSAConfig.privateKey);
        cellphone = RSAHelper.RSADecrypt(encryptedCellphone, RSAConfig.privateKey);
        registerValidateCode = RSAHelper.RSADecrypt(encryptedRegisterValidateCode, RSAConfig.privateKey);
        city = Number(RSAHelper.RSADecrypt(encryptedCity, RSAConfig.privateKey));
        district = Number(RSAHelper.RSADecrypt(encryptedDistrict, RSAConfig.privateKey));
        address = RSAHelper.RSADecrypt(encryptedAddress, RSAConfig.privateKey);
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端資料解密錯誤，請重試"
        })
    }

    // 查詢前端資料正確性 - 城市鄉鎮區是否配對
    let valid = false;
    try{
        await districtModel.getDistrictById(district).then(([rows])=>{
            if(rows[0].city==city){
                valid = true;
            }
        })
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端伺服器資料庫查詢錯誤，請聯繫開發人員"
        })
    }
    if(!valid){
        return res.status(200).json({
            res: -1,
            msg: "前端送達資料有誤，請查核後重試"
        })
    }

    // 查詢是否曾經註冊過
    let registered = false;
    try{
        await accountModel.getAccountByEmail(email).then(([rows])=>{
            if(rows.length!=0){
                registered = true;
            }
        })
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端伺服器資料庫查詢錯誤，請聯繫開發人員"
        })
    }
    if(registered){
        return res.status(200).json({
            res: -1,
            msg: "該電子郵件已註冊，請改用其他電子郵件"
        })
    }

    try{
        await accountModel.getAccountByAccount(account).then(([rows])=>{
            if(rows.length!=0){
                registered = true;
            }
        })
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端伺服器資料庫查詢錯誤，請聯繫開發人員"
        })
    }
    if(registered){
        return res.status(200).json({
            res: -1,
            msg: "該帳號已註冊，請改用其他帳號"
        })
    }

    try{
        await accountModel.getAccountByCellphone(cellphone).then(([rows])=>{
            if(rows.length!=0){
                registered = true;
            }
        })
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端伺服器資料庫查詢錯誤，請聯繫開發人員"
        })
    }
    if(registered){
        return res.status(200).json({
            res: -1,
            msg: "該手機號碼已註冊，請改用其他手機號碼"
        })
    }


    // 取得驗證碼及到期時間
    const savedCode = await RedisHelper.hget(`registerValidateCode:${email}`, 'code');
    const savedExpireStr = await RedisHelper.hget(`registerValidateCode:${email}`, 'expire');
    const savedExpire = moment(savedExpireStr, "YYYY-MM-DD HH:mm:ss");

    // 確認驗證碼狀態
    if (savedCode==null){
        return res.status(200).json({
            res: -1,
            msg: "請獲取驗證碼",
        })
    }
    

    // 確認驗證碼是否相符合
    if (savedCode != registerValidateCode.toUpperCase()){
        return res.status(200).json({
            res: -1,
            msg: "驗證碼錯誤，請重試"
        })
    }

    // 確認驗證碼是否過期
    const now = moment();
    if(now.isAfter(savedExpire)){
        return res.status(200).json({
            res: -1,
            msg: "驗證碼已過期，請重試"
        })
    }

    // Hash密碼
    let hashedPassword;
    try{
        hashedPassword = HMACSHA256Helper.HMACSHA256Hash(password, HMACSHA256Config.key);
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端資料加密錯誤，請聯繫開發人員"
        })
    }

    // 清除該筆驗證碼資料
    try{
        await RedisHelper.hdel(`registerValidateCode:${email}`, 'code', 'expire');
    }catch(err){
        console.log(err);
        return res.status(400).json({
            res: -1,
            msg: "後端資料庫寫入錯誤，請聯繫開發人員"
        })
    }


    // 開始註冊進資料庫
    try{
        await accountModel.register(account, hashedPassword, firstName, secondName, secondName, sex, birthday, email, phone, cellphone, city, district, address).then(([rows])=> {

        })
    }catch(err){
        console.log(err);
        return res.status(400).json({
            res: -1,
            msg: "後端資料庫寫入錯誤，請聯繫開發人員"
        })
    }

    return res.status(200).json({
        res: 0,
        msg: "註冊成功"
    })

}

exports.schoolVerify = async (req, res, next) => {
    // 取得前端資料
    let schoolEmail, school, schoolVerifyValidateCode;
    try{
        schoolEmail = RSAHelper.RSADecrypt(req.body.schoolEmail, RSAConfig.privateKey);
        school = RSAHelper.RSADecrypt(req.body.school, RSAConfig.privateKey).split(",");
        schoolVerifyValidateCode = RSAHelper.RSADecrypt(req.body.validateCode, RSAConfig.privateKey);
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端資料解密錯誤，請重試",
        })
    }
    

    // 整理前端資料
    try{
        for(let i=0;i<school.length;i++){
            school[i] = Number(school[i]);
        }
    }catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端資料處理錯誤，請聯繫開發人員"
        })
    }

    // 確認帳戶未執行學生驗證
    let isVerified = false;
    try{
        await schoolVerifyModel.getSchoolVerifyByAccountId(req.headers.user.accountId)
            .then(([rows]) => {
                if(rows.length!=0){
                    isVerified = true;
                }
            })
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端資料查詢錯誤，請聯繫開發人員"
        })
    }
    if(isVerified){
        return res.status(200).json({
            res: -1,
            msg: "校園身分已驗證，請勿重複申請"
        })
    }

    // 取得驗證碼及到期時間
    const savedCode = await RedisHelper.hget(`schoolVerifyValidateCode:${schoolEmail}`, 'code');
    const savedExpireStr = await RedisHelper.hget(`schoolVerifyValidateCode:${schoolEmail}`, 'expire');
    const savedExpire = moment(savedExpireStr, "YYYY-MM-DD HH:mm:ss");

    // 確認驗證碼狀態
    if (savedCode==null){
        return res.status(200).json({
            res: -1,
            msg: "請獲取驗證碼",
        })
    }
    
    // 確認驗證碼是否相符合
    if (savedCode != schoolVerifyValidateCode.toUpperCase()){
        return res.status(200).json({
            res: -1,
            msg: "驗證碼錯誤，請重試"
        })
    }

    // 確認驗證碼是否過期
    const now = moment();
    if(now.isAfter(savedExpire)){
        return res.status(200).json({
            res: -1,
            msg: "驗證碼已過期，請重試"
        })
    }

    // 移除驗證碼紀錄
    try{
        await RedisHelper.hdel(`schoolVerifyValidateCode:${schoolEmail}`, 'code', 'expire');
    } catch(err) {
        return res.status(400).json({
            res: -1,
            msg: "後端資料寫入錯誤，請聯繫開發人員"
        })
    }

    // 開始寫入資料庫
    try {
        await schoolVerifyModel.verify(req.headers.user.accountId, school[2], schoolEmail);
    } catch(err) {
        return res.status(400).json({
            res: -1,
            msg: "資料庫寫入錯誤，請聯繫開發人員"
        })
    }

    // 查詢學生驗證資料
    let rawSchoolVerify;
    try{
        await schoolVerifyModel.getSchoolVerifyByAccountId(req.headers.user.accountId)
            .then(([rows]) => {
                if(rows.length!=0){
                    rawSchoolVerify = rows[0];
                }
            })
    } catch(err) {
        return res.status(400).json({
            res: -1,
            msg: "資料庫查詢錯誤，請聯繫開發人員"
        })
    }

    // 包裝學生驗證資料
    let schoolVerify = {
        universityId: rawSchoolVerify.universityId,
        university: rawSchoolVerify.university,
        collegeId: rawSchoolVerify.collegeId,
        college: rawSchoolVerify.college,
        departmentId: rawSchoolVerify.departmentId,
        department: rawSchoolVerify.department,
        schoolEmail: rawSchoolVerify.schoolemail,
        verifyTimestamp: moment(rawSchoolVerify.timestamp).format("YYYY-MM-DD HH:mm:ss"),
    }

    // 回傳
    return res.status(200).json({
        res: 0,
        msg: "成功",
        data: schoolVerify,
    })


}

exports.editInformation = async (req, res, next) => {
    // 獲取前端資料
    const encryptedPassword = req.body.password;
    const encryptedEmail = req.body.email;
    const encryptedSex = req.body.sex;
    const encryptedFirstName = req.body.firstName;
    const encryptedSecondName = req.body.secondName;
    const encryptedBirthday = req.body.birthday;
    const encryptedPhone = req.body.phone;
    const encryptedCellphone = req.body.cellphone;
    const encryptedCity = req.body.city;
    const encryptedDistrict = req.body.district;
    const encryptedAddress = req.body.address;
    const encryptedEmailValidateCode = req.body.emailValidateCode;
    const encryptedNewPassword = req.body.newPassword;
    
    // 解密前端資料
    let password, email, sex, firstName, secondName, birthday, phone, cellphone, city, district, address, newPassword, emailValidateCode;
    try{
        password = RSAHelper.RSADecrypt(encryptedPassword, RSAConfig.privateKey);
        email = RSAHelper.RSADecrypt(encryptedEmail, RSAConfig.privateKey);
        sex = Number(RSAHelper.RSADecrypt(encryptedSex, RSAConfig.privateKey));
        firstName = RSAHelper.RSADecrypt(encryptedFirstName, RSAConfig.privateKey);
        secondName = RSAHelper.RSADecrypt(encryptedSecondName, RSAConfig.privateKey);
        birthday = RSAHelper.RSADecrypt(encryptedBirthday, RSAConfig.privateKey);
        phone = RSAHelper.RSADecrypt(encryptedPhone, RSAConfig.privateKey);
        cellphone = RSAHelper.RSADecrypt(encryptedCellphone, RSAConfig.privateKey);
        city = Number(RSAHelper.RSADecrypt(encryptedCity, RSAConfig.privateKey));
        district = Number(RSAHelper.RSADecrypt(encryptedDistrict, RSAConfig.privateKey));
        address = RSAHelper.RSADecrypt(encryptedAddress, RSAConfig.privateKey);
        newPassword = encryptedNewPassword ? RSAHelper.RSADecrypt(encryptedNewPassword, RSAConfig.privateKey) : undefined;
        emailValidateCode = encryptedEmailValidateCode ? RSAHelper.RSADecrypt(encryptedEmailValidateCode, RSAConfig.privateKey) : undefined; 
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端資料解密錯誤，請重試"
        })
    }

}

exports.getRegisterValidateCode = async (req, res, next) => {

    // 獲取前端資料
    let encryptedEmail = req.body.email;

    // 解密前端資料
    let email;
    try{
        email = RSAHelper.RSADecrypt(encryptedEmail, RSAConfig.privateKey);
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端伺服器解密錯誤"
        })
    }

    // 查詢該Email是否註冊過
    let registered = false;
    try{
        await accountModel.getAccountByEmail(email).then(([rows])=> {
            if(rows.length!=0){
                registered = true;
            }
        })
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端伺服器查詢資料庫錯誤，請聯繫開發人員"
        })
    }
    if(registered){
        return res.status(200).json({
            res: -1,
            msg: "該電子郵件已註冊，請改用其他電子郵件"
        })
    }

    // 查詢先前請求
    try{
        const savedExpireStr = await RedisHelper.hget(`registerValidateCode:${email}`, "expire");
        if(savedExpireStr){
            const now = moment();
            const savedExpire = moment(savedExpireStr, "YYYY-MM-DD HH:mm:ss");


            if(now.isBefore(savedExpire.add(3, 'minutes'))){
                return res.status(200).json({
                    res: -1,
                    msg: "申請驗證碼過於頻繁，請三分鐘後再試",
                })
            }
        }
    } catch(err){
        console.log(err);
        return res.status(400).json({
            res: -1,
            msg: "伺服器查詢資料庫發生錯誤，請聯繫開發人員"
        })
    }
    

    // 隨機產生驗證碼及過期時間
    const code = Math.random().toString(16).slice(2,6).toUpperCase();
    const expire = moment().add(10, 'minutes');
    const expireStr = expire.format("YYYY-MM-DD HH:mm:ss");

    // 發送驗證碼
    try{
        await NodemailerHelper.transportRegisterValidateCode(email, code, expireStr);
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "郵件寄送發生錯誤，請聯繫開發人員"
        })
    }

    // 存入Redis
    try{
        await RedisHelper.hmset(`registerValidateCode:${email}`, "code", code, "expire", expireStr);
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端伺服器資料庫寫入失敗，請聯繫開發人員",
        })
    }

    return res.status(200).json({
        res: 0,
        msg: "驗證碼發送成功"
    })
}

exports.getSchoolVerifyValidateCode = async (req, res, next) => {
    // 取得前端資料
    let schoolEmail = RSAHelper.RSADecrypt(req.body.schoolEmail, RSAConfig.privateKey);
    let school = RSAHelper.RSADecrypt(req.body.school, RSAConfig.privateKey).split(",");

    // 整理前端資料
    try{
        for(let i=0;i<school.length;i++){
            school[i] = Number(school[i]);
        }
    }catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端資料處理錯誤，請聯繫開發人員"
        })
    }

    // 確認帳戶未執行學生驗證
    let isVerified = false;
    try{
        await schoolVerifyModel.getSchoolVerifyByAccountId(req.headers.user.accountId)
            .then(([rows]) => {
                if(rows.length!=0){
                    isVerified = true;
                }
            })
    } catch(err){
        console.log(err);
        return res.status(400).json({
            res: -1,
            msg: "後端資料查詢錯誤，請聯繫開發人員"
        })
    }
    if(isVerified){
        return res.status(200).json({
            res: -1,
            msg: "校園身分已驗證，請勿重複申請"
        })
    }

    // 查詢該校資料
    let rawUniversity;
    try{
        await universityModel.getUniversityById(school[0])
            .then(([rows]) => {
                rawUniversity = rows[0];
            })
    }catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端資料查詢錯誤，請聯繫開發人員"
        })
    }

    // 確認domain正確
    if(schoolEmail.indexOf(rawUniversity['domain']) == -1 ){
        return res.status(200).json({
            res: -1,
            msg: "校園網域錯誤，請查核"
        })
    }

    // 查詢先前請求
    try{
        const savedExpireStr = await RedisHelper.hget(`schoolVerifyValidateCode:${schoolEmail}`, "expire");
        if(savedExpireStr){
            const now = moment();
            const savedExpire = moment(savedExpireStr, "YYYY-MM-DD HH:mm:ss");


            if(now.isBefore(savedExpire.add(3, 'minutes'))){
                return res.status(200).json({
                    res: -1,
                    msg: "申請驗證碼過於頻繁，請三分鐘後再試",
                })
            }
        }
    } catch(err){
        console.log(err);
        return res.status(400).json({
            res: -1,
            msg: "伺服器查詢資料庫發生錯誤，請聯繫開發人員"
        })
    }
    

    // 隨機產生驗證碼及過期時間
    const code = Math.random().toString(16).slice(2,6).toUpperCase();
    const expire = moment().add(10, 'minutes');
    const expireStr = expire.format("YYYY-MM-DD HH:mm:ss");

    // 發送驗證碼
    try{
        await NodemailerHelper.transportSchoolVerifyValidateCode(schoolEmail, code, expireStr);
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "郵件寄送發生錯誤，請聯繫開發人員"
        })
    }

    // 存入Redis
    try{
        await RedisHelper.hmset(`schoolVerifyValidateCode:${schoolEmail}`, "code", code, "expire", expireStr);
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端伺服器資料庫寫入失敗，請聯繫開發人員",
        })
    }

    return res.status(200).json({
        res: 0,
        msg: "發送成功"
    })

}

exports.getEditInformationValidateCode = async (req, res, next) => {
    const encryptedEmail = req.body.email;

    let email;
    try{
        email = RSAHelper.RSADecrypt(encryptedEmail, RSAConfig.privateKey);
    }catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端資料解密錯誤，請聯繫開發人員"
        })
    }

    // 查詢先前請求
    try{
        const savedExpireStr = await RedisHelper.hget(`editInformationValidateCode:${email}`, "expire");
        if(savedExpireStr){
            const now = moment();
            const savedExpire = moment(savedExpireStr, "YYYY-MM-DD HH:mm:ss");


            if(now.isBefore(savedExpire.add(3, 'minutes'))){
                return res.status(200).json({
                    res: -1,
                    msg: "申請驗證碼過於頻繁，請三分鐘後再試",
                })
            }
        }
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "伺服器查詢資料庫發生錯誤，請聯繫開發人員"
        })
    }
    

    // 隨機產生驗證碼及過期時間
    const code = Math.random().toString(16).slice(2,6).toUpperCase();
    const expire = moment().add(10, 'minutes');
    const expireStr = expire.format("YYYY-MM-DD HH:mm:ss");

    // 發送驗證碼
    try{
        await NodemailerHelper.transportEditInformationValidateCode(email, code, expireStr);
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "郵件寄送發生錯誤，請聯繫開發人員"
        })
    }

    // 存入Redis
    try{
        await RedisHelper.hmset(`editInformationValidateCode:${schoolEmail}`, "code", code, "expire", expireStr);
    } catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端伺服器資料庫寫入失敗，請聯繫開發人員",
        })
    }

    return res.status(200).json({
        res: 0,
        msg: "發送成功"
    })


}

exports.getRegisterFormData = async (req, res, next) => {
    
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

    // 回傳
    return res.status(200).json({
        res: 0,
        msg: "成功",
        data: {
            area: area,
        }
    })
}

exports.getEditInformationFormData = async (req, res, next) => {
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

    // 回傳
    return res.status(200).json({
        res: 0,
        msg: "成功",
        data: {
            area: area,
        }
    })

}

exports.getEditSchoolFormData = async (req, res, next) => {
    // 取得校系資料
    let rawSchool;
    try{
        await departmentModel.getAllSchool()
            .then(([rows])=>{
                rawSchool = rows;
            })
    }catch(err){
        return res.status(400).json({
            res: -1,
            msg: "後端資料庫查詢錯誤，請聯繫開發人員"
        })
    }

    // 整理校系資料
    let school = []
    let currentUniversityId = -1;
    let currentCollegeId = -1;
    for(let i=0;i<rawSchool.length;i++){
        if(currentUniversityId != rawSchool[i].universityId){
            school.push({
                value: rawSchool[i].universityId,
                label: rawSchool[i].universityTW,
                children: []
            })
            currentUniversityId = rawSchool[i].universityId;
        }
        if(currentCollegeId != rawSchool[i].collegeId){
            school[school.length-1].children.push({
                value: rawSchool[i].collegeId,
                label: rawSchool[i].college,
                children: []
            })
            currentCollegeId = rawSchool[i].collegeId
        }

        school[school.length-1].children[school[school.length-1].children.length-1].children.push({
            value: rawSchool[i].departmentId,
            label: rawSchool[i].department,
        })
    }

    return res.status(200).json({
        res: 0,
        msg: "成功",
        data: {
            school: school,
        },
    })
}