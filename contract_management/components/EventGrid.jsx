import { Table } from 'antd'
import FormattedValue from './FormattedValue'

const EventGrid = (props) => {
  const rowKey = 'rowKey'
  console.log('props.eventResult', props.result)
  const eventArgs = props.result.map(item => {
    const keys = Object.keys(item.args)
    const uniqueKeys = keys.filter(key => isNaN(parseInt(key)))
    return uniqueKeys.reduce(
      (obj, key) => ({ ...obj, [key.toString()]: item.args[key] }),
      {
        rowKey: item.transactionHash + item.logIndex,
        blockNumber: item.blockNumber,
        transactionHash: item.transactionHash
      }
    )
  })

  const column = props.event.inputs.map((input, index) => ({
    title: input.name || `Param ${index}`,
    dataIndex: input.name || index,
    key: input.name || index,
    render: (value) => (
      <FormattedValue type={input.type} value={value} />
    )
  }))

  const systemColumns = [
    {
      title: 'Block',
      dataIndex: 'blockNumber',
      key: 'blockNumber',
      render: (value) => <FormattedValue type="" value={value} />
    },
    {
      title: 'TxHash',
      dataIndex: 'transactionHash',
      key: 'transactionHash',
      render: (value) => <FormattedValue type="" value={value} />
    }
  ]


  return (
    <Table dataSource={eventArgs} rowKey={rowKey} columns={column.concat(systemColumns)} size="small" scroll={{ x: true }} />
  )
}

export default EventGrid