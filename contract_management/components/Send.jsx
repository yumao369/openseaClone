import { useEffect, useState, useContext } from "react"
import { Card, Row, Col, Divider, List, Collapse } from "antd"
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"
import MethodInputs from "./MethodInputs"
import { ethers } from "ethers"

const Item = (props) => {

  const [hash, setHash] = useState()

  const handleClick = async (inputValues) => {
    const transcationhash = await props.onSend(props.method.name, inputValues)
    setHash(transcationhash)
  }

  return (
    <div>
      <Row gutter={8}>
        <Col span={12}>
          <MethodInputs button="Generate" inputs={props.method.inputs} onClick={handleClick} />
        </Col>
      </Row>
      <Col span={12}>
        {
          hash ? (
            <Card title='transcation Hash' size='small'>
              <div>{hash}</div>
            </Card>
          ) : (
            <></>
          )
        }
      </Col>
    </div>
  )
}

const Send = () => {
  const { NFTMarketplaceContractInterface, NFTMarketplaceContract } = useContext(NFTMarketplaceContext)

  const [sendMethods, setSendMethods] = useState([])

  useEffect(() => {
    fetchSendMethod()
  }, [])

  const fetchSendMethod = () => {
    console.log('xxxxxxxxxxxxxx')
    const { functions } = NFTMarketplaceContractInterface
    const methods = []
    Object.keys(functions).map(item => {
      if (functions[item].constant === false) {
        methods.push(functions[item])
      }
    })
    console.log('methods', methods)
    setSendMethods(methods)
  }

  const sendHash = async (methodName, methodParams) => {
    const transcation = await NFTMarketplaceContract[methodName](...methodParams)
    await transcation.wait()
    console.log(transcation)
    return transcation.hash
  }

  return (
    <Collapse>
      {
        sendMethods.map((method, index) => (
          <Collapse.Panel header={method.name} key={index}>
            <Item method={method} onSend={sendHash} />
          </Collapse.Panel>
        ))
      }
    </Collapse>
  )
}

export default Send