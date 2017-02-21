import React from 'react'
import ReactDOM from 'react-dom'
import { fromJS } from 'immutable'
import Root from './containers/Root'
import storage from './libs/storage'
import { APP_STORAGE, store, serialize, deserialize } from './constants'

const render = (RootComponent) => {
  ReactDOM.render(
    <RootComponent store={store} />,
    document.getElementById('app')
  )
}

render(Root)