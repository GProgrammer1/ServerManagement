

export enum Status {
    ALL = 'ALL',
    SERVER_DOWN = 'SERVER_DOWN',
    SERVER_UP = 'SERVER_UP'
    
}

export type Server  = {
    id? : Number ;
    name : string ; 
    ipAddress : string ;
    type : string ;
    memory : string ;
    status : Status ;
    imageURL? : string ;
    loading : boolean ;
    

}

export type ResponseBody<T> = {
      
      timestamp : Date ;
      statusCode: number ;
      httpStatus : HttpStatus;
      message : string;
      developerMessage : string ;
      data:  T ;
      reason : string ;
}

export enum HttpStatus {
    OK = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
  }
  