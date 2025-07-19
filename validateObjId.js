const mongoose = require('mongoose');
const AppError = require('./appError');

module.exports = function(req, res, next) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalid Product ID', 400));
    }
    next();
};
