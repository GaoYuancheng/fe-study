import React from 'react';
import { Button, Layout, Menu, Icon } from 'antd';
import {HashRouter, Route , Prompt, Link, withRouter} from 'react-router-dom';
// import '../assets/windowClick'
import Component1 from '../components/Component1.jsx';
import Component3 from '../components/Component3.jsx';
import Component2 from '../components/Component2.jsx';

const {
  Header, Content, Footer, Sider,
} = Layout;

// windowClick()


class Home extends React.Component{
  state = {
    selected : ''
  }

  handleClick = (e) => {
    // console.log('click ', e);
    this.setState({
      selected: e.key,
    });
  }

  //在url变化时调用的生命周期函数
  componentWillReceiveProps = () =>{
    console.log('props2',this.props.history.location.pathname)
    this.setState({
      selected : this.props.history.location.pathname.split('/')[1]
    })
  }

  componentDidMount = () =>{
    console.log( 'home', this.props )
    this.setState({
      selected : this.props.location.pathname.split('/')[1]
    })
  }
  render(){
    return (
      <Layout>
        {/* 跳转时弹框提示 */}
        <Prompt when={false} message="你确定要离开当前页面吗？"/>
    <Sider style={{
      overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
    }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" selectedKeys={[this.state.selected]} onClick={this.handleClick}>
        <Menu.Item key="component1">
          <Link to='/component1'>
            <Icon type="user" />
            <span className="nav-text">nav 1</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="component2">
          <Link to='/component2'>
            <Icon type="video-camera" />
            <span className="nav-text">nav 2</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="component3">
          <Link to='/component3'>
            <Icon type="upload" />
            <span className="nav-text">nav 3</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="bar-chart" />
          <span className="nav-text">nav 4</span>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="cloud-o" />
          <span className="nav-text">nav 5</span>
        </Menu.Item>
        <Menu.Item key="6">
          <Icon type="appstore-o" />
          <span className="nav-text">nav 6</span>
        </Menu.Item>
        <Menu.Item key="7">
          <Icon type="team" />
          <span className="nav-text">nav 7</span>
        </Menu.Item>
        <Menu.Item key="8">
          <Icon type="shop" />
          <span className="nav-text">nav 8</span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout style={{ marginLeft: 200 }}>
      <Header style={{ background: '#fff', padding: 0 }} />
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
          ...
          <br />
          {this.props.children}
          {/* <Route path="/component1" component={Component1}/>
          <Route path="/component2" component={Component2}/>
          <Route path="/component3" component={Component3}/> */}
          <br />...<br />...<br />...<br />
        </div>
          
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  </Layout>
    );
  }
}

Home = withRouter(Home)
export default Home;
