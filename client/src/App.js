import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import "./App.css";
import { body, loginUrl, accessTokenUrl, api, client } from "./coinbase";
import axios from "axios";
class App extends Component {
  state = {
    accountMetamask: null,
    acessCode: null,
    acess_token: null,
    userdata: null,
    web3: null,
    account_balance:null,
    accountCoinbase:null
  };
  onMetaMask = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const getBalance = await web3.eth.getBalance(accounts[0]);
    this.setState({ accountMetamask: accounts[0], balance: getBalance, web3: web3 });
    console.log(accounts);
  };
  componentDidMount = async () => {
    const code = window.location.search;
    const code_split = code.split("=");
    const acessCode = code_split[1];
    this.setState({ acessCode: acessCode});
    const postUrl = accessTokenUrl;
    const data = body(acessCode);
    try {
      const resp = await axios({ method: "post", url: postUrl, data: data });
      // console.log(resp);
      const _acessToken = resp.data.access_token;
      const _refreshToken=resp.data.refresh_token;
     console.log(resp.data);
    this.setState({ acess_token: _acessToken });
     const client_acess= client(_acessToken,_refreshToken);
     const Authorization = "Bearer " + _acessToken;
     const user = await axios({
       url: api,
       method: "get",
       headers: {
         Authorization: Authorization,
       },
     });
     //Other way to get userInfo
    //  client_acess.getUser(user.data.data.id, (err, user) => {
    //     if (!err) {
    //       console.log(user);
    //     }
    //     else {
    //       console.log(err);
    //     }
    //   })
    //  console.log("user>>>>", user);
    
   client_acess.getAccounts({}, (err, accounts) => {
        if (!err) {
          console.log(accounts);
          const account1 = accounts[0];
          const account_balance = account1.balance.amount;
          // console.log("account_balance is ", account_balance);
          // console.log("accont name is ", account1.name);
          account1.getAddresses({},(_err, addresses) => {
            console.log(addresses);
            if(!_err){
              this.setState({accountCoinbase:addresses[0].address_info["address"]})
            }
            else{
              console.log(err);
            }
          })
          this.setState({ account_balance: account_balance });
        }
        else {
          console.log(err);
        }
      })
      this.setState({ userdata: user.data.data.name});
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { accountMetamask,accountCoinbase, userdata, balance, web3 ,account_balance} = this.state;

    return (
      <div className="App">
        <button onClick={this.onMetaMask}>Connect By MetaMask</button>
        OR
        <a href={loginUrl}>LogIN With CoinBase</a>
        {accountMetamask && (
          <h3>
            Connect to your account : {accountMetamask}  By metamask and account Balance is
            {web3.utils.fromWei(balance.toString(), "ether")} ether
          </h3>
        )}
        {userdata && <h1>User name is {userdata} Fetch from coinbase</h1>}
        {accountCoinbase && <h3>Connect to your account : {accountCoinbase} By CoinBase</h3>
        }
        {null==account_balance?"": <h3>Account Balance is {account_balance}  BTC Fetch from coinbase</h3>}
      </div>
    );
  }
}

export default App;
