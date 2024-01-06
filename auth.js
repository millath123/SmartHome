const adminmodel = require('./model/adminmodel');

const isAuthenticated = async (req, res, next) => {
    try {
        if (!req.cookies.adminToken) {
            return res.status(401).redirect('/');
        }


        const admin = await adminmodel.findById(req.cookies.adminToken);

        if (!admin) {
            return res.status(401).redirect('/');
        }
        req.admin = admin;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = isAuthenticated;
