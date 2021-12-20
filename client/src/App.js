import React, { Component } from 'react';
import {Route , Redirect, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import LoginEmail from './Containers/login/email/login-email';
import LoginPassword from './Containers/login/password/login-password';
import SignUp from './Containers/signup/signup';
// import Layout from './hoc/Layout/Layout';
import HomeView from './Containers/HomeView/HomeView';
import Auxiliary from './hoc/Auxiliary/Auxiliary';

class App extends Component{
  componentDidMount(){
  }

  render(){
    let routes=(
      <Switch>
        <Route path="/" exact><Redirect to="/signin" /></Route>
        <Route path="/signin" exact component={LoginEmail} />
        <Route path="/signin/pwd" exact component={LoginPassword} />
        <Route path="/signup" exact component={SignUp} />
        <Redirect to="/" />
      </Switch>
    )
    
    if(this.props.isAuthenticated){
      routes=(
        // <Layout>
          <Switch>
            <Route path="/" exact component={HomeView} />
            <Redirect to="/" />
          </Switch>
        // </Layout>
      )
    }
    return(
        <Auxiliary>
          {routes}
        </Auxiliary>
    )
  }
}

const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.authenticated
  }
}

export default connect(mapStateToProps)(App);
