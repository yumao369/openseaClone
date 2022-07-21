import { Modal } from "react-overlays"
import { useState } from "react"

const MethodModal = (props) => {

  const renderBackdrop = (props) => {
    return <div className="fixed top-0 bottom-0 left-0 right-0 bg-blue-300 opacity-50 z-10" {...props} />
  }

  return (
    <div >
      <Modal className="absolute top-1/2 left-1/2 z-20" show={props.visible} renderBackdrop={renderBackdrop}>
        <div className="border-2 bg-white border-blue-500 p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          xxxx
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded" onClick={props.handleHideModal}>
            close</button>
        </div>
      </Modal>
    </div>
  )
}

export default MethodModal