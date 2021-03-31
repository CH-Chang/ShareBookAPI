exports.getCarousel = async (req, res, next) => {
    return res.status(200).json({
        res: 0,
        msg: "成功",
        data: [
            {
                title: "圖片一",
                img: "https://cf.shopee.tw/file/b70c195e3393baa7d41ba425acab7407",
                link: "/"
            },
            {
                title: "圖片二",
                img: "https://cf.shopee.tw/file/f3f7d7a81a61d1282ed2e94faa16f585",
                link: "/"
            }
        ]
    })
}

exports.getSuggestion = async (req, res, next) => {
    return res.status(200).json({
        res: 0,
        msg: "成功",
        data: [
            {
                productId: 0,
                productName: "測試用",
                productImg: "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/088/17/0010881747.jpg&v=60001d3a&w=180&h=180",
                productCurrency: "NTD",
                productUnit: "HR",
                productPrice: 15.00,
                storeId: 0,
                storeName: "sharebook@official",
            }
        ]
    });
}

exports.getHotRank = async (req, res, next) => {
    return res.status(200).json({
        res: 0,
        msg: "成功",
        data: [
            {
                productId: 0,
                productName: "測試用",
                productImg: "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/R03/008/25/R030082532.jpg&v=5f719f10&w=180&h=180",
                productCurrency: "NTD",
                productUnit: "HR",
                productPrice: 15.00,
                storeId: 0,
                storeName: "sharebook@official",
            },
            {
                productId: 0,
                productName: "測試用",
                productImg: "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/088/30/0010883008.jpg&v=600e9dbe&w=180&h=180",
                productCurrency: "NTD",
                productUnit: "HR",
                productPrice: 15.00,
                storeId: 0,
                storeName: "sharebook@official",
            },
            {
                productId: 0,
                productName: "測試用",
                productImg: "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/088/17/0010881747.jpg&v=60001d3a&w=180&h=180",
                productCurrency: "NTD",
                productUnit: "HR",
                productPrice: 15.00,
                storeId: 0,
                storeName: "sharebook@official",
            },
            {
                productId: 0,
                productName: "測試用",
                productImg: "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/088/17/0010881747.jpg&v=60001d3a&w=180&h=180",
                productCurrency: "NTD",
                productUnit: "HR",
                productPrice: 15.00,
                storeId: 0,
                storeName: "sharebook@official",
            },
            {
                productId: 0,
                productName: "測試用",
                productImg: "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/088/17/0010881747.jpg&v=60001d3a&w=180&h=180",
                productCurrency: "NTD",
                productUnit: "HR",
                productPrice: 15.00,
                storeId: 0,
                storeName: "sharebook@official",
            },
            {
                productId: 0,
                productName: "測試用",
                productImg: "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/088/17/0010881747.jpg&v=60001d3a&w=180&h=180",
                productCurrency: "NTD",
                productUnit: "HR",
                productPrice: 15.00,
                storeId: 0,
                storeName: "sharebook@official",
            },
            {
                productId: 0,
                productName: "測試用",
                productImg: "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/088/17/0010881747.jpg&v=60001d3a&w=180&h=180",
                productCurrency: "NTD",
                productUnit: "HR",
                productPrice: 15.00,
                storeId: 0,
                storeName: "sharebook@official",
            },
            {
                productId: 0,
                productName: "測試用",
                productImg: "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/088/17/0010881747.jpg&v=60001d3a&w=180&h=180",
                productCurrency: "NTD",
                productUnit: "HR",
                productPrice: 15.00,
                storeId: 0,
                storeName: "sharebook@official",
            },
            {
                productId: 0,
                productName: "測試用",
                productImg: "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/088/17/0010881747.jpg&v=60001d3a&w=180&h=180",
                productCurrency: "NTD",
                productUnit: "HR",
                productPrice: 15.00,
                storeId: 0,
                storeName: "sharebook@official",
            },
        ]
    });

}

exports.getOfficialSuggestion = async (req, res, next) => {
    return res.status(200).json({
        res: 0,
        msg: "成功",
        data: [
            {
                productId: 0,
                productName: "測試用",
                productImg: "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/088/17/0010881747.jpg&v=60001d3a&w=180&h=180",
                productCurrency: "NTD",
                productUnit: "HR",
                productPrice: 15.00,
                storeId: 0,
                storeName: "sharebook@official",
            }
        ]
    });

}

exports.getShopbackSuggestion = async (req, res, next) => {
    return res.status(200).json({
        res: 0,
        msg: "成功",
        data: [
            {   
                storeId: 0,
                storeName: "綜合類別",
                product: [
                    {
                        productId: 0,
                        productName: "測試用",
                        productImg: "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/088/17/0010881747.jpg&v=60001d3a&w=180&h=180",
                        productCurrency: "NTD",
                        productPrice: 950,
                    }
                ]
            },
            {   
                storeId: 1,
                storeName: "博客來",
                product: [
                    {
                        productId: 0,
                        productName: "測試用",
                        productImg: "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/088/17/0010881747.jpg&v=60001d3a&w=180&h=180",
                        productCurrency: "NTD",
                        productPrice: 950,
                    }
                ]
            },

        ]
    })
}