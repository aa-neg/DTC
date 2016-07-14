import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

export class Tree extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				this is our tree
				<h2> Hello there </h2>
			</div>
			)
	}

}

// export default Tree
// const ConnectedTree = connect(actions)(Tree)
// export default ConnectedTree