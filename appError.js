class AppError extends Error {
    constructor(message, status) {
        super();
        this.msg = message;
        this.status = status;
    }
}

module.exports = AppError;
