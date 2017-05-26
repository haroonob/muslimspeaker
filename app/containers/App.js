import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import configureStore from '../storage/configureStore';
import { connect, Provider } from 'react-redux';
import AppLaunch from './Launcher';
import Home from './Home';
import TestComponent from '../components/TestComponent';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import BottomPlayerBar from "../components/BottomPlayerBar";
import MainNavbar from '../components/MainNavbar'
const store = createStore(reducers, applyMiddleware(thunk));


export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>

          <Scene key="launch" component={AppLaunch} initial hideNavBar hideTabBar />

          <Scene key="home" component={MainNavbar}  >
            <Scene key="main" component={Home} />
            <Scene key="test" component={TestComponent} />             
          </Scene>
     

        </Router>
      </Provider>
    );
  }
}
