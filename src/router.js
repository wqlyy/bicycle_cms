import React from 'react'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';
import AdminLayout from './components/Layout';
import CommonLayout from './components/Common';
import App from './App';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loading'
import Notification from './pages/ui/notification'
import Messages from './pages/ui/messages'
import Tab from './pages/ui/tabs'
import Gallerys from './pages/ui/gallery'
import Carousels from './pages/ui/carousel'
import Logins from './pages/form/login'
import Register from './pages/form/register'
import BaseTable from './pages/tables/base'
import HighTable from './pages/tables/high'
import City from './pages/city'
import Order from './pages/order'


import Error404 from './pages/error/404'

export default class IRouter extends React.Component{
  render(){
    return (
      <HashRouter>
        <App>
           <Switch>
            <Route path="/login" component={Login}/>
            
            <Route path="/common" render={()=>
              <CommonLayout>
                <Route path='/common/order/detail/:orderId' component={Login}/>
              </CommonLayout>  
            } />
            
            
            <Route exact path="/" render={()=>
              <Redirect to="/home" />
            } />
            <Route path='/' render={()=>
              <AdminLayout>
                <Switch>
                  <Route path='/home' component={Home}/>
                  <Route path="/ui/buttons" component={Buttons}/>
                  <Route path="/ui/modals" component={Modals}/>
                  <Route path="/ui/loadings" component={Loadings}/>
                  <Route path="/ui/notification" component={Notification}/>
                  <Route path="/ui/messages" component={Messages}/>
                  <Route path="/ui/tabs" component={Tab}/>
                  <Route path="/ui/gallery" component={Gallerys}/>
                  <Route path="/ui/carousel" component={Carousels}/>
                  <Route path="/form/reg" component={Register}/>
                  <Route path="/form/login" component={Logins}/>
                  <Route path="/table/basic" component={BaseTable}/>
                  <Route path="/table/high" component={HighTable}/>
                  <Route path="/city" component={City}/>
                  <Route path="/order" component={Order}/>
                  <Route component={Error404}/>
                </Switch>
              </AdminLayout>  
            }/>
            <Route component={Error404}/>
           </Switch>
        </App>
      </HashRouter>  
    )
  }
}