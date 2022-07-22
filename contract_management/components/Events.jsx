
import { useEffect, useState, useContext } from "react"
import { Card, Row, Col, Divider, List, Collapse, Form, Input, Spin } from "antd"
import EventGrid from "./EventGrid"
import { ethers } from "ethers"
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"

/**
 * look at this article about how to use ethers.js to get
 * pastEvents.
 * https://github.com/ethers-io/ethers.js/issues/52
 */
const defaultFromBlock = 0
const defaultToBlock = 'latest'

const Item = (props) => {

  const [fromBlock, setFromBlock] = useState('')
  const [toBlock, setToBlock] = useState('')
  const [eventResult, setEventResult] = useState([])
  const [loading, setLoading] = useState(true)


  const handleFromBlockChange = (e) => {
    setFromBlock(e.target.value)
  }

  const handleToBlockChange = (e) => {
    setToBlock(e.target.value)
  }

  const handleFetchClick = async () => {
    const result = await props.onFetch(props.event.name, fromBlock, toBlock)
    setEventResult(result)
    setLoading(false)
    console.log(result, props.event)
  }

  return (
    <div>
      <Form>
        <Row gutter={8}>
          <Col span={6}>
            <Form.Item label='From block'>
              <Input value={fromBlock} onChange={handleFromBlockChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label='To block'>
              <Input value={toBlock} onChange={handleToBlockChange} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col span={12}>
          <button onClick={handleFetchClick}>Fetch</button>
        </Col>
      </Row>
      <Spin spinning={loading}>
        {
          eventResult.length !== 0
            ? <EventGrid result={eventResult} event={props.event} />
            : <></>
        }
      </Spin>
    </div>
  )
}

const Events = () => {

  const { NFTMarketplaceContractInterface, NFTMarketplaceContract } = useContext(NFTMarketplaceContext)

  const [events, setEvents] = useState([])

  const { ethereum } = window

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = () => {
    console.log(NFTMarketplaceContract, NFTMarketplaceContractInterface)
    const { events } = NFTMarketplaceContractInterface
    const value = []
    Object.keys(events).map(item => {
      value.push(events[item])
    })
    console.log('value', value)
    setEvents(value)
  }

  const fetchEventsResult = async (eventName, fromBlock, toBlock) => {
    const from = fromBlock === '' ? defaultFromBlock : fromBlock
    const to = toBlock === '' ? defaultToBlock : toBlock
    const result = await NFTMarketplaceContract.queryFilter(eventName, from, to)
    return result
  }

  return (
    <Collapse>
      {
        events.map((event, index) => (
          <Collapse.Panel header={event.name} key={index}>
            <Item event={event} onFetch={fetchEventsResult} />
          </Collapse.Panel>
        ))
      }
    </Collapse>
  )
}

export default Events