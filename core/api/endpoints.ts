export const baseApiEndpoint: string = 'https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/';

// Authentication endpoint
export const authEndpoint: string = baseApiEndpoint + 'prod/oauth/token'; // POST
// User resources endpoints
export const usersEndpoint: string = baseApiEndpoint + 'prod/users'; // POST create new user
export const currentUserEndpoint: string = usersEndpoint + '/current'; // GET
export const profileEndpoint: string = usersEndpoint + '/profile'; // POST, GET

// Models
export const modelEndpoint: string = baseApiEndpoint + 'prod/models';
export const sepcificModelEndpoint: string = modelEndpoint + '/';

// Makes
export const makesEndpoint: string = baseApiEndpoint + 'prod/makes/';
