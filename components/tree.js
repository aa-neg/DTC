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
								<p key={key}>value here: {value[attribute]} </p>
							)
							break
						case 'object':
							console.log("objectfy")
							return (
								<div style={{ 'marginRight':'30px', color: 'lightblue' }}>
									<ConnectedTree  key={key} data={value[attribute]}/>
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
		console.log("activating");
			var acc = document.getElementsByClassName("accordion");
		var i;

		for (i = 0; i < acc.length; i++) {
		    acc[i].onclick = function(){
		    	console.log("oi")
		        this.classList.toggle("active");
		        this.nextElementSibling.classList.toggle("show");
		    }
		}
	}

	render() {

		let rendering = Object.keys(this.props).map((attribute, index)=> {
			if (typeof this.props[attribute] != 'function') {
				return this.typeChecker(this.props[attribute], index)
			}
		});


		return (
			<div>
				<button className="accordion" onClick={this.activate}>section</button>
				<div className="panel">
					{rendering}
				</div>
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
