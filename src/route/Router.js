import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from '../components/Home.jsx';
import Component1 from '../components/Component1.jsx';
import Component3 from '../components/Component3.jsx';
import Component2 from '../components/Component2.jsx';
import SelectTable from '../components/component1/SelectTable.jsx'
import SelectTable2 from '../components/component1/SelectTable2.jsx'
import SelectTable3 from '../components/component1/SelectTable3.jsx'

const BasicRoute = () => (
    <HashRouter>
        <Home >
          <Route path="/component1/:num" component={Component1}/>

            {/* <Route exact path="SelectTable" component={SelectTable} />
            <Route exact path="SelectTable2" component={SelectTable2} />
            <Route exact path="SelectTable3" component={SelectTable3} /> */}
          {/* </Route> */}
          <Route path="/component2" component={Component2}/>
          <Route path="/component3" component={Component3}/>
        </Home>
    </HashRouter>
);


export default BasicRoute;