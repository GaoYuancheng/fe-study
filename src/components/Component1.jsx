import React, {Fragment} from 'react';
import {HashRouter, Route , Prompt, Link, Switch} from 'react-router-dom';
import SelectTable from './component1/SelectTable.jsx'
import SelectTable2 from './component1/SelectTable2.jsx'
import SelectTable3 from './component1/SelectTable3.jsx'

import { Select, Table, Menu } from 'antd';
const sourceData = [{
  product: "手机",
  region: "华东",
  sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
  product: "手机",
  region: "华北",
  sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
  product: "手机",
  region: "华南",
  sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
  product: "笔记本",
  region: "华东",
  sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
  product: "笔记本",
  region: "华北",
  sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
  product: "笔记本",
  region: "华南",
  sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
  product: "智能音箱",
  region: "华东",
  sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
  product: "智能音箱",
  region: "华北",
  sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
  product: "智能音箱",
  region: "华南",
  sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]
const Option = Select.Option;
const firstData = ['华东', '华南', '华北'];
const secondData = {
  '华东': ['手机', '笔记本', '智能音箱'],
  '华南': ['手机', '笔记本', '智能音箱'],
  '华北': ['手机', '笔记本', '智能音箱'],
};

class Component1 extends React.Component{
  state = {
    firstValue: firstData[0],
    secondValue: secondData[firstData[0]][0],
    columns:[
      {
        title: '商品',
        dataIndex: 'good',
      },
      {
        title: '地区',
        dataIndex: 'area',
      },
      {
        title: '1月',
        dataIndex: 'January',
      },
      {
        title: '2月',
        dataIndex: 'February',
      },
      {
        title: '3月',
        dataIndex: 'March',
      },
      {
        title: '4月',
        dataIndex: 'April',
      },
      {
        title: '5月',
        dataIndex: 'May',
      },
      {
        title: '6月',
        dataIndex: 'June',
      },
      {
        title: '7月',
        dataIndex: 'July',
      },
      {
        title: '8月',
        dataIndex: 'August',
      },
      {
        title: '9月',
        dataIndex: 'September',
      },
      {
        title: '10月',
        dataIndex: 'October',
      },
      {
        title: '11月',
        dataIndex: 'November',
      },
      {
        title: '12月',
        dataIndex: 'December',
      }
    ],
    dataSource: [],
    current: '/component1/SelectTable',
  }
  //select选框
  getNewDataSource = (firstValue,secondValue) =>{
    let newDataSource = []
    console.log( firstValue, secondValue )
    sourceData.map((item,i)=>{
      const { region = '', product = '', sale = [] } = item
      if(region === firstValue && product === secondValue){
        const [ January, February, March, April, May, June, July, August, September, October, November, December] = sale;
        let obj = {
          key : i,
          good : product,
          area : region,
          January,
          February,
          March,
          April,
          May,
          June,
          July,
          August,
          September,
          October,
          November,
          December
        }
        newDataSource.push( obj )
      }
    })
    console.log(newDataSource)
    // return newDataSource;
    this.setState({
      dataSource : newDataSource
    })
  }

  onFirstValueChange = (value,option) => {
    this.getNewDataSource(value, secondData[value][0])
    this.setState({
      firstValue: value,
      secondValue: secondData[value][0],
    });
  }

  onSecondValueChange = (value) => {
    this.getNewDataSource(this.state.firstValue, value)
    this.setState({
      secondValue: value,
    });
  }

  //顶部导航
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  //生命周期
  componentDidMount(){
    // console.log( sourceData )
    console.log( this.props )
    this.getNewDataSource( this.state.firstValue,this.state.secondValue )
    this.setState({
      // current : this.props.location.pathname
    })
  }
  render(){
    return (
      <Fragment>
        <div style = {{marginBottom : 20}}>
          <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          >
            <Menu.Item key="SelectTable">
              <Link to="SelectTable">
              /component1/SelectTable
              </Link>
            </Menu.Item>
            <Menu.Item key="SelectTable2">
              <Link to="SelectTable2">
              /component1/SelectTable2
              </Link>
            </Menu.Item>
            <Menu.Item key="SelectTable3">
              <Link to="SelectTable3">
              /component1/SelectTable3
              </Link>
            </Menu.Item>
          </Menu>
        </div>
        <div>
          <Select
            defaultValue={firstData[0]}
            style={{ width: 120, marginRight : 10 }}
            onChange={this.onFirstValueChange}
          >
            {firstData.map(item => <Option key={item}>{item}</Option>)}
          </Select>
          <Select
            style={{ width: 120 }}
            value={this.state.secondValue}
            onChange={this.onSecondValueChange}
          >
            {secondData[this.state.firstValue].map(item => <Option key={item}>{item}</Option>)}
          </Select>
          <Table dataSource={this.state.dataSource} columns={this.state.columns} style = {{marginTop : 20}} />
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