import React from 'react'
import {HashRouter,Route,Switch} from 'react-router-dom';

import Login from './pages/login';
import Layout from './components/Layout';
import App from './App';
import Buttons from './pages/ui/buttons';
import Error404 from './pages/error/404'

export default class IRouter extends React.Component{
  render(){
    return (
      <HashRouter>
        <App>
          <Route path='/login' component={Login}/>
          <Route path='/order/detail' component={Login}/>
          <Route path='/admin' component={Layout}/>
          <Route path='/ui' render={()=>
            <Layout>
              <Switch>
                <Route path="/ui/buttons" component={Buttons}/>
                <Route component={Error404}/>
              </Switch>
            </Layout>  
          }/>
        </App>
      </HashRouter>  
    )
  }
}