import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Node from './containers/Node'

import { Tree } from './components/tree'
import configureStore from './store/configureStore'
import generateTree from './generateTree'

// const tree = generateTree()
const store = configureStore({hello: 'greeting'})

render(
  <Provider store={store}>
    <Tree/>
  </Provider>,
  document.getElementById('root')
)
