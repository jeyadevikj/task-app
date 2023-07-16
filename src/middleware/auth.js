const auth = (req, res, next) => {
    console.log('In the auth middleware');
    next()
}

module.exports = auth