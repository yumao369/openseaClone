import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { NFTMarketplaceABI, NFTMarketplaceAddress } from "../utils/constants";

export const NFTMarketplaceContext = React.createContext();

const { ethereum } = window;

const getEhereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const NFTMarketplaceContract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, signer)

  console.log({ provider, signer, NFTMarketplaceContract })
  return NFTMarketplaceContract
}

export const NFTMarketplaceProvider = ({ children }) => {
  const NFTMarketplaceContract = getEhereumContract()

  const [currentAccount, setCurrentAccount] = useState()

  const checkIfWalletIsConnected = async () => {
    try {
      //check if metamask is installed
      if (!ethereum) return alert("please install metamask")

      //get all the accounts connected to this page
      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length) {
        setCurrentAccount(accounts[0])
      } else {
        console.log('no accounts found')
      }

    } catch (err) {

      console.log(err)
      throw new Error("no ethereum object.")
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("please install metamask")

      //request for connect
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      setCurrentAccount(accounts[0])
    } catch (err) {
      console.log(err)
      throw new Error("no ethereum object.")
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <NFTMarketplaceContext.Provider value={{ connectWallet, currentAccount, NFTMarketplaceContract }}>
      {children}
    </NFTMarketplaceContext.Provider>
  )
}