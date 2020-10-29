const Client = require('coinbase').Client;
export const  client =(accessToken,refreshToken)=>{return (new Client({'accessToken': accessToken, 'refreshToken': refreshToken,'strictSSL': false}))};
export const authEndpoint = "https://www.coinbase.com/oauth/authorize";
const redirectUri = "http://localhost:3000/";
const clientId="your Client Id from Coinbase ";
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=wallet:accounts:read+wallet:addresses:read+wallet:user:read`
export const accessTokenUrl="http://www.coinbase.com/oauth/token/";
export const clientSecret="your_client_secret__get from coinbase";
export const body=(code)=>{return (`grant_type=authorization_code&code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}`)}
export const api="https://api.coinbase.com/v2/user/"
