const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const db = require("../config/connect");

module.exports = {
    GET_ADMIN: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let admin = await db.get().collection(process.env.ADMIN_COLLECTION).findOne({ email: data.email });
                if (!admin)
                    return resolve({ status: 401, message: `${data.email} is not registered` });
                
                let hash = await bcrypt.compare(data.password, admin.password);
                if (!hash)
                    return resolve({ status: 401, message: "Invalied password" });

                delete admin.password;
                jwt.sign({ adminId: admin._id }, process.env.JWT_SECRETE, function (err, token) {
                    if (err) throw new Error("failed to create token");

                    return resolve({ status: 200, adminAccessToken: token, admin });
                });
                
            } catch (err) {
                reject({ status: 500 });
            }
        })
    },

    GET_USERS: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let users = await db.get().collection(process.env.USER_COLLECTION).find({}, { password: 0 }).toArray();
                return resolve({ status: 200, users });
            } catch (err) {
                return reject({ status: 500 });
            }
        })
    },

    GET_ONE_USER: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await db.get().collection(process.env.USER_COLLECTION).findOne({ _id: ObjectId(id) });
                delete user.password;
                if (!user)
                    return resolve({ status: 404, message: "User not found" });
                
                return resolve({ status: 200, user });
            } catch (err) {
                return reject({ status: 500 });
            }
        })
    },

    UPDATE_ONE_USER: (id, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (data._id) delete data._id;
                
                let user = await db.get().collection(process.env.USER_COLLECTION)
                    .findOneAndUpdate(
                        { _id: ObjectId(id) },
                        { $set: data },
                        { projection: { password: 0 }, 'returnNewDocument' : true }
                    );

                if (!user)
                    return resolve({ status: 404, message: "User not found" });
                
                let rtnUser = { ...data, _id: id };
                return resolve({ status: 200, user: rtnUser });
            } catch (err) {
                console.error(err);
                return reject({ status: 500 });
            }
        })
    },
    
    UPDATE_ONE_USER: (id, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (data._id) delete data._id;
                
                let user = await db.get().collection(process.env.USER_COLLECTION)
                    .findOneAndUpdate(
                        { _id: ObjectId(id) },
                        { $set: data },
                        { projection: { password: 0 }, 'returnNewDocument' : true }
                    );

                if (!user)
                    return resolve({ status: 404, message: "User not found" });
                
                let rtnUser = { ...data, _id: id };
                return resolve({ status: 200, user: rtnUser });
            } catch (err) {
                console.error(err);
                return reject({ status: 500 });
            }
        })
    },

    DELETE_ONE_USER: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await db.get().collection(process.env.USER_COLLECTION).deleteOne({ _id: ObjectId(id) });

                if (!user)
                    return resolve({ status: 404, message: "User not found" });
                
                return resolve({ status: 204 });
            } catch (err) {
                console.error(err);
                return reject({ status: 500 });
            }
        })
    },
}