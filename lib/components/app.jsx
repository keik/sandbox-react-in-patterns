import React from 'react'

import Title from './title'
import UsersList from './users-list'

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Title text='Hello React' />
        <UsersList/>
      </div>
    )
  }
}
