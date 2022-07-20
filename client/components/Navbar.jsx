
import { useNavigate } from "react-router-dom"
import opensea from "../src/assets/opensea.svg"
import { useContext } from "react"
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"

const NavbarItem = ({ title, classProps, onClick }) => {
  return <li className={`mx-4 cursor-pointer hover:text-blue-500 ${classProps}`} onClick={() => { onClick(title.toLowerCase()) }}>{title}</li>
}




const Navbar = () => {
  const { connectWallet, currentAccount } = useContext(NFTMarketplaceContext)
  console.log(currentAccount)
  const navigate = useNavigate()

  const handleclick = (name) => {
    navigate(`/${name}`)
  }



  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={opensea} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className=" text-gray-500 md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Create", "Mine", "MyListed"].map((item, index) => (
          <NavbarItem key={item + index} title={item} onClick={handleclick} />
        ))}
      </ul>
      {!currentAccount ? (
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] list-none" onClick={connectWallet}>
          Connect Wallet
        </li>
      ) : (
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer  list-none" onClick={connectWallet}>
          Wallet Connected
        </li>
      )}
    </nav>
  )
}

export default Navbar