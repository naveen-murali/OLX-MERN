const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const db = require("../config/connect");

module.exports = {
    CHECK_USER_JWT: (req, res, next) => {
        try {
            const jwtToken = req.header('x-auth-token');
            if (!jwtToken) throw { status: 401 };
            
            jwt.verify(jwtToken, process.env.JWT_SECRETE, async (err, data) => {
                if (err) throw { status: 401, message: err };
                
                if (!data.userId) throw { status: 401, message: "Credential is not valid" };

                let user = await db.get().collection(process.env.USER_COLLECTION).findOne({ _id: ObjectId(data.userId) });
                req.headers['User'] = user;

                // for getting header req.header("User");
            });

            next();
        } catch (err) {
            console.error(err.status);
            res.status(err.status || 500).json({});
        }
        
    },
    
    CHECK_ADMIN_JWT: (req, res, next) => {
        try {
            const jwtToken = req.header('x-auth-token');

            if (!jwtToken) throw { status: 401 };
            
            jwt.verify(jwtToken, process.env.JWT_SECRETE, async (err, data) => {
                if (err) throw { status: 401, message: err };
                
                if (!data.adminId) throw { status: 401, message: "Credential is not valid" };

                let admin = await db.get().collection(process.env.ADMIN_COLLECTION).findOne({ _id: ObjectId(data.adminId) });
                req.headers['Admin'] = admin;

                // for getting header req.header("Admin");
            });

            next();
        } catch (err) {
            console.error(err);
            res.status(err.status || 500).json({});
        }
        
    }
}