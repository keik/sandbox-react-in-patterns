import React from 'react'

export default class Title extends React.Component {

  constructor() {
    super()
  }


  render() {
    return (
      <h1>{ this.props. text }</h1>
    )
  }
}

Title.propTypes = {
  text: React.PropTypes.string
}

Title.defaultProps = {
  text: 'Hello world'
}
