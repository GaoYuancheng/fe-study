import React, {Fragment} from 'react';
import { Route , Link, Switch} from 'react-router-dom';
import SelectTable from './component1/SelectTable.jsx'
import SelectTable2 from './component1/SelectTable2.jsx'
import SelectTable3 from './component1/SelectTable3.jsx'

import { Menu } from 'antd';


class Component1 extends React.Component{
  state = {
    selected: '',
  }
  //顶部导航
  handleClick = (e) => {
    // console.log('click ', e);
    this.setState({
      selected: e.key,
    });
  }

  //生命周期

  //在url变化时调用的生命周期函数
  componentWillReceiveProps = () =>{
    this.setState({
      selected : this.props.history.location.pathname
    })
  }
  
  componentDidMount(){
    this.setState({
      selected : this.props.location.pathname
    })
  }
  render(){
    return (
      <Fragment>
        <div style = {{marginBottom : 20}}>
          <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.selected]}
          mode="horizontal"
          >
            <Menu.Item key="/component1/SelectTable">
              <Link to="/component1/SelectTable">
              /component1/SelectTable
              </Link>
            </Menu.Item>
            <Menu.Item key="/component1/SelectTable2">
              <Link to="/component1/SelectTable2">
              /component1/SelectTable2
              </Link>
            </Menu.Item>
            <Menu.Item key="/component1/SelectTable3">
              <Link to="/component1/SelectTable3">
              /component1/SelectTable3
              </Link>
            </Menu.Item>
          </Menu>
        </div>
        <div>
          <Switch>
            <Route path="/component1/SelectTable" component={SelectTable} exact/>
            <Route path="/component1/SelectTable2" component={SelectTable2} exact/>
            <Route path="/component1/SelectTable3" component={SelectTable3} exact/>
          </Switch>
        </div>
      </Fragment>

    )
  }
}


export default Component1;