import { useEffect, useState, useContext } from "react"
import { Card, Row, Col, Divider, List, Collapse } from "antd"
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"
import { NFTMarketplaceAddress } from "../utils/constants"
import { ethers } from "ethers"
import MethodInputs from "./MethodInputs"
import MethodResults from "./MethodResults"

const Item = (props) => {
  const [callResult, setCallResult] = useState()

  const handleClick = (inputValues) => {
    props.onFetch(props.method.name, inputValues).then(
      result => setCallResult(result)
    ).catch(
      e => alert(e)
    )
  }

  return (
    <div>
      <Row gutter={8}>
        <Col span={12}>
          <MethodInputs button="Fetch" inputs={props.method.inputs} onClick={handleClick} />
        </Col>
        <Col span={12}>
          {
            callResult ? (
              <Card title='Fetch results' size='small'>
                <MethodResults method={props.method} result={callResult} />
              </Card>
            ) : (
              <></>
            )
          }
        </Col>
      </Row>
    </div>
  )
}

const Call = () => {

  const { NFTMarketplaceContractInterface, NFTMarketplaceContract } = useContext(NFTMarketplaceContext)

  const [callMethods, setCallMethods] = useState([])

  useEffect(() => {
    fetchCallMethod()
  }, [])

  const fetchCallMethod = () => {
    console.log('xxxxxxxxxxxxxx')
    const { functions } = NFTMarketplaceContractInterface
    const methods = []
    Object.keys(functions).map(item => {
      if (functions[item].constant === true && functions[item].inputs.length > 0) {
        methods.push(functions[item])
      }
    })
    setCallMethods(methods)
  }

  const fetchResult = async (methodName, methodParams) => {
    return new Promise((resolve, reject) => {
      NFTMarketplaceContract[methodName](...methodParams).then(
        result => resolve(result)
      ).catch(
        error => reject(error)
      )
    })
  }

  return (
    <Collapse>
      {
        callMethods.map(method => (
          <Collapse.Panel header={method.name} key={method.name}>
            <Item method={method} onFetch={fetchResult} />
          </Collapse.Panel>
        ))
      }
    </Collapse>
  )
}

export default Call