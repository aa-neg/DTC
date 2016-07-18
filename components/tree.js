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

	stateTypeCheck(attribute, state) {
		switch (typeof state) {
			case 'object':
				state['__DTC__id'] = this.key;
				state['__DTC__header'] = attribute;
				if (Array.isArray(state)) {
					console.log("within here for array type");
					console.log(attribute);
					console.log(state);
					console.log(state['__DTC__id'])
					// return state.map((state)=> {
					// 	console.log("here is our state");
					// 	console.log(state);
					// })
					// return state.map(this.stateTypeCheck())
				} else {
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
				if (attribute.indexOf('__DTC__') == -1) {
					return (
						<p key={this.key}>here is our attribute {state} </p>
						)
				} else {
					return
				}
		}
	}

	/*
	Function will increment the this.key (mutate this.key)
	*/
	generateSubtree(state) {
		//  Each key interation will append another 'a';
		this.key = this.key + 'a';
		return Object.keys(state).map((attribute, index) => {
			this.key = this.key + index.toString();
			return this.stateTypeCheck(attribute, state[attribute])
		})
	}

	render() {
		let rendering = Object.keys(this.props).map((attribute, index)=> {
			this.key = this.key + index.toString();
			let subtree = this.generateSubtree(this.props[attribute])

			// Create a copy of current key and pass this across (incase async operations occur)
			let currentKey = this.key;
			let header = '';
			switch (typeof this.props[attribute]) {
				case 'object':
					if (this.props[attribute].__DTC__header) {
						header = this.props[attribute].__DTC__header;
					} else {
						header = attribute;
					}
					return (
						<div key={this.key}>
							<button className="accordion" classID={currentKey} onClick={this.activateAccordion}>{header}</button>
							<div className="panel">
								{subtree}
							</div>
						</div>
						)
					break
				default:
					console.log("end case.")
					break
			}
		});
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
