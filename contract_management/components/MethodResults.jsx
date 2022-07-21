import FormattedValue from "./FormattedValue"

const MethodResults = (props) => {
  return (
    <div>
      {
        props.result ? (
          props.method.outputs.length === 1 ? (
            <FormattedValue value={props.result} type={props.method.outputs[0].type} />
          ) : (
            <></>
          )
        ) : (
          <></>
        )
      }
    </div >
  )
}

export default MethodResults