import { ethers } from "ethers";

const FormattedValue = (props) => {

  const renderValue = () => {
    switch (props.type) {
      case 'bool':
        return (
          <div >
            <span>{props.value ? 'True' : 'False'}</span>
          </div>
        )
      case 'address':
        return (
          <div>
            <span >{props.value.toString()}</span>
          </div>
        )
      case 'uint256':
        return (
          <div>
            {
              ethers.utils.formatEther(props.value)
            }
          </div>
        )
      default:
        return (
          <div>
            {props.value.toString()}
          </div>
        )
    }
  }

  return (
    <div>
      {renderValue()}
    </div>
  )
}

export default FormattedValue