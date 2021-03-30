import React, {Component} from 'react';
import './App.css';
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Switch, Route, withRouter, Redirect} from 'react-router-dom'
import Logout from'./containers/Auth/Logout/Logout'
import {connect} from 'react-redux'
import * as actionCreators from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})

class App extends Component {
  constructor(props){
    super(props)
    this.props.onPersistLogin();
  }
  render() {
    let routes = (
      <Switch>
      <Route path='/auth' component={asyncAuth}/>
      <Route path='/' exact component={BurgerBuilder}/>
      <Redirect to='/'/>
      </Switch>
    )
    if(this.props.isLoggedIn)
    routes = (
      <Switch>
        <Route path='/checkout' component={asyncCheckout}/>
        <Route path='/orders' component={asyncOrders}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    )
    return (
     <div>
       <Layout>
         {routes}
       </Layout>
      
     </div>
   );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onPersistLogin: () => dispatch(actionCreators.authCheckState())
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.token !== null
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
