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
		console.log("here is our tree")
		console.log(tree);
		this.key = this.key + 'a';
		if (Array.isArray(tree)) {
			console.log("This was an array")
			return ''
		} else {
			return Object.keys(tree).map((attribute, index) => {
				this.key = this.key + index.toString();
				let currentKey = this.key;
				switch (typeof tree[attribute]) {
					case 'object':
						tree[attribute]['__DTC__id'] = this.key;
						tree[attribute]['__DTC__header'] = attribute;
						console.log("supposed to have an object");
						return (
							<div key={this.key}>
								<hr/>
								<ConnectedTree data={tree[attribute]}/>
							</div>
						)

					default:
						return (
							<p key={currentKey}>Attribute: {attribute} value: {tree[attribute]}</p>
							)
				}

			})
		}
	}

	/*
	This includes generating the headers
	*/
	generateTree(state) {
		let currentKey = this.key;

		// Different looping depending on array or object
		if (Array.isArray(state)) {
			console.log("Our tree was an array?");

		} else {
			return Object.keys(state).map((attribute, index) => {
				switch (typeof this.props[attribute]) {
					case 'object':
						this.key = this.key + index.toString();
						let currentKey = this.key;
						let subtree = this.generateSubtree(state[attribute]);
						let header = ''
						if (this.props[attribute.__DTC__header]) {
							header = this.props[attribute].__DTC__header;
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
						console.log(typeof this.props[attribute]);
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

	// render() {
	// 	console.log("Rendering this . props");
	// 	console.log(this.props);


	// 	let rendering = Object.keys(this.props).map((attribute, index)=> {
	// 		this.key = this.key + index.toString();
	// 		let subtree = this.generateSubtree(this.props[attribute])

	// 		// Create a copy of current key and pass this across (incase async operations occur)
	// 		let currentKey = this.key;
	// 		let header = '';
	// 		switch (typeof this.props[attribute]) {
	// 			case 'object':
	// 				if (this.props[attribute].__DTC__header) {
	// 					header = this.props[attribute].__DTC__header;
	// 				} else {
	// 					header = attribute;
	// 				}
	// 				return (
	// 					<div key={this.key}>
	// 						<button className="accordion" classID={currentKey} onClick={this.activateAccordion}>{header}</button>
	// 						<div className="panel">
	// 							{subtree}
	// 						</div>
	// 					</div>
	// 					)
	// 				break
	// 			default:
	// 				console.log("end case.")
	// 				break
	// 		}
	// 	});
	// 	return (
	// 		<div>
	// 			{rendering}
	// 		</div>
	// 		)
	// }
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
