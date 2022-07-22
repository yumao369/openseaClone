import { useContext } from "react"
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"

const Header = () => {
  const { connectWallet, currentAccount } = useContext(NFTMarketplaceContext)
  return (
    <div className="relative w-full flex md:justify-center justify-between items-center p-4 border-b-2 border-blue-300 font-bold">
      <div>ContractManager</div>
      <div className="absolute right-40">
        {!currentAccount ? (
          <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] list-none" onClick={connectWallet}>
            Connect Wallet
          </li>
        ) : (
          <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer  list-none" onClick={connectWallet}>
            Wallet Connected
          </li>
        )}
      </div>
    </div>
  )
}

export default Header