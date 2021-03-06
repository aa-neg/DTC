
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Node from './containers/Node'

import ConnectedTree from './components/tree'
import configureStore from './store/configureStore'

import testConfigs from './testConfigs/testConfigs'
import './style/treeStyle.css'

// const tree = generateTree()
const store = configureStore(testConfigs.config1)

render(
  <div>
  <Provider store={store}>
    <ConnectedTree/>
  </Provider>
  </div>,
  document.getElementById('root')
)
