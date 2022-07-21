export const getAllMethods = (abi) => {
  const callFun = abi.reduce((prev, cur) => {
    if ((cur.stateMutability === "pure" || cur.stateMutability === "view" || cur.stateMutability === "constant")) {
      return { ...prev, [cur.name]: cur }
    }
    return prev;
  },
    {}
  )
  const sendFun = abi.reduce((prev, cur) => {
    if ((cur.stateMutability === "payable" || cur.stateMutability === "nonpayable") && cur.name) {
      return { ...prev, [cur.name]: cur }
    }
    return prev;
  },
    {}
  )
  const eventFun = abi.reduce((prev, cur) => {
    if (cur.type === "event") {
      return { ...prev, [cur.name]: cur }
    }
    return prev;
  }, {}
  )
  return { callFun, sendFun, eventFun }
}