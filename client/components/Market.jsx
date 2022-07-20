import { useContext, useEffect, useState } from "react"
import { ethers } from "ethers"
import axios from "axios"
import Loader from "./Loader"
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"

const Market = () => {
  const { NFTMarketplaceContract } = useContext(NFTMarketplaceContext)

  const [loading, setLoading] = useState(true)
  const [nfts, setNfts] = useState([])

  useEffect(() => {
    loadNFTs()
  }, [])

  const loadNFTs = async () => {
    const data = await NFTMarketplaceContract.fetchMarketItems()
    const items = await Promise.all(data.map(async (nft) => {
      const tokenUri = await NFTMarketplaceContract.tokenURI(nft.tokenId)
      const res = await axios.get(tokenUri)
      const price = ethers.utils.formatUnits(nft.price.toString(), 'ether')
      const item = {
        price,
        tokenId: nft.tokenId.toNumber(),
        seller: nft.seller,
        owner: nft.owner,
        image: res.data.image,
        name: res.data.name,
        description: res.data.description,
      }
      return item
    }))
    /*const sample = [
      {
        description: "The first nft for test in ropsten test network",
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        name: "test1",
        owner: "0x7356659757D92E06d50ee502Eb1e5f463E581b0d",
        price: "0.1",
        seller: "0x1734fe8C516fd252a429b5664A8B392886D4F340",
        tokenId: 1
      },
      {
        description: "The first nft for test in ropsten test network",
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        name: "test1",
        owner: "0x7356659757D92E06d50ee502Eb1e5f463E581b0d",
        price: "0.1",
        seller: "0x1734fe8C516fd252a429b5664A8B392886D4F340",
        tokenId: 1
      },
      {
        description: "The first nft for test in ropsten test network",
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        name: "test1",
        owner: "0x7356659757D92E06d50ee502Eb1e5f463E581b0d",
        price: "0.1",
        seller: "0x1734fe8C516fd252a429b5664A8B392886D4F340",
        tokenId: 1
      },
      {
        description: "The first nft for test in ropsten test network",
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        name: "test1",
        owner: "0x7356659757D92E06d50ee502Eb1e5f463E581b0d",
        price: "0.1",
        seller: "0x1734fe8C516fd252a429b5664A8B392886D4F340",
        tokenId: 1
      },
      {
        description: "The first nft for test in ropsten test network",
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        name: "test1",
        owner: "0x7356659757D92E06d50ee502Eb1e5f463E581b0d",
        price: "0.1",
        seller: "0x1734fe8C516fd252a429b5664A8B392886D4F340",
        tokenId: 1
      }
    ]*/
    setNfts(items)
    setLoading(false)
  }

  const buy = async (nft) => {
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transcationHash = await NFTMarketplaceContract.createMarketSale(nft.tokenId, { value: price })
    await transcationHash.wait()
    loadNFTs()
  }

  return (
    <div className="flex justify-center ">
      {loading ? (
        <div className="mt-48">
          <Loader />
        </div>
      ) : (
        nfts.length ? (
          <div className="px-4" style={{ maxWidth: '1600px' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {
                nfts.map((nft, i) => (
                  <div key={i} className="border shadow rounded-xl overflow-hidden">
                    <img src={nft.image} />
                    <div className="p-4">
                      <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                      <div style={{ height: '70px', overflow: 'hidden' }}>
                        <p className="text-gray-400">{nft.description}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-black">
                      <p className="text-2xl font-bold text-white">{nft.price} ETH</p>
                      <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-12 rounded" onClick={() => buy(nft)}>Buy</button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ) : (
          <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
        )
      )}
    </div >
  )
}

export default Market