module.exports = function(req, res, next){
    // get aut header value
    const bearerHeader = req.headers['x-access-token']
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' '); // Memisahkan bearer dengan token
        //get token from array bearer
        const bearerToken = bearer[1]
        //set the token
        req.token = bearerToken
        //next the middleware
        next();
    }
    else{
        res.status(400).json({
            status: 0,
            error_code: 400,
            errors :{
                message: {
                    id: 'Kode akses token salah',
                    en: 'invalid access token'
                }
            }
        })
    }
}