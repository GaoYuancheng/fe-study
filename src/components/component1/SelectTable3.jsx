import React,{Fragment} from 'react';
import { Icon, Table, InputNumber, Button } from 'antd';
// import Curved from '../BizCharts'
import '../../style/SelectTable3.css'
import ECharts from '../ECharts';


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

const columns = [
  {
    title: '商品',
    dataIndex: 'good',
    isNumber : false
  },
  {
    title: '地区',
    dataIndex: 'area',
    isNumber : false
  },
  {
    title: '1月',
    dataIndex: 'January',
    isNumber : true
  },
  {
    title: '2月',
    dataIndex: 'February',
    isNumber : true
  },
  {
    title: '3月',
    dataIndex: 'March',
    isNumber : true
  },
  {
    title: '4月',
    dataIndex: 'April',
    isNumber : true
  },
  {
    title: '5月',
    dataIndex: 'May',
    isNumber : true
  },
  {
    title: '6月',
    dataIndex: 'June',
    isNumber : true
  },
  {
    title: '7月',
    dataIndex: 'July',
    isNumber : true
  },
  {
    title: '8月',
    dataIndex: 'August',
    isNumber : true
  },
  {
    title: '9月',
    dataIndex: 'September',
    isNumber : true
  },
  {
    title: '10月',
    dataIndex: 'October',
    isNumber : true
  },
  {
    title: '11月',
    dataIndex: 'November',
    isNumber : true
  },
  {
    title: '12月',
    dataIndex: 'December',
    isNumber : true
  }
];
class Obj {
  constructor(key, dataIndex, sale, monthNo){
    this.monthNo = monthNo
    this.key = key
    this.dataIndex = dataIndex
    this.sale = sale
    this.canEdit = false
    this.editStatus = false
  }
}

class SelectTable3 extends React.Component{
  state = {
    inputValue : '',
    columns : [],
    dataSource : [],
    chartData : []
  }


  //键盘事件
  keyUp = (record, text,e) => {
    // console.log(e.keyCode)
    e.keyCode === 13 && this.buttonClick(record, text)
  }

  //点击按钮事件
  buttonClick = (record, text) => {
    // console.log( text )
    this.changeProp( record, text, 'sale', this.state.inputValue )
    this.changeProp( record, text, 'editStatus', false  )
    let newChartData = this.state.chartData;
    // console.log('newChartData',newChartData)
    // console.log('text',text)
    // console.log( newChartData[text.key].data[text.monthNo] )
    newChartData[text.key].data[text.monthNo] = this.state.inputValue
    this.setState({
      chartData : newChartData
    })
  }

  //输入框变化回调
  inputNumberChange = (value) => {
    this.setState({
      inputValue : value
    })
  }

  //改便属性
  changeProp = ( record, text, propName, value ) =>{
    // console.log('changeprop'  )
    const { key } = record
    record[text.dataIndex][propName] = value;
    let newDataSource = this.state.dataSource;
    newDataSource[key] = record;
    
    

    this.setState({
      dataSource : newDataSource,
     
    })
  }

  //点击图标事件
  iconClick = (record,text) => {
    // console.log( 'iconClick' )
    this.changeProp(record, text, 'canEdit', false);
    this.changeProp(record, text, 'editStatus', true);
    this.setState({
      inputValue : text.sale
    })
  }
  

  //表格数据
  getNewDataSource = () =>{
    let newDataSource = [];
    let newChartData = [];
    sourceData.forEach((item,i)=>{
      const { region = '', product = '', sale = [] } = item
      const [ January, February, March, April, May, June, July, August, September, October, November, December] = sale;
      let tableObj = {
        key : i,
        good : product,
        area : region,
        January : new Obj(i,'January', January, 0 ),
        February : new Obj(i,'February', February, 1 ),
        March : new Obj(i,'March', March, 2 ),
        April : new Obj(i,'April', April, 3 ),
        May : new Obj(i,'May', May, 4 ),
        June : new Obj(i,'June', June, 5 ),
        July : new Obj(i,'July', July, 6 ),
        August : new Obj(i,'August', August, 7 ),
        September : new Obj(i,'September', September, 8 ),
        October : new Obj(i,'October', October, 9 ),
        November : new Obj(i,'November', November, 10, ),
        December : new Obj(i,'December', December, 11 )
      }
      let chartObj = {
        name : region + '-' + product,
        data : sale,
        type : 'line'
      }
      newDataSource.push( tableObj ) 
      newChartData.push( chartObj )
    })
    // console.log('newChartData',newChartData)
    // return newDataSource;
    this.setState({
      dataSource : newDataSource,
      chartData : newChartData
    })
  }

  //初始化表格行
  columnsInit = () => {
    let newColumns = columns.map((item)=>{
      const { title, dataIndex, isNumber } = item;
      return {
        title,
        dataIndex,
        render : (text,record) =>{
          return (
            isNumber ?
            <div 
              style = {{ position: 'relative'}}
              onMouseEnter = {!text.editStatus ? this.changeProp.bind(this, record, text, 'canEdit', true) : undefined } 
              onMouseLeave = {!text.editStatus ? this.changeProp.bind(this, record, text, 'canEdit', false) : undefined }
            > 
              {text.editStatus ?
                <Fragment> 
                  <InputNumber 
                    defaultValue = {text.sale} 
                    style = {{width : 80}}
                    onChange = {this.inputNumberChange}
                    onKeyUp = {this.keyUp.bind( this,record,text )}
                  />
                  <Button 
                    size = 'small' 
                    type = 'primary' 
                    style = {{marginLeft : 5} }
                    onClick = { this.buttonClick.bind( this, record, text ) }
                  >确定</Button> 
                </Fragment>
                : text.sale
              }
              
              {text.canEdit ?
                <Icon 
                  style = {{position : 'absolute' , right : 15 , top : 3.5}} 
                  type="edit"
                  onClick = { 
                    this.iconClick.bind(this,record,text)
                  }  
                /> : null
              }
            </div> : text
          )
        }
      }
    })
    // console.log( newColumns )
    this.setState({
      columns : newColumns
    })
  }

  componentDidMount(){
    this.getNewDataSource()
    this.columnsInit()
  }

  render(){
    return (
      <Fragment>
        <div>SelectTable3</div>
        <Table dataSource={this.state.dataSource} columns={this.state.columns} style = {{marginTop : 20}} />
        {/* <Curved chartData = { this.state.chartData }/> */}
        <ECharts chartData = { this.state.chartData } />
      </Fragment>
    )
  }
}

export default SelectTable3