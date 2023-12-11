const adminmodel = require('./model/adminmodel');

const isAuthenticated = async (req, res, next) => {
    try {
        if (!req.cookies.adminToken) {
            return res.status(401).redirect('/login');
        }

        const adminId = req.cookies.adminToken;

        const admin = await adminmodel.findById(adminId);

        if (!admin) {
            return res.status(401).redirect('/login');
        }
        req.admin = admin;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = isAuthenticated;
