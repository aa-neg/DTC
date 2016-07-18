import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Branch } from './branch';
// var style = require('../style/treeStyle.css');
const _ = require('underscore');



export class Tree extends Component {
	constructor(props) {
		super(props)
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
								<div>
									<button className="accordion" onClick={this.activate}>{attribute}</button>
									<div className="panel">
										<p key={key}>value here: {value[attribute]} </p>
									</div>
								</div>
							)
							break
						case 'object':
							console.log("objectfy")
							return (
								<div style={{ 'marginRight':'30px', color: 'lightblue' }}>
									<button className="accordion" onClick={this.activate}>section</button>
									<div className="panel">
										<ConnectedTree  key={key} data={value[attribute]}/>
									</div>
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

	activate() {

		var acc = document.getElementsByClassName("accordion");
		var i;

		for (i = 0; i < acc.length; i++) {
		    acc[i].onclick = function(){
		        this.classList.toggle("active");
		        this.nextElementSibling.classList.toggle("show");
		    }
		}
	}

	generateSubtree(state) {
		console.log(state)

		let keyChar = 'a';

		return Object.keys(state).map((attribute, index) => {
			let key = index.toString() + keyChar;

			switch (typeof state[attribute]) {
				case 'object':
					return (
						<div>
							<hr/>
							<ConnectedTree key={key} data={state[attribute]}/>
						</div>
						)
					break
				case 'array':
					console.log("its an array");
					break
				default:
					return (
						<p key={key}>here is our attribute {state[attribute]} </p>
						)
			}

			keyChar = String.fromCharCode(keyChar.charCodeAt() + 1);

		})

	}

	render() {


		let keyChar = 'a';

		return Object.keys(this.props).map((attribute, index)=> {
			let key = index.toString() + keyChar;
			keyChar = String.fromCharCode(keyChar.charCodeAt() + 1);
			console.log(this.props[attribute])
			let uniqueID = 1
			let subtree = this.generateSubtree(this.props[attribute], uniqueID)
			console.log(subtree)
			switch (typeof this.props[attribute]) {
				case 'object':
					return (
						<div key = {key}>
							<button className="accordion" onClick={this.activate}>{attribute}</button>
							<div className="panel">
								{subtree}
							</div>
						</div>
						)
				default:
					console.log("some leaf node")
			}
		});
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
