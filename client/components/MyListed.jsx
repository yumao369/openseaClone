import axios from "axios"
import { ethers } from "ethers"
import { useEffect, useState, useContext } from "react"
import Loader from "./Loader"
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"

const Mylisted = () => {
  const { NFTMarketplaceContract } = useContext(NFTMarketplaceContext)

  const [loading, setLoading] = useState(true)
  const [nfts, setNfts] = useState([])

  useEffect(() => {
    loadNFTs()
  }, [])

  const loadNFTs = async () => {
    const data = await NFTMarketplaceContract.fetchItemsListed()
    console.log('data', data)
    const items = await Promise.all(data.map(async (nft) => {
      const tokenUri = await NFTMarketplaceContract.tokenURI(nft.tokenId)
      const res = await axios.get(tokenUri)
      const price = ethers.utils.formatUnits(nft.price.toString(), 'ether')
      const item = {
        price,
        tokenId: nft.tokenId.toNumber(),
        seller: nft.seller,
        owner: nft.owner,
        image: res.data.image
      }
      console.log(item)
      return item

    }))
    /*const sample = [
      {
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        owner: "0x7356659757D92E06d50ee502Eb1e5f463E581b0d",
        price: "0.1",
        seller: "0x1734fe8C516fd252a429b5664A8B392886D4F340",
        tokenId: 1,
      },
      {
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        owner: "0x7356659757D92E06d50ee502Eb1e5f463E581b0d",
        price: "0.1",
        seller: "0x1734fe8C516fd252a429b5664A8B392886D4F340",
        tokenId: 1,
      },
      {
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        owner: "0x7356659757D92E06d50ee502Eb1e5f463E581b0d",
        price: "0.1",
        seller: "0x1734fe8C516fd252a429b5664A8B392886D4F340",
        tokenId: 1,
      },
      {
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        owner: "0x7356659757D92E06d50ee502Eb1e5f463E581b0d",
        price: "0.1",
        seller: "0x1734fe8C516fd252a429b5664A8B392886D4F340",
        tokenId: 1,
      },
      {
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        owner: "0x7356659757D92E06d50ee502Eb1e5f463E581b0d",
        price: "0.1",
        seller: "0x1734fe8C516fd252a429b5664A8B392886D4F340",
        tokenId: 1,
      },
      {
        image: "https://ipfs.infura.io/ipfs/QmRckMpV19GAtAz1k4imACz4AsBKpg2udZ6nywzDacT6jj",
        owner: "0x7356659757D92E06d50ee502Eb1e5f463E581b0d",
        price: "0.1",
        seller: "0x1734fe8C516fd252a429b5664A8B392886D4F340",
        tokenId: 1,
      }
    ]
    setNfts(sample)*/
    setNfts(items)
    setLoading(false)
  }

  return (
    <div className="flex justify-center">
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
                    <img src={nft.image} className="rounded" />
                    <div className="p-4 bg-black">
                      <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ) : (
          <h1 className="px-20 py-10 text-3xl">You haven't listed any NFTs.</h1>
        )
      )}

    </div>
  )
}

export default Mylisted