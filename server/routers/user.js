const express = require('express');
const userHelper = require('../helpers/userHelper');
const router = express.Router();
const path = require('path');

const { USER_VALIDATION, LOGIN_VALIDATION } = require("../validations/validations");
const { CHECK_USER_JWT } = require("../middlewares/jwtCheck");

// @desc        For loging in
// @rout        POST /api/login
router.post("/login", LOGIN_VALIDATION, (req, res) => {
    userHelper.GET_USER(req.body)
        .then(resolve => res.status(resolve.status).json(resolve))
        .catch(reject => res.status(reject.status).json({}));
});


// @desc        For signing up.
// @rout        POST /api/signup
router.post("/signup", USER_VALIDATION, (req, res) => {
    userHelper.ADD_USER(req.body)
        .then(
            resolve => res.status(resolve.status).json(resolve)
        )
        .catch(
            reject => res.status(reject.status || 500).json({})
        );
});


// @desc        For adding items.
// @rout        POST /api/addItems
router.post("/addItems", CHECK_USER_JWT, async (req, res) => {
    if (!req.files)
        res.status(400).json({ message: "Image is required" });
    
    const image = req.files.image;
    const fileExt = path.extname(image.name);
    try {
        let resolve = await userHelper.ADD_PRODUCT(req.body)
        image.mv(`${__dirname}/../public/product/${resolve.productId + fileExt}`, async (err, data) => {
            if (err)
                throw new Error({ status: 500 });
            
            await userHelper.UPDATE_PRODUCT(resolve.productId, `/${resolve.productId + fileExt}`);

            res.status(resolve.status).json({ ...resolve, imagePath: `/${resolve.productId + fileExt}` });
        });
    } catch (err) {
        res.status(err.status || 500).json({});
    }
});


// @desc        For getting all the products.
// @rout        GET /api/getProducts
router.get("/getProducts", (req, res) => {
    userHelper.GET_PRODUCTS()
        .then(resolve => res.status(resolve.status).json(resolve))
        .catch(reject => res.status(reject.status || 500).json({}));
});


// @desc        For getting one product.
// @rout        GET /getOneProduct/:id
router.get("/getOneProduct/:id", CHECK_USER_JWT, (req, res) => {
    userHelper.GET_ONE_PRODUCTS(req.params.id)
        .then(resolve => res.status(resolve.status).json(resolve))
        .catch(reject => res.status(reject.status || 500).json({}));
});


module.exports = router;