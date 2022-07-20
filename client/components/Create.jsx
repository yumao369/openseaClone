import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ethers } from "ethers"
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"

const ipfsClient = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const Create = () => {
  const { NFTMarketplaceContract } = useContext(NFTMarketplaceContext)

  const navigate = useNavigate()

  const [fileUrl, setFileUrl] = useState()
  const [formData, setFormData] = useState({ name: '', description: '', price: '' })

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
  }

  const uploadFileToIpfs = async (e) => {
    const file = e.target.files[0]
    try {
      const added = await ipfsClient.add(file, { progress: (progress) => console.log(`received:${progress}`) })
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  const uploadAssetToIpfs = async () => {
    const { name, description, price } = formData
    if (!name || !description || !price || !fileUrl) {
      alert('all input need to be filled')
      return
    }
    const data = JSON.stringify({ name, description, image: fileUrl })
    try {
      const added = await ipfsClient.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      return url
    } catch (error) {
      console.log('Error uploading asset: ', error)
    }
  }

  const listNFTForSale = async () => {
    const url = await uploadAssetToIpfs()
    const price = ethers.utils.parseUnits(formData.price, 'ether')
    const listingPrice = await NFTMarketplaceContract.getListingPrice()
    console.log(listingPrice)
    const transcationHash = await NFTMarketplaceContract.createToken(url, price, { value: listingPrice })
    //problem
    await transcationHash.wait()
    console.log(transcationHash)
    navigate('/market')
  }


  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input placeholder="Asset Name" className="mt-8 border rounded p-4" onChange={e => { handleChange(e, 'name') }} />
        <textarea placeholder="Asset Description" className="mt-2 border rounded p-4" onChange={e => { handleChange(e, 'description') }} />
        <input placeholder="Asset Price in Eth" className="mt-2 border rounded p-4" onChange={e => { handleChange(e, 'price') }} />
        <input type="file" name="Asset" className="my-4 " onChange={uploadFileToIpfs} />
        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
        <button className="font-bold mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded p-4 shadow-lg" onClick={listNFTForSale}>
          Create NFT
        </button>
      </div>
    </div>

  )
}

export default Create