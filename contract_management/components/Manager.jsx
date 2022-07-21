
/*import { useEffect, useState, useContext } from "react"
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext"
import { ethers, utils } from "ethers"
import { getAllMethods } from "../functions/getAllMethods"
import MethodModal from "./MethodModal"

const MethodWrap = (props) => {

  const handleClick = (name) => {
    props.handleShowModal()
    props.handleCurrentFunChange(name)
  }

  return (
    <div className="flex flex-col w-1/4 h-1000 border-2 border-blue-200 justify-start items-center p-3">
      <div>{props.title}</div>
      {
        Object.keys(props.methods).map(item => {
          return (
            <button key={item} className="font-bold w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded p-4 shadow-lg" onClick={() => { handleClick(item) }}>
              {item}
            </button>
          )
        })
      }
    </div>
  )
}

const Manager = () => {
  const { NFTMarketplaceContract, NFTMarketplaceABI, NFTMarketplaceContractInterface } = useContext(NFTMarketplaceContext)
  const { events, functions } = NFTMarketplaceContractInterface
  console.log(events, functions)

  const [callFun, setCallFun] = useState({})
  const [sendFun, setSendFun] = useState({})
  const [eventFun, setEventFun] = useState({})
  const [visible, setVisible] = useState(false)
  const [currentCallFun, setCurrentCallFun] = useState()
  const [currentSendFun, setCurrentSendFun] = useState()
  const [currentEventFun, setCurrentEventFun] = useState()
  const [currentParams, setCurrentParams] = useState({})

  useEffect(() => {
    const { callFun, sendFun, eventFun } = getAllMethods(NFTMarketplaceABI)
    setCallFun(callFun)
    setSendFun(sendFun)
    setEventFun(eventFun)
    console.log(utils.formatUnits('1', 'ether'))
  }, [])

  const handleShowModal = () => {
    setVisible(true)
  }

  const handleHideModal = () => {
    setVisible(false)
  }

  const handleCurrentCallFunChange = (name) => {
    setCurrentCallFun(name)
  }

  const handleCurrentSendFunChange = (name) => {
    setCurrentSendFun(name)
  }

  const handleCurrentEventFunChange = (name) => {
    setCurrentEventFun(name)
  }

  return (
    <div className="relative w-5/6 flex flex-row justify-around border-2 border-blue-500 mt-10 p-5">
      <MethodWrap title='callMethod' methods={callFun} handleShowModal={handleShowModal} handleCurrentFunChange={handleCurrentCallFunChange} />
      <MethodWrap title='sendMethod' methods={sendFun} handleShowModal={handleShowModal} handleCurrentFunChange={handleCurrentSendFunChange} />
      <MethodWrap title='eventMethod' methods={eventFun} handleShowModal={handleShowModal} handleCurrentFunChange={handleCurrentEventFunChange} />
      <MethodModal visible={visible} handleHideModal={handleHideModal} />
    </div>
  )
}

export default Manager*/
import { Tabs } from "antd"
import Call from "./call";
import Events from "./Events";
import Properties from "./Properties";
import Send from "./Send";

const TabPane = Tabs.TabPane;

const Manager = () => {
  return (
    <div className="w-4/5">
      <Tabs defaultActiveKey="send">
        <TabPane tab="Properties" key="properties">
          <Properties />
        </TabPane>
        <TabPane tab="Call" key="call">
          <Call />
        </TabPane>
        <TabPane tab="Send" key="send">
          <Send />
        </TabPane>
        <TabPane tab="Events" key="event">
          <Events />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Manager