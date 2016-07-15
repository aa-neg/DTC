import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Branch } from './branch';

console.log(Branch)
export class Tree extends Component {
	constructor(props) {
		super(props)
		this.renderChild = this.renderChild.bind(this)
		this.dictionaryRender = this.dictionaryRender.bind(this)
		console.log(this.dictionaryRender)
	}

	renderChild(childTree) {
		return (
			<Branch data={childTree}/>
			)
	}

	renderLeaf(leaf) {
		console.log("we are rendering our leaf")
		return (
			<div >
				I am a leaf node {leaf}
			</div>
			)
	}

	dictionaryRender(value, key) {
		console.log("inside dictionary Render");
		console.log(value, key)
	}

	typeChecker(value, index) {
		console.log("going through the type checker")
		console.log(value)
		switch (typeof value) {
			case 'object':
				let keyChar = 'a';
				return Object.keys(value).map((attribute)=> {
					let key = index.toString() + keyChar;
					keyChar = String.fromCharCode(keyChar.charCodeAt() + 1);
					switch (typeof value[attribute]) {
						case 'string':
							console.log("stringified");
							return (
								<p key={key}>value here: {value[attribute]} </p>
							)
							break
						case 'object':
							console.log("objectfy")
							return (
								<Branch key={key} data={value[attribute]}/>
							)
							break
						case 'array':
							console.log("arrying")
							break
						default:
							console.log("everything else")
					}

				})
			default:
				console.log("probably at a leaf node");
		}
	}

	render() {

		let branches = <Branch data={this.props.level1a}/>

		let values = [];

		let rendering = Object.keys(this.props).forEach((attribute)=> {
			if (typeof this.props[attribute] != 'function') {
				values.push(this.props[attribute])
			}
		});

		console.log("here is our values")

		console.log(values)

		let renderedValues = values.map(this.typeChecker)

		console.log("here are our rendered values");

		console.log(renderedValues)
		return (
			<div>
				{renderedValues}
				<br/>
				<hr/>
				<Branch data={this.props.level1}/>
			</div>
			)



		// Object.keys(this.props).forEach((attribute)=> {
		// 	if (typeof this.props[attribute] == 'object') {
		// 		console.log("inside here we are recursing through")
		// 		console.log(this.props[attribute])
		// 		return (
		// 			<div>
		// 				<Branch data={this.props[attribute]}/>
		// 			</div>
		// 			)
		// 	} else {
		// 		console.log("leaf part")
		// 		return (
		// 			<div>
		// 				hello we have our node
		// 			</div>
		// 			)
		// 	}
		// })
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