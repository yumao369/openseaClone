import { useEffect, useState, useContext } from "react"
import { Card, Row, Col, Divider, List } from "antd"
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"
import { NFTMarketplaceAddress } from "../utils/constants"
import { ethers } from "ethers"

const PropertyCard = (props) => {
  return (
    <Card size="small">
      <Row>
        <Col span={2}>
          <span>{props.title}</span>
        </Col>
        <Col>{props.children}</Col>
      </Row>
    </Card>
  )
}

const Properties = () => {
  const { ethereum } = window
  const { NFTMarketplaceContractInterface, NFTMarketplaceContract } = useContext(NFTMarketplaceContext)

  //const [properties, setProperties] = useState({})
  const [properties, setProperties] = useState([])
  const [ethBalance, setEthBalance] = useState()

  useEffect(() => {
    fetchProperties()
    fetchETHBalance()
  }, [])

  const fetchProperties = async () => {
    const { functions } = NFTMarketplaceContractInterface
    //let temp = {}
    //Object.keys(functions).map(item => {
    //  if (functions[item].constant === true && functions[item].inputs.length === 0) {
    //    temp = { ...temp, [item]: functions[item] }
    //  }
    //})
    console.log('functions', functions)
    const propertiesName = []
    Object.keys(functions).map(item => {
      if (functions[item].constant === true && functions[item].inputs.length === 0) {
        propertiesName.push(functions[item])
      }
    })
    const temp = await Promise.all(propertiesName.map(async item => {
      const result = await NFTMarketplaceContract[item.name]()
      if (ethers.BigNumber.isBigNumber(result)) {
        return { method: item, result: ethers.utils.formatEther(result) }
      }
      return { method: item, result: result }
    }))
    setProperties(temp)
  }

  const fetchETHBalance = async () => {
    /**
     * neet to have an account to connect this site,or there will be an error to excute the code below
     * check this https://stackoverflow.com/questions/71198438/ethers-js-error-unknown-account-0-operation-getaddress-code-unsupported-o
     * const x = await NFTMarketplaceContract.fetchMarketItems()
    */
    const provider = new ethers.providers.Web3Provider(ethereum)
    const balance = await provider.getBalance(NFTMarketplaceAddress)
    const balanceFormatted = ethers.utils.formatEther(balance)
    setEthBalance(balanceFormatted)
  }

  return (
    <div>
      <PropertyCard title="Address">
        <div>{NFTMarketplaceAddress}</div>
      </PropertyCard>
      <PropertyCard title="ETH Balance">
        <div>{ethBalance}</div>
      </PropertyCard>
      <Divider />
      <List
        grid={{ column: 1 }}
        size="small"
        dataSource={properties}
        renderItem={(item) => {
          return (
            <PropertyCard
              title={item.method.name}
            >
              <div>{JSON.stringify(item.result)}</div>
            </PropertyCard>
          )

        }}
      />
    </div>
  )
}

export default Properties