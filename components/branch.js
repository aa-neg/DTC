import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

export class Branch extends Component {

	constructor(props) {
		super(props)
		console.log("here are our props from the branch");
		console.log(props)
		// console.log(this.props.data)
	}

	render() {
		return (

			<div>
				We have recieved a branch here!
			</div>
			)

	}
}

export default Branch