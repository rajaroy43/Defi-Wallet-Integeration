const Client = require('coinbase').Client;
export const  client =(accessToken,refreshToken)=>{return (new Client({'accessToken': accessToken, 'refreshToken': refreshToken,'strictSSL': false}))};
export const authEndpoint = "https://www.coinbase.com/oauth/authorize";
const redirectUri = "http://localhost:3000/";
const clientId="b8ba6129a02aa39cb74478b7e4abfa588e3e8d69aa815af47687ddc802140098";
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=wallet:accounts:read+wallet:addresses:read+wallet:user:read`
export const accessTokenUrl="http://www.coinbase.com/oauth/token/";
export const clientSecret="8ce0d61e127e3d073aaab7b24d8245ac97956977b2341e48871dc212c1d77748";
export const body=(code)=>{return (`grant_type=authorization_code&code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}`)}
export const api="https://api.coinbase.com/v2/user/"
