import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import branch from './branch';

export class Tree extends Component {
	constructor(props) {
		super(props)
		console.log("here are our props")
		console.log(props)
	}

	render() {

		Object.keys(this.props).forEach((attribute)=> {
			if (typeof this.props[attribute] == 'object') {
				console.log("inside here we are recursing through")
				console.log(this.props[attribute])
				return (
					<Tree data={this.props.attribute}/>
					)
			} else {
				console.log("We found a leaf node");
				return (
					<div>
						hello we have our node
						{this.props[attribute]}
					</div>
					)
			}
		})
	}

}

function mapStateToProps(state, ownProps) {
	console.log(state);
	console.log(ownProps);
	return state
}


const ConnectedTree = connect(mapStateToProps, null)(Tree)

export default ConnectedTree
// export default Tree
// const ConnectedTree = connect(actions)(Tree)
// export default ConnectedTree