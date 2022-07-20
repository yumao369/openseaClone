import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ethers } from "ethers"
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"

const Resell = () => {

  const { NFTMarketplaceContract } = useContext(NFTMarketplaceContext)
  const navigate = useNavigate()

  const [params] = useSearchParams()
  const id = params.get('id')
  const tokenURI = params.get('tokenURI')

  const [newPrice, setNewPrice] = useState()
  const [img, setImg] = useState()

  useEffect(() => {
    fetchNFT()
  }, [id])

  const fetchNFT = async () => {
    if (!tokenURI) return
    const res = await axios.get(tokenURI)
    setImg(res.data.image)
  }

  const listNFTForSale = async () => {
    if (!newPrice) {
      alert("please input a new price!")
      return
    }
    const priceETH = ethers.utils.parseUnits(newPrice, 'ether')
    console.log(NFTMarketplaceContract)
    const listingPrice = await NFTMarketplaceContract.getListingPrice()
    const transcationHash = await NFTMarketplaceContract.resellToken(id, priceETH, { value: listingPrice })
    await transcationHash.wait()
    navigate("/market")
  }
  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input placeholder="New Price in Eth" className="mt-2 border rounded p-4" onChange={e => setNewPrice(e.target.value)}
        />
        {img && <img className="rounded mt-4" width="350" src={img} />}
        <button onClick={listNFTForSale} className="font-bold mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded p-4 shadow-lg">
          List NFT
        </button>
      </div>
    </div>
  )
}

export default Resell