import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Branch } from './branch';

const _ = require('underscore');

export class Tree extends Component {
	constructor(props) {
		super(props)
		console.log(props)
		this.renderChild = this.renderChild.bind(this)
		this.dictionaryRender = this.dictionaryRender.bind(this)

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
								<div style={{ 'marginRight':'30px', color: 'lightblue' }}>
									<ConnectedTree  key={key} data={value[attribute]}/>
									<hr/>
								</div>
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

		let renderedValues = values.map(this.typeChecker)
		return (
			<div>
				{renderedValues}
			</div>
			)
	}

}

function mapStateToProps(state, ownProps) {
	if (!_.isEmpty(ownProps)) {
		return ownProps
	//Base case returning the original state
	} else {
		return state
	}
}


const ConnectedTree = connect(mapStateToProps, null)(Tree)

export default ConnectedTree
