import Web3 from "web3";
let web3;
const getWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
    } catch (error) {
      console.log("Ethereum console not open yet");
    }
  } else if (window.web3) {
    web3 = window.web3;
    console.log("Injected web3 detected.");
  } else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );
        //Or use here InfuraApi
         web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
      }
      return web3
    };
export default getWeb3;
