import React from 'react'

import Title from './title.jsx'
import UsersList from './users-list.jsx'

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
