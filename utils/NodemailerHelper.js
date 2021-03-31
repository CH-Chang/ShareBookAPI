const Nodemailer = require("nodemailer");

const transporter = Nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sharebookservices@gmail.com",
        pass: "passsharebookservices",
    }
});

exports.transportRegisterValidateCode = async (email, code, expire) => {
    const mailOptions = {
        from: `學步系統服務 <sharebookservices@gmail.com>`,
        to: email,
        subject: "《學步系統服務》會員驗證郵件",
        html: `
            <!DOCTYPE html>
            <html lang="zh-Hant">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>test</title>
            </head>
            <body>
            
                <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <!-- header -->
                    <tr align="center" valign="middle">
                        <td>
                            <a href="https://www.sharebook.gq" target="_blank"><img src="https://img.sharebook.gq/email/png/logo_100.png" style="width: 8vmin; padding-top: 2vmin; padding-bottom: 2vmin;"></a>
                        </td>
                    </tr>
            
            
            
                    <!-- main section -->
                    <tr>
                        <td align="left" valign="top" width="100%" style="padding-left:3vmin;padding-right:3vmin;padding-top:8vmin;padding-bottom:8vmin;background-color: #f4f4f4;">
                            <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="left" valign="middle" >
                                        <h1 style="font-family: '微軟正黑體'; font-size: 1.8vmin; color: #141414; font-weight:bold;">學步系統 會員驗證信</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p style="font-family: '微軟正黑體'; font-size: 1.4vmin; color: #141414; font-weight:300;">親愛的用戶您好，<br/> 您申請的學步會員驗證碼為「${code}」<br/>請在「${expire}」前註冊完畢，<br/>感謝您的愛用與支持。<br/><br/>祝安好。</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
            
            
            
                    <!-- footer -->
                    <tr>
                        <td width="100%" align="center" valign="center" style="padding-top:5vmin; padding-bottom: 5vmin;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center">
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">學步官網</a>
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">會員條款</a>
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">隱私權條款</a>
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">學步APP</a>
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">團隊招募</a>
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">關於學步</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <p style="font-family: '微軟正黑體'; color:#141414; font-size: 1.2vmin;">Copyright © 2021 SHARE BOOK 學步</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `
    };

    try{
        await transporter.sendMail(
            mailOptions,
            (err, info) => {
                if(err){
                    return Promise.reject(err);
                } else {
                    return Promise.resolve(info);
                }
            },
        )
    } catch(err){
        return Promise.reject(err);
    }
}

exports.transportSchoolVerifyValidateCode = async (email, code, expire) => {
    const mailOptions = {
        from: `學步系統服務 <sharebookservices@gmail.com>`,
        to: email,
        subject: "《學步系統服務》校園身分驗證郵件",
        html: `
            <!DOCTYPE html>
            <html lang="zh-Hant">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>test</title>
            </head>
            <body>
            
                <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <!-- header -->
                    <tr align="center" valign="middle">
                        <td>
                            <a href="https://www.sharebook.gq" target="_blank"><img src="https://img.sharebook.gq/email/png/logo_100.png" style="width: 8vmin; padding-top: 2vmin; padding-bottom: 2vmin;"></a>
                        </td>
                    </tr>
            
            
            
                    <!-- main section -->
                    <tr>
                        <td align="left" valign="top" width="100%" style="padding-left:3vmin;padding-right:3vmin;padding-top:8vmin;padding-bottom:8vmin;background-color: #f4f4f4;">
                            <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="left" valign="middle" >
                                        <h1 style="font-family: '微軟正黑體'; font-size: 1.8vmin; color: #141414; font-weight:bold;">學步系統 校園身分驗證信</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p style="font-family: '微軟正黑體'; font-size: 1.4vmin; color: #141414; font-weight:300;">親愛的用戶您好，<br/> 您申請的學步校園身分驗證碼為「${code}」<br/>請在「${expire}」前完成身分驗證，<br/>感謝您的愛用與支持。<br/><br/>祝安好。</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
            
            
            
                    <!-- footer -->
                    <tr>
                        <td width="100%" align="center" valign="center" style="padding-top:5vmin; padding-bottom: 5vmin;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center">
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">學步官網</a>
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">會員條款</a>
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">隱私權條款</a>
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">學步APP</a>
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">團隊招募</a>
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">關於學步</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <p style="font-family: '微軟正黑體'; color:#141414; font-size: 1.2vmin;">Copyright © 2021 SHARE BOOK 學步</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `
    };

    try{
        await transporter.sendMail(
            mailOptions,
            (err, info) => {
                if(err){
                    return Promise.reject(err);
                } else {
                    return Promise.resolve(info);
                }
            },
        )
    } catch(err){
        return Promise.reject(err);
    }

}

exports.transportEditInformationValidateCode = async (email, code, expire) => {
    const mailOptions = {
        from: `學步系統服務 <sharebookservices@gmail.com>`,
        to: email,
        subject: "《學步系統服務》電子郵件變更驗證郵件",
        html: `
            <!DOCTYPE html>
            <html lang="zh-Hant">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>test</title>
            </head>
            <body>
            
                <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <!-- header -->
                    <tr align="center" valign="middle">
                        <td>
                            <a href="https://www.sharebook.gq" target="_blank"><img src="https://img.sharebook.gq/email/png/logo_100.png" style="width: 8vmin; padding-top: 2vmin; padding-bottom: 2vmin;"></a>
                        </td>
                    </tr>
            
            
            
                    <!-- main section -->
                    <tr>
                        <td align="left" valign="top" width="100%" style="padding-left:3vmin;padding-right:3vmin;padding-top:8vmin;padding-bottom:8vmin;background-color: #f4f4f4;">
                            <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="left" valign="middle" >
                                        <h1 style="font-family: '微軟正黑體'; font-size: 1.8vmin; color: #141414; font-weight:bold;">學步系統 電子郵件變更驗證信</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p style="font-family: '微軟正黑體'; font-size: 1.4vmin; color: #141414; font-weight:300;">親愛的用戶您好，<br/> 您申請的電子郵件變更驗證碼為「${code}」<br/>請在「${expire}」前完成身分驗證，<br/>感謝您的愛用與支持。<br/><br/>祝安好。</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
            
            
            
                    <!-- footer -->
                    <tr>
                        <td width="100%" align="center" valign="center" style="padding-top:5vmin; padding-bottom: 5vmin;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center">
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">學步官網</a>
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">會員條款</a>
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">隱私權條款</a>
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">學步APP</a>
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">團隊招募</a>
                                        <a href="http://www.sharebook.gq" target="_blank" style="font-family: '微軟正黑體'; color:#141414; font-size: 1.5vmin; text-decoration: none; font-weight: 500;">關於學步</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <p style="font-family: '微軟正黑體'; color:#141414; font-size: 1.2vmin;">Copyright © 2021 SHARE BOOK 學步</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `
    };

    try{
        await transporter.sendMail(
            mailOptions,
            (err, info) => {
                if(err){
                    return Promise.reject(err);
                } else {
                    return Promise.resolve(info);
                }
            },
        )
    } catch(err){
        return Promise.reject(err);
    }

}