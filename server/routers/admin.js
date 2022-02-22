const path = require('path');
const express = require('express');
const router = express.Router();

const { LOGIN_VALIDATION } = require("../validations/validations");
const { CHECK_ADMIN_JWT } = require("../middlewares/jwtCheck");
const adminHelper = require('../helpers/adminHelper');


// @desc        For loging in
// @rout        POST /api/admin/login
router.post("/login", LOGIN_VALIDATION, (req, res) => {
    adminHelper.GET_ADMIN(req.body)
        .then(resolve => res.status(resolve.status).json(resolve))
        .catch(reject => res.status(reject.status).json({}));
});


// @desc        For getting all the users
// @rout        GET /api/admin/getUsers
router.get("/getUsers", CHECK_ADMIN_JWT, (req, res) => {
    adminHelper.GET_USERS()
        .then(resolve => res.status(resolve.status).json(resolve))
        .catch(reject => res.status(reject.status).json({}));
});


// @desc        For getting a user
// @rout        GET /api/admin/user/:id
router.get("/user/:id", CHECK_ADMIN_JWT, (req, res) => {
    adminHelper.GET_ONE_USER(req.params.id)
        .then(resolve => res.status(resolve.status).json(resolve))
        .catch(reject => res.status(reject.status).json({}));
});


// @desc        For getting a user
// @rout        DELETE /api/admin/updateUser/:id
router.delete("/deleteUser/:id", CHECK_ADMIN_JWT, (req, res) => {
    adminHelper.DELETE_ONE_USER(req.params.id)
        .then(resolve => res.status(resolve.status).json(resolve.status === 204 ? {} : resolve))
        .catch(reject => res.status(reject.status).json({}));
});


module.exports = router;