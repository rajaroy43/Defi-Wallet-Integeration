import React, { useEffect, useState } from "react";
import Portis from "@portis/web3";
import Web3 from "web3";
import Fortmatic from "fortmatic";
import WalletLink from "walletlink";
import getWeb3 from "./getWeb3";
import "./Navbar.css";
import { Button, Modal, Spinner } from "react-bootstrap";
const TokenTracker = require("@metamask/eth-token-tracker");
function NavBar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [networkVersion, setnetworkVersion] = useState(null);
  const [loading, setloading] = useState(false);
  const [accountAddress, setaccountAddress] = useState(null);
  const [showAnotherAccount, setshowAnotherAccount] = useState(false);
  const handleShow = () => {
    setShow(true);
    setshowAnotherAccount(false);
  };
  const handleShowSecond = () => {
    if (parseInt(networkVersion) == 1) {
      setshowAnotherAccount(true);
    }
  };

  useEffect(() => {
    const getDefaultAccount = () => {
      setaccountAddress(window.web3.eth.defaultAccount);
    };
    window.onload = getDefaultAccount;
    setaccountAddress(window.web3.eth.defaultAccount);
  }, [window.web3.eth.defaultAccount]);
  useEffect(() => {
    setnetworkVersion(window.ethereum.chainId);
    window.ethereum.on("chainChanged", (chainId) => {
      window.ethereum.autoRefreshOnNetworkChange = false;
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have a very good reason not to.
      setnetworkVersion(chainId);
    });
  }, [window.ethereum.chainId]);

  function truncateString(s) {
    const s1 = s.slice(0, 5);
    const len = s.length;
    const s2 = s.slice(len - 5, len);
    return s1 + "..." + s2;
  }
  const onMetaMask = async () => {
    setShow(false);
    setloading(true);
    const web3 = await getWeb3();
    try {
      const accounts = await web3.eth.getAccounts();
      web3.eth.defaultAccount = accounts[0];
      window.ethereum.autoRefreshOnNetworkChange = false;
      setaccountAddress(accounts[0]);
      window.ethereum.on("accountsChanged", function (accounts) {
        // Time to reload your interface with accounts[0]!
        console.log("Accounts Changed", accounts[0]);

        setaccountAddress(accounts[0]);
      });
    } catch (error) {
      console.log("MetaMask Error", error);
    }
    setloading(false);
  };
  const tokenTracker = () => {
    // var tokenTracker = new TokenTracker({
    //   userAddress: accounts[0], // whose balance to track
    //   provider: web3.currentProvider,
    //   // block polling interval (optional)
    //   // Tell it about the tokens to track:
    //   tokens: [
    //     {
    //       address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    //     },
    //   ],
    // });
    // var balances = tokenTracker.serialize();
    // console.log(balances);
    // tokenTracker.on("update", function (balances) {
    //   console.log(balances);
    //   console.log(
    //     `Your balance of ${balances[0].symbol} is ${balances[0].string}`
    //   );
    // });
    // tokenTracker.add({ address: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735" });
    // console.log(tokenTracker);
  };
  const onPortis = async (e) => {
    setShow(false);
    setloading(true);
    try {
      const portis = new Portis(
        "1f9df972-4bbe-4ceb-9cc6-ad26e9e844f0",
        "mainnet"
      );
      const web3 = new Web3(portis.provider);
      const accounts = await web3.eth.getAccounts();
      setaccountAddress(accounts[0]);
      web3.eth.defaultAccount = accounts[0];
      portis.onError((error) => {
        console.log("error in portis >>>>", error);
      });
      portis.onActiveWalletChanged((walletAddress) => {
        console.log("Active wallet address:", walletAddress);
      });
    } catch (error) {
      console.log("Portis error", error);
    }
    setloading(false);

    // const portis = new Portis(
    //   "1f9df972-4bbe-4ceb-9cc6-ad26e9e844f0",
    //   "rinkeby",
    //   { scope: ["email"] }
    // );

    // web3.eth.getAccounts((error, accounts) => {
    //   console.log(accounts);
    // });
    // portis.showPortis();
    // portis.showBitcoinWallet();
    // portis.onLogin((walletAddress, email, reputation) => {
    //   console.log(walletAddress, email, reputation);
    // });
    // portis.onLogout(() => {
    //   console.log("User logged out");
    // });

    //For Portis Logout
    //logout = async () => {
    //   const portis = new Portis(
    //     "1f9df972-4bbe-4ceb-9cc6-ad26e9e844f0",
    //     "rinkeby",
    //     { scope: ["email"] }
    //   );
    //   const web3 = new Web3(portis.provider);
    //   await portis.logout();
    //
  };
  const onFortmatic = async () => {
    setShow(false);
    //  Test Key:pk_test_08C5065DBBEB63E1
    //Production LocalHost:pk_live_1AF7C9CB3A4DEEA8
    setloading(true);
    try {
      let fm = new Fortmatic("pk_live_1AF7C9CB3A4DEEA8");
      const web3 = new Web3(fm.getProvider());
      const account = await web3.eth.getAccounts();
      setaccountAddress(account[0]);
      web3.eth.defaultAccount = account[0];
    } catch (error) {
      console.log("FortMatic Error is ", error);
    }
    setloading(false);
  };
  const onWalletConnect = async () => {
    setShow(false);
    setloading(true);
    try {
      const walletLink = new WalletLink({
        appName: "Abhishek Ray DApp",
      });
      const ethereum = walletLink.makeWeb3Provider(
        "https://mainnet.infura.io/v3/45662a3729fa43678d13b210e60dee48",
        1
      );
      const web3 = new Web3(ethereum);
      // const account = await web3.eth.getAccounts();
      ethereum.send("eth_requestAccounts").then((accounts) => {
        // console.log(`User's address is ${accounts[0]}`);

        // Optionally, have the default account set for web3.js
        web3.eth.defaultAccount = accounts[0];
        setaccountAddress(accounts[0]);
      });
    } catch (error) {
      console.log("Wallet Link error", error);
    }
    setloading(false);
    // console.log(account);
  };
  return (
    <div className="navBar">
      <img
        src="https://yldsub.finance/assets/Yieldshares%20Logo.jpg"
        alt="YLD"
      />
      <div className="navBar-right">
        {accountAddress ? (
          loading ? (
            <Spinner
              as="span"
              animation="border"
              role="status"
              aria-hidden="true"
              variant="sucess"
            />
          ) : (
            <button
              className={`navBar-rightAddress ${parseInt(networkVersion) == 1}`}
              onClick={handleShowSecond}
            >
              {parseInt(networkVersion) == 1 ? (
                truncateString(accountAddress)
              ) : (
                <p className="walletLogout"> Wrong network !</p>
              )}
            </button>
          )
        ) : (
          <>
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                role="status"
                aria-hidden="true"
                variant="sucess"
              />
            ) : (
              <Button
                variant="primary"
                className="navBar-rightBtn"
                onClick={handleShow}
              >
                Connect Wallet
              </Button>
            )}
          </>
        )}
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
          dialogClassName="modal-10w"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Connect wallet
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="navBar-rightWallet">
              <Button className="wallet" onClick={onMetaMask}>
                <img
                  src=" https://raw.githubusercontent.com/snapshot-labs/lock/master/connectors/assets/injected.png"
                  alt="MetaMask"
                />
                MetaMask
              </Button>
              <Button className="wallet" onClick={onPortis}>
                <img
                  src="https://raw.githubusercontent.com/snapshot-labs/lock/master/connectors/assets/portis.png"
                  alt=""
                />{" "}
                Portis
              </Button>
              <Button className="wallet" onClick={onFortmatic}>
                <img
                  src="https://raw.githubusercontent.com/snapshot-labs/lock/master/connectors/assets/fortmatic.png"
                  alt=""
                />{" "}
                Fortmatic
              </Button>
              <Button className="wallet" onClick={onWalletConnect}>
                <img
                  src="https://raw.githubusercontent.com/snapshot-labs/lock/master/connectors/assets/walletlink.png"
                  alt=""
                />{" "}
                Coinbase
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        {accountAddress && parseInt(networkVersion) == 1 && (
          <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showAnotherAccount}
            onHide={() => setshowAnotherAccount(false)}
            dialogClassName="modal-10w"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Account
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="navBar-AnotherWalletInfo">
                <a
                  className="navBar-AnotherWalletInfoLink"
                  href={`https://etherscan.io/address/${accountAddress}`}
                  target="_blank"
                >
                  <p>
                    {truncateString(accountAddress)}
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-box-arrow-in-up-right"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"
                      />
                    </svg>
                  </p>
                </a>
                <Button className="wallet" onClick={handleShow}>
                  Connect wallet
                </Button>
                <Button
                  className="wallet btn btn-danger walletLogout"
                  onClick={() => setaccountAddress(null)}
                >
                  Log out
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
}
export default NavBar;
