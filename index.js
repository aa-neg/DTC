import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Node from './containers/Node'

import ConnectedTree from './components/tree'
import configureStore from './store/configureStore'

import testConfigs from './testConfigs/testConfigs'

// const tree = generateTree()
const store = configureStore(testConfigs.config1)

render(
  <Provider store={store}>
    <ConnectedTree/>
  </Provider>,
  document.getElementById('root')
)
