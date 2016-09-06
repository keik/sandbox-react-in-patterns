import React from 'react'

export default class UsersList extends React.Component {

  render() {
    const users = ['dummy0', 'dummy1', 'dummy2']
    const userElements = users.map((user, i) => <li key={i}>{user}</li>)

    return (
      <ul>
        {userElements}
      </ul>
    )
  }
}
