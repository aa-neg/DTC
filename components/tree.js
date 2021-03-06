import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Branch } from './branch';
// var style = require('../style/treeStyle.css');
const _ = require('underscore');

export class Tree extends Component {
	constructor(props) {
		super(props)
		//If recursive iteration assign local level key
		if (this.props.data && this.props.data.__DTC__id) {
			this.key = this.props.data.__DTC__id;
		// If first loop through assign level a
		} else {
			this.key = 'a';
		}
	}

	activateAccordion(element) {
		element.target.classList.toggle("active");
		element.target.nextElementSibling.classList.toggle("show");
	}

	stateTypeCheck(header, state) {
		switch (typeof state) {
			case 'object':
				state['__DTC__id'] = this.key;
				state['__DTC__header'] = header;
				if (Array.isArray(state)) {
					console.log("within here for array type");
					console.log(header);
					console.log(state);
					console.log(state['__DTC__id'])
					return this.generateSubtree(state)
					// state.map(this.generateSubtree);
					// return state.map(this.stateTypeCheck())
				} else {
					console.log("we are recursing through to the ConnectedTree");
					console.log(state);
					return (
					<div key={this.key}>
						<hr/>
						<ConnectedTree data={state}/>
					</div>
					)
				}
				break
			default:
				// If it is not a DTC unique property print it out.
				if (header.indexOf('__DTC__') == -1) {
					return (
						<p key={this.key}>here is our attribute: {state} </p>
						)
				} else {
					return
				}
		}
	}

	/*
	Function will increment the this.key (mutate this.key)
	*/
	// generateSubtree(state) {
	// 	//  Each key interation will append another 'a';
	// 	this.key = this.key + 'a';
	// 	if (Array.isArray(state)) {
	// 		return state.map((attribute,index) => {
	// 			this.key = this.key + index.toString();
	// 			console.log("we are mapping our array state.");
	// 			console.log(attribute);
	// 			return this.stateTypeCheck(state.__DTC__header, state[index])
	// 		})
	// 	} else {
	// 		return Object.keys(state).map((attribute, index) => {
	// 			this.key = this.key + index.toString();
	// 			return this.stateTypeCheck(attribute, state[attribute])
	// 		})
	// 	}

	// }

	/*
	This requires generating the inner tree which will be the pertaining values
	*/
	generateSubtree(tree) {
		console.log("here is our subtree")
		console.log(tree);
		this.key = this.key + 'a';
		if (Array.isArray(tree)) {
			return tree.map((value, index)=> {
				this.key = this.key + index.toString();
				let currentKey = this.key;
				console.log(index);
				console.log(tree[index]);
				switch (typeof value) {
					case 'object':
						value.__DTC__id = this.key;
						//Insert header option here.
						return (
							<div key={currentKey}>
								<hr/>
								<ConnectedTree data={value}/>
							</div>
							)
					default:
						return (
							<p key={currentKey}> From array value: {value}</p>
							)
				}
			})
			let currentKey = this.key;
			console.log("We have an array what will we do?");
			console.log(tree);
		} else {
			return Object.keys(tree).map((attribute, index) => {
				this.key = this.key + index.toString();
				let currentKey = this.key;
				switch (typeof tree[attribute]) {
					case 'object':
						tree[attribute]['__DTC__id'] = this.key;
						tree[attribute]['__DTC__header'] = attribute;
						console.log("supposed to have an object");
						console.log(tree[attribute]);
						return (
							<div key={currentKey}>
								<hr/>
								<ConnectedTree data={tree[attribute]}/>
							</div>
						)

					default:
						if (attribute.indexOf('__DTC__') == -1) {
							return (
								<p key={currentKey}>Attribute: {attribute} value: {tree[attribute]}</p>
								)
						} else {
							return
						}
				}

			})
		}
	}

	/*
	This includes generating the headers
	*/
	generateTree(state) {
		console.log("here is our main tree");
		console.log(state);
		console.log
		let currentKey = this.key;

		// Different looping depending on array or object
		if (Array.isArray(state)) {
			return state.map((attribute, index) => {
				switch (typeof state[attribute]) {
					case 'object':
						this.key = this.key + index.toString();
						let currentKey = this.key;
						let subtree = this.generateSubtree(attribute);
						let header = ''
						if (attribute.__DTC__header) {
							header = attribute.__DTC__header;
						} else {
							header = attribute;
						}
						return (
							<div key={currentKey}>
								<button className="accordion" classID={currentKey} onClick={this.activateAccordion}>{header}</button>
									<div className="panel">
			 							{subtree}
			 						</div>
							</div>
						)
						break;
					case 'function':
						console.log("we got a function");
						break;

					default:
						console.log("non object attribute");
						console.log(typeof state[attribute]);
						console.log(attribute);
						break;
				}
			})

		} else {
			return Object.keys(state).map((attribute, index) => {
				switch (typeof state[attribute]) {
					case 'object':
						this.key = this.key + index.toString();
						let currentKey = this.key;
						let subtree = this.generateSubtree(state[attribute]);
						let header = ''
						if (state[attribute].__DTC__header) {
							header = state[attribute].__DTC__header;
						} else {
							header = attribute;
						}
						return (
							<div key={currentKey}>
								<button className="accordion" classID={currentKey} onClick={this.activateAccordion}>{header}</button>
									<div className="panel">
			 							{subtree}
			 						</div>
							</div>
						)
						break;
					case 'function':
						console.log("we got a function");
						break;

					default:
						console.log("non object attribute");
						console.log(typeof state[attribute]);
						console.log(attribute);
						break;
				}

			})

		}

	}

	render() {
		let rendering = this.generateTree(this.props);
		return (
			<div>
				{rendering}
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
