import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Home from '../components/Home.jsx';
import Component1 from '../components/Component1.jsx';
import Component3 from '../components/Component3.jsx';
import Component2 from '../components/Component2.jsx';


const BasicRoute = () => (
    <HashRouter>
        <Route path="/" component={Home} />
          <Route path="/component1/:num" component={Component1}/>
          <Route path="/component2" component={Component2}/>
          <Route path="/component3" component={Component3}/>
    </HashRouter>
);


export default BasicRoute;