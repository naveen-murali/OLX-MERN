const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const db = require("../config/connect");

module.exports = {
    ADD_USER: (user) => {
        return new Promise(async (resolve, reject) => {
            try {
                let alreadyUser = await db.get().collection(process.env.USER_COLLECTION).findOne({ email: user.email });

                if (alreadyUser)
                    return resolve({ status: 208, message: `${user.email} is already a user` });
                
                let password = await bcrypt.hash(user.password, parseInt(process.env.SALT));
                user.password = password;

                let response = await db.get().collection(process.env.USER_COLLECTION).insertOne(user);
                
                return resolve({ status: 201, message: "Account created, Please login." });
            } catch (err) {
                console.error(err);
                reject({ status: err.status });
            }
        });
    },

    GET_USER: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await db.get().collection(process.env.USER_COLLECTION).findOne({ email: data.email });
                if (!user)
                    return resolve({ status: 401, message: `${data.email} is not registered` });
                
                let hash = await bcrypt.compare(data.password, user.password);
                if (!hash)
                    return resolve({ status: 401, message: "Invalied password" });

                delete user.password;
                jwt.sign({ userId: user._id }, process.env.JWT_SECRETE, function (err, token) {
                    if (err) throw new Error("failed to create token");

                    return resolve({ status: 200, userAccessToken: token, user });
                });
                
            } catch (err) {
                reject({ status: 500 });
            }
        })
    },

    ADD_PRODUCT: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let product = await db.get().collection(process.env.PRODUCT_COLLECTION).insertOne({ ...data, createdAt: Date.now() });

                if (!product)
                    throw new Error("Insertion failed");

                resolve({ productId: product.insertedId, status: 201, message: "Product is added to the database" });
            } catch (err) {
                console.error(err);
                reject({ status: 500, message: "Internal server error" });
            }
        })
    },

    UPDATE_PRODUCT: (id, imagePath) => {
        return new Promise(async (resolve, _) => {
            try {
                let res = await db.get().collection(process.env.PRODUCT_COLLECTION).updateOne({ _id: ObjectId(id) }, { $set: { imagePath:imagePath } });
                if (!res.modifiedCount)
                    throw new Error("Image path is not updated");
                resolve({});
            } catch (err) {
                console.error(err);
                resolve({});
            }
        })
    },

    GET_PRODUCTS: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let products = await db.get().collection(process.env.PRODUCT_COLLECTION).find({}).toArray();
                resolve({ status: 200, products });
            } catch (err) {
                console.log(err);
                reject({ status: err.status || 500 });
            }
        })
    },

    GET_ONE_PRODUCTS: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let product = await db.get().collection(process.env.PRODUCT_COLLECTION).findOne({ _id: ObjectId(id) });
                
                if (!product)
                    throw { status: 400 };
                
                resolve({ status: 200, product });
            } catch (err) {
                console.log(err);
                reject({ status: err.status || 500 });
            }
        })
    }
}