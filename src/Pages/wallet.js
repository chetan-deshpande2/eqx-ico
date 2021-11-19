import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { connect } from "react-redux";
import { accountUpdate } from "./../redux/actions";
import { Button } from "reactstrap";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import detectEthereumProvider from "@metamask/detect-provider";
// import GeneralModal from "./wrongNetworkModal";

let web3Modal = null;
let web3 = null;
let provider = null;

function initWeb3(provider) {
    const web3 = new Web3(provider);

    web3.eth.extend({
        methods: [
            {
                name: "chainId",
                call: "eth_chainId",
                outputFormatter: web3.utils.hexToNumber,
            },
        ],
    });

    return web3;
}


const init = async () => {
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "c3f6ce1953e4470191a8d12b8ba92672",
                rpcUrl: process.env.REACT_APP_RPC_URL,
            },
        },
    };

    web3Modal = new Web3Modal({
        network: process.env.REACT_APP_NETWORK,
        cacheProvider: false,
        providerOptions: providerOptions,
    });
    provider = await detectEthereumProvider();
};



export const onConnect = async () => {
    //Detect Provider
    try {
        init();
        // setIsChecked(!isChecked);
        provider = await web3Modal.connect();
        if (provider.open) {
            await provider.open();
            web3 = await initWeb3(provider);
            web3.eth.getAccounts(console.log);
        }
        window.sessionStorage.setItem("Provider", provider);
        if (!provider) {
            console.log("no provider found");
        } else {
            web3 = new Web3(provider);
            await ConnectWallet();
        }
        const chainId = await web3.eth.net.getId();

        if (chainId.toString() !== process.env.REACT_APP_CHAIN_ID) {
            // setWrongNetwork(true);
        }
    } catch (error) {
        console.log(error);
    }
};

// connect wallet

const ConnectWallet = async () => {
    if ("caches" in window) {
        caches.keys().then((names) => {
            // Delete all the cache files
            names.forEach((name) => {
                caches.delete(name);
            });
        });
    }
    try {
        const chainId = await web3.eth.net.getId();

        if (chainId.toString() !== process.env.REACT_APP_CHAIN_ID) {
            console.log("Wrong network");
            // setWrongNetwork(true);
            // props.dispatch(
            //     accountUpdate({
            //         account: null,
            //     })
            // );
        } else {
            // Get list of accounts of the connected wallet
            // setWrongNetwork(false);
            const accounts = await web3.eth.getAccounts();

            // MetaMask does not give you all accounts, only the selected account
            window.sessionStorage.setItem("selected_account", accounts[0]);
            const chainId = await web3.eth.net.getId();
            // props.dispatch(
            //     accountUpdate({
            //         account: accounts[0],
            //     })
            // );
            // setCurrentAccount(accounts[0]);
            console.log("connected Account", accounts[0]);
        }
    } catch (error) {
        if (error.message) {
            console.log("error", error.message);
        }
    }
}


