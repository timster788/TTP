import React, { Component } from 'react'
import { Table, Header } from 'semantic-ui-react'

export default class TransactionPage extends Component {
  
  render() {
    const { name, quantity, symbol, createdAt } = this.props
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
    const date = new Date(createdAt)
    const formattedDate = date.toLocaleDateString('en-US', options)

    return (
      <Table.Row>
        <Table.Cell>
          <Header as='h3'>
            {name}
          </Header>
        </Table.Cell>
        <Table.Cell>{symbol}</Table.Cell>
        <Table.Cell>
          {quantity}
        </Table.Cell>
        <Table.Cell>
          {formattedDate}
        </Table.Cell>
      </Table.Row>
    )
  }
}


