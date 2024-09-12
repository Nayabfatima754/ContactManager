const constants = require('./../constant')
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.NOT_FOUND:
            res.json({
                
                title:'not found',
                message: err.message,
                stack: err.stack});
            break;
        case constants.VALIDATION_ERROR:
            res.json({
                title:'Validation error',
                message: err.message,
                stack: err.stack});  
            break;
            
        case constants.UNAUTHORIZED:
                res.json({
                    title:'Unauthorized',
                    message: err.message,
                    stack: err.stack});  
                break;
        case constants.SERVER:
                    res.json({
                        title:'Server',
                        message: err.message,
                        stack: err.stack}); 
                        break;
        case constants.FORBIDDEN:
                    res.json({
                    title:'Forbidden',
                    message: err.message,
                    stack: err.stack}); 
                    
        default:
            console.log('no error All good!');
        break;

}

};

module.exports = errorHandler;
