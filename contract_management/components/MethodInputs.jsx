import { useState, useEffect } from "react"
import { Form, Input, Button } from "antd"

const MethodInputs = (props) => {
  const [inputs, setInputs] = useState([])

  useEffect(() => {
    formatInputs()
  }, [])

  const formatInputs = () => {
    console.log('props.inputs', props.inputs)
    const formattedInputs = props.inputs.map((input, index) => (
      input.name === '' ? Object.assign({}, input, { name: `Input#${index}` }) : input
    ))
    console.log('formattedInputs', formattedInputs)
    setInputs(formattedInputs)
  }

  const handleSubmit = (value) => {
    if (props.onClick) {
      props.onClick(Object.values(value))
    }
  }

  return (
    <Form onFinish={handleSubmit}>
      {inputs.map((input, index) => (
        <Form.Item key={input.name} label={`${input.name}(${input.type})`} name={input.name}>
          <Input />
        </Form.Item>
      ))
      }
      <Form.Item>
        <Button htmlType="submit">{props.button}</Button>
      </Form.Item>
    </Form>
  )
}

export default MethodInputs