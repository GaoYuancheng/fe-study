import React from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入折线图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
// 引入图例legend组件
import 'echarts/lib/component/legend';



class ECharts extends React.Component{

  state = {

  }
  
  //初始化图表
  chartInit = (chartData = []) =>{
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(this.myChartRef);

     

    // myChart.dispose();
    // console.log( 'chartData',chartData )
    let legendData = [];
    chartData.forEach((item)=>{
      const { name } = item;
      legendData.push( name )
    })
    // console.log( 'legendData',legendData )
    // 绘制图表
    myChart.setOption({
      title: { text: '折线图堆叠' },
      tooltip: {
        trigger: 'axis'
      },
      legend : {
        // show : true,
        data : legendData,
        // type : 'plain',
        right :'20%'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {    
        boundaryGap: false,
        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
      },
      yAxis: {
        type: 'value'
      },
      series:  chartData,
      color : ['#ff0000','#eb4310','#f6941d','#fbb417','#ffff00','#cdd541','#99cc33','#3f9337','#219167','#239676','#24998d','#1f9baa','#0080ff','#3366cc','#333399','#003366','#800080','#a1488e','#c71585','#bd2158']
    },true)
    window.onresize = ()=>{
      myChart.resize();
    }
  }

  

  //生命周期
  componentDidMount(){
    // console.log( sourceData )
    // this.chartInit()
    // console.log( this.props )
  }
  
  //获取最新的参数
  componentWillReceiveProps(props){
    // console.log( 'props' )
    // console.log( props )
    this.setState({
      chartData : props.chartData
    })
    this.chartInit( props.chartData )
  }

  componentDidCatch = () =>{
    // console.log( 'catch' )
  }

  render(){
    return(
      <div style={{ width: '100%', height: 400, marginTop : 20 }} ref = {ref => this.myChartRef = ref} ></div>
    )
  }
}

export default ECharts