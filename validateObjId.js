const mongoose = require('mongoose');
const AppError = require('./appError');

module.exports = function(req, res, next) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('The product ID you entered is not valid. Please check and try again.', 400));
    }
    next();
};
