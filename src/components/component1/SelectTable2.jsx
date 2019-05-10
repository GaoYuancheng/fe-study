import React, {Fragment} from 'react';
import { Checkbox } from 'antd';
import ECharts from '../ECharts';


const plainOptionsFirst = ['华东', '华北', '华南'];
const plainOptionsSecond = ['手机', '笔记本', '智能音箱'];

const sourceData = [
  {
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
  }
]


class SelectTable2 extends React.Component{
  state = {
    indeterminateFirst: false,
    checkAllFirst: false,
    indeterminateSecond : false,
    checkAllSecond : false,
    chartData : [],
    checkedListFirst : [],
    checkedListSecond : []
  }
  //处理传递给echarts的数据
  chartDataFormat = (checkedListFirst = [] , checkedListSecond = []) => { 
    checkedListFirst.length === 0 && (checkedListFirst = plainOptionsFirst);
    checkedListSecond.length === 0 && (checkedListSecond = plainOptionsSecond); 
    let chartData = []
    sourceData.forEach((item, i)=>{
      const { product, region, sale } = item;
      //如果所选的数据中有这个region 并且有 product
      if(checkedListFirst.indexOf( region ) !== -1 && checkedListSecond.indexOf( product ) !== -1) {
        let chartObj = {
          name : region + '-' + product ,
          type : 'line',
          data : sale
        } 
        
        chartData.push( chartObj )
      }
    })
    this.setState({
      chartData
    })
  }
  chartDataInit = () => {
    this.chartDataFormat()
  }
  //多选框事件
  onChangeFirst = (checkedList) => {
    console.log( checkedList )
    this.chartDataFormat( checkedList, this.state.checkedListSecond )
    this.setState({
      checkedListFirst : checkedList,
      indeterminateFirst: !!checkedList.length && (checkedList.length < plainOptionsFirst.length),
      checkAllFirst: checkedList.length === plainOptionsFirst.length,
    });
  }

  onCheckAllChangeFirst = (e) => {
    console.log(e)
    this.chartDataFormat( plainOptionsFirst, this.state.checkedListSecond )
    this.setState({
      checkedListFirst: e.target.checked ? plainOptionsFirst : [],
      indeterminateFirst: false,
      checkAllFirst: e.target.checked,
    });
  }

  onChangeSecond = (checkedList) => {
    this.chartDataFormat( this.state.checkedListFirst, checkedList )
    this.setState({
      checkedListSecond : checkedList,
      indeterminateSecond: !!checkedList.length && (checkedList.length < plainOptionsSecond.length),
      checkAllSecond: checkedList.length === plainOptionsSecond.length,
    });
  }

  onCheckAllChangeSecond = (e) => {
    this.chartDataFormat( this.state.checkedListFirst, plainOptionsSecond )
    this.setState({
      checkedListSecond: e.target.checked ? plainOptionsSecond : [],
      indeterminateSecond: false,
      checkAllSecond: e.target.checked,
    });
  }

  componentDidMount() {
    this.chartDataInit()
  }
  render() {
      return (
        <Fragment>
          <div>
            <Checkbox
                indeterminate={this.state.indeterminateFirst}
                onChange={this.onCheckAllChangeFirst}
                checked={this.state.checkAllFirst}
              >
                全选
              </Checkbox>
            <Checkbox.Group options={plainOptionsFirst} value={this.state.checkedListFirst} onChange={this.onChangeFirst} />
          </div>
          <div>
            <Checkbox
                indeterminate={this.state.indeterminateSecond}
                onChange={this.onCheckAllChangeSecond}
                checked={this.state.checkAllSecond}
              >
                全选
              </Checkbox>
            <Checkbox.Group options={plainOptionsSecond} value={this.state.checkedListSecond} onChange={this.onChangeSecond} />
          </div>
          <ECharts chartData = { this.state.chartData }/>
        </Fragment>
      );
  }
}

export default SelectTable2