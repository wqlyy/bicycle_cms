import React from 'react'
import {HashRouter,Route,Switch} from 'react-router-dom';

import Login from './pages/login';
import Layout from './components/Layout';
import App from './App';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loading'
import Notification from './pages/ui/notification'
import Messages from './pages/ui/messages'
import Tab from './pages/ui/tabs'
import Gallerys from './pages/ui/gallery'
import Carousels from './pages/ui/carousel'

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
                <Route path="/ui/modals" component={Modals}/>
                <Route path="/ui/loadings" component={Loadings}/>
                <Route path="/ui/notification" component={Notification}/>
                <Route path="/ui/messages" component={Messages}/>
                <Route path="/ui/tabs" component={Tab}/>
                <Route path="/ui/gallery" component={Gallerys}/>
                <Route path="/ui/carousel" component={Carousels}/>
                <Route component={Error404}/>
              </Switch>
            </Layout>  
          }/>
        </App>
      </HashRouter>  
    )
  }
}