class ServerError extends Error{
    
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}
export default ServerError;