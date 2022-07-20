import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { ethers } from "ethers"
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"
import Loader from "./Loader"
import { useNavigate } from "react-router-dom"

const Mine = () => {
  const { NFTMarketplaceContract } = useContext(NFTMarketplaceContext)

  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    loadNfts()
  }, [])

  const loadNfts = async () => {
    console.log(NFTMarketplaceContract)
    const data = await NFTMarketplaceContract.fetchMyNFTs()
    console.log('data', data)
    const items = await Promise.all(data.map(async nft => {
      const tokenURI = await NFTMarketplaceContract.tokenURI(nft.tokenId)
      const res = await axios.get(tokenURI)
      const price = ethers.utils.formatUnits(nft.price.toString(), 'ether')
      const item = {
        price,
        tokenId: nft.tokenId.toNumber(),
        seller: nft.seller,
        owner: nft.owner,
        image: res.data.image,
        tokenURI
      }
      console.log(item)
      return item
    }))
    /*const sample = [
      {
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        owner: "0xC50A949A6136F25a7640252C4f32101dd05A9589",
        price: "0.1",
        seller: "0x0000000000000000000000000000000000000000",
        tokenId: 1,
        tokenURI: "https://ipfs.infura.io/ipfs/QmceTSrvEyTstw19k2xJbsEfx8DmeX8cSXVVxLarZ8WNS8"
      },
      {
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        owner: "0xC50A949A6136F25a7640252C4f32101dd05A9589",
        price: "0.1",
        seller: "0x0000000000000000000000000000000000000000",
        tokenId: 1,
        tokenURI: "https://ipfs.infura.io/ipfs/QmceTSrvEyTstw19k2xJbsEfx8DmeX8cSXVVxLarZ8WNS8"
      },
      {
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        owner: "0xC50A949A6136F25a7640252C4f32101dd05A9589",
        price: "0.1",
        seller: "0x0000000000000000000000000000000000000000",
        tokenId: 1,
        tokenURI: "https://ipfs.infura.io/ipfs/QmceTSrvEyTstw19k2xJbsEfx8DmeX8cSXVVxLarZ8WNS8"
      },
      {
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        owner: "0xC50A949A6136F25a7640252C4f32101dd05A9589",
        price: "0.1",
        seller: "0x0000000000000000000000000000000000000000",
        tokenId: 1,
        tokenURI: "https://ipfs.infura.io/ipfs/QmceTSrvEyTstw19k2xJbsEfx8DmeX8cSXVVxLarZ8WNS8"
      },
      {
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        owner: "0xC50A949A6136F25a7640252C4f32101dd05A9589",
        price: "0.1",
        seller: "0x0000000000000000000000000000000000000000",
        tokenId: 1,
        tokenURI: "https://ipfs.infura.io/ipfs/QmceTSrvEyTstw19k2xJbsEfx8DmeX8cSXVVxLarZ8WNS8"
      },
      {
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        owner: "0xC50A949A6136F25a7640252C4f32101dd05A9589",
        price: "0.1",
        seller: "0x0000000000000000000000000000000000000000",
        tokenId: 1,
        tokenURI: "https://ipfs.infura.io/ipfs/QmceTSrvEyTstw19k2xJbsEfx8DmeX8cSXVVxLarZ8WNS8"
      }
    ]
    setNfts(sample)*/
    setNfts(items)
    setLoading(false)
  }

  const listNFT = async (nft) => {
    navigate(`/resell/?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
  }

  return (
    <div className="flex justify-center">
      {loading ? (
        <div className="mt-48">
          <Loader />
        </div>
      ) : (
        nfts.length ? (
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {
                nfts.map((nft, i) => (
                  <div key={i} className="border shadow rounded-xl overflow-hidden">
                    <img src={nft.image} className="rounded" />
                    <div className="p-4 bg-black">
                      <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                      <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-12 rounded" onClick={() => listNFT(nft)}>List</button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ) : (
          <h1 className="px-20 py-10 text-3xl">You have no NFTs.</h1>
        )
      )}
    </div>
  )
}

export default Mine