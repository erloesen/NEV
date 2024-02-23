<template>
  <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
  <div class="country-wrapped">
    <div class="top-content-wrapped">
      <div class="country-info">放一些介绍</div>
      <div class="country-index"></div>
    </div>
    <div class="bottom-content-wrapped">
      <div class="bottom-left-wrapped">
        <div class="pmgrowth-wrapped"></div>
        <div class="owcratio-wrapped"></div>
        <div class="pmcindex-wrapped"></div>
      </div>
      <div class="bottom-mid-wrapped">
        <div class="largec-wrapped"></div>
        <div class="cnetinc-wrapped"></div>
      </div>
      <div class="bottom-right-wrapped">
        <div class="invest-wrapped"></div>
        <div class="fintimes-wrapped"></div>
        <div class="insur-wrapped"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import breadCrumb from '@/components/bread_crumb.vue'
import {onMounted, ref} from "vue";
import * as echarts from 'echarts'
import {getCountryIndex, getCountryPop, getCountryRawIndex} from '@/api/country'

onMounted(() => {
  countryindex()
  countrypop()
  countrybar()
  countryline()
  echarts.connect('country')
})

const breadcrumb = ref()
const item = ref({
  first: '全国总览'
})

const countryindex = async () => {
  const ci = echarts.init(document.querySelector('.country-index'))
  document.querySelector('.country-index').setAttribute('_echarts_instance_', '')
  const data = await getCountryIndex()
  let datas = []
  Object.keys(data.data).forEach(key => {
    datas.push({
      name:key,
      type:'line',
      smooth:true,
      data:data.data[key]
    })
  })
  ci.setOption({
    title: {
      text: '全国新能源汽车产业生态活跃度指数',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: '15%',
      left: '4%',
      bottom: '6%',
      right: '3%',
      containLabel: true
    },
    legend: {
      top: '8%',
      right: '20%',
      data: data.year
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 1
    },
    series: datas
  })
  window.addEventListener('resize', function () {
    ci.resize()
  })
  ci.group = 'country'
}

const countrypop = async () => {
  const pmg = echarts.init(document.querySelector('.pmgrowth-wrapped'))
  document.querySelector('.pmgrowth-wrapped').setAttribute('_echarts_instance_', '')
  const owc = echarts.init(document.querySelector('.owcratio-wrapped'))
  document.querySelector('.owcratio-wrapped').setAttribute('_echarts_instance_', '')
  const pmc = echarts.init(document.querySelector('.pmcindex-wrapped'))
  document.querySelector('.pmcindex-wrapped').setAttribute('_echarts_instance_', '')

  const data = await getCountryPop()
  let pmgdata = []
  let owcdata = []
  let pmcdata = []
  // pmg
  Object.keys(data.pmg).forEach(key => {
    pmgdata.push({
      name:key,
      type:'line',
      data:data.pmg[key],
      markPoint: {
        data: [
          { type: 'max', name: 'Max', label: {fontSize:10, formatter: function(params){return (params.value*100).toFixed(1)+'%'}}},
          { type: 'min', name: 'Min', symbolRotate:180, label: {fontSize:10, offset:[0, 10], formatter: function(params){return (params.value*100).toFixed(1)+'%'}}}
        ]
      }
    })
  })
  pmg.setOption({
    title: {
      text: '工作人口增长率',
      left: 'center',
      textStyle: {
        fontSize: 14
      }
    },
    grid: {
      top: '15%',
      left: '3%',
      bottom: '5%',
      right: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: '6%',
      right: '15%',
      data: data.year
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value',
      min: -0.4,
      max: 0.4
    },
    series: pmgdata
  })
  window.addEventListener('resize', function () {
    pmg.resize()
  })
  pmg.group = 'country'
  //owc
  Object.keys(data.owc).forEach(key => {
    owcdata.push({
      name:key,
      type:'line',
      data:data.owc[key],
      markPoint: {
        data: [
          { type: 'max', name: 'Max', label: {fontSize:10, formatter: function(params){return (params.value).toFixed(2)}}},
          { type: 'min', name: 'Min', symbolRotate:180, label: {fontSize:10, offset:[0, 10], formatter: function(params){return (params.value).toFixed(2)}}}
        ]
      }
    })
  })
  owc.setOption({
    title: {
      text: '工作人口加班指数',
      left: 'center',
      textStyle: {
        fontSize: 14
      }
    },
    grid: {
      top: '15%',
      left: '3%',
      bottom: '5%',
      right: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: '6%',
      right: '15%',
      data: data.year
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 1
    },
    series: owcdata
  })
  window.addEventListener('resize', function () {
    owc.resize()
  })
  owc.group = 'country'
  // pmc
  Object.keys(data.pmc).forEach(key => {
    pmcdata.push({
      name:key,
      type:'line',
      data:data.pmc[key],
      markPoint: {
        data: [
          { type: 'max', name: 'Max', label: {fontSize:10, formatter: function(params){return (params.value).toFixed(2)}}},
          { type: 'min', name: 'Min', symbolRotate:180, label: {fontSize:10, offset:[0, 10], formatter: function(params){return (params.value).toFixed(2)}}}
        ]
      }
    })
  })
  pmc.setOption({
    title: {
      text: '工作人口上行企业指数',
      left: 'center',
      textStyle: {
        fontSize: 14
      }
    },
    grid: {
      top: '15%',
      left: '3%',
      bottom: '5%',
      right: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: '6%',
      right: '15%',
      data: data.year
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 1
    },
    series: pmcdata
  })
  window.addEventListener('resize', function () {
    pmc.resize()
  })
  pmc.group = 'country'
}

const countrybar = async () => {
  const largec = echarts.init(document.querySelector('.largec-wrapped'))
  document.querySelector('.largec-wrapped').setAttribute('_echarts_instance_', '')
  const cnetinc = echarts.init(document.querySelector('.cnetinc-wrapped'))
  document.querySelector('.cnetinc-wrapped').setAttribute('_echarts_instance_', '')
  const fintimes = echarts.init(document.querySelector('.fintimes-wrapped'))
  document.querySelector('.fintimes-wrapped').setAttribute('_echarts_instance_', '')

  const lcdata = await getCountryRawIndex('largec')
  const cidata = await getCountryRawIndex('cnetinc')
  const ftdata = await getCountryRawIndex('fintimes')

  let lcdatas = []
  let cidatas = []
  let ftdatas = []
  Object.keys(lcdata.var).forEach(key => {
    lcdatas.push({
      name:key,
      type:'bar',
      data:lcdata.var[key],
      markPoint:{
        data:[
          {type:'max', name:'Max'},
          {type:'min', name:'Min'}
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    })
  })
  largec.setOption({
    title: {
      text: '新增大型企业数量',
      left: 'center',
      textStyle: {
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: '20%',
      left: '3%',
      bottom: '5%',
      right: '6%',
      containLabel: true
    },
    legend: {
      top: '8%',
      right: '20%',
      data: lcdata.year
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value'
    },
    series: lcdatas
  })
  window.addEventListener('resize', function () {
    largec.resize()
  })
  largec.group = 'country'
  Object.keys(cidata.var).forEach(key => {
    cidatas.push({
      name:key,
      type:'bar',
      data:cidata.var[key],
      markPoint:{
        data:[
          {type:'max', name:'Max'},
          {type:'min', name:'Min'}
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    })
  })
  cnetinc.setOption({
    title: {
      text: '净增企业数',
      left: 'center',
      textStyle: {
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: '20%',
      left: '3%',
      bottom: '5%',
      right: '6%',
      containLabel: true
    },
    legend: {
      top: '8%',
      right: '20%',
      data: cidata.year
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value'
    },
    series: cidatas
  })
  window.addEventListener('resize', function () {
    cnetinc.resize()
  })
  cnetinc.group = 'country'
  Object.keys(ftdata.var).forEach(key => {
    ftdatas.push({
      name:key,
      type:'bar',
      data:ftdata.var[key],
      markPoint:{
        data:[
          {type:'max', name:'Max'},
          {type:'min', name:'Min'}
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      },
      itemStyle: {
        normal: {
          barBorderRadius: [20, 20, 0, 0]
        }
      }
    })
  })
  fintimes.setOption({
    title: {
      text: '融资次数',
      left: 'center',
      textStyle: {
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: '20%',
      left: '3%',
      bottom: '5%',
      right: '6%',
      containLabel: true
    },
    legend: {
      top: '8%',
      right: '20%',
      data: ftdata.year
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value'
    },
    series: ftdatas
  })
  window.addEventListener('resize', function () {
    fintimes.resize()
  })
  fintimes.group = 'country'
}

const countryline = async () => {
  const invest = echarts.init(document.querySelector('.invest-wrapped'))
  document.querySelector('.invest-wrapped').setAttribute('_echarts_instance_', '')
  const insur = echarts.init(document.querySelector('.insur-wrapped'))
  document.querySelector('.insur-wrapped').setAttribute('_echarts_instance_', '')

  const ivdata = await getCountryRawIndex('invest_on')
  const isdata = await getCountryRawIndex('insur')

  let ivdatas = []
  let isdatas = []

  Object.keys(isdata.var).forEach(key => {
    isdatas.push({
      name:key,
      type:'line',
      data:isdata.var[key],
      markPoint: {
        data: [
          { type: 'max', name: 'Max', label: {fontSize:10}},
          { type: 'min', name: 'Min', symbolRotate:180, label: {fontSize:10, offset:[0, 10]}}
        ]
      }
    })
  })
  insur.setOption({
    title: {
      text: '上险量',
      left: 'center',
      textStyle: {
        fontSize: 14
      }
    },
    grid: {
      top: '20%',
      left: '3%',
      bottom: '6%',
      right: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: '6%',
      right: '15%',
      data: isdata.year
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value',
    },
    series: isdatas
  })
  window.addEventListener('resize', function () {
    insur.resize()
  })
  insur.group = 'country'
  Object.keys(ivdata.var).forEach(key => {
    ivdatas.push({
      name:key,
      type:'line',
      data:ivdata.var[key],
      markPoint: {
        data: [
          { type: 'max', name: 'Max', label: {fontSize:10}},
          { type: 'min', name: 'Min', symbolRotate:180, label: {fontSize:10, offset:[0, 10]}}
        ]
      }
    })
  })
  invest.setOption({
    title: {
      text: '固定资产投资',
      left: 'center',
      textStyle: {
        fontSize: 14
      }
    },
    grid: {
      top: '20%',
      left: '3%',
      bottom: '6%',
      right: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: '6%',
      right: '15%',
      data: ivdata.year
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value',
    },
    series: ivdatas
  })
  window.addEventListener('resize', function () {
    invest.resize()
  })
  invest.group = 'country'
}

</script>

<style scoped lang="scss">
.country-wrapped {
  padding: 8px;
  height: calc(100vh - 101px);
  background: #161D26;

  .top-content-wrapped {
    height: 40%;
    display: flex;
  }

  .country-info {
    height: 100%;
    margin-right: 8px;
    width: calc(40% - 8px);
    display: flex;
    background: #fff;
  }

  .country-index {
    width: calc(60% - 2px);
    background: #1F2935;
  }

  .bottom-content-wrapped {
    height: calc(60% - 8px);
    margin-top: 8px;
    display: flex;

    .bottom-left-wrapped {
      height: 100%;
      width: 33%;
      display: flex;
      flex-direction: column;

      .pmgrowth-wrapped {
        width: 100%;
        margin-bottom: 4px;
        height: calc(33% - 4px);
        display: flex;
        background: #1F2935;
        border-radius: 6px;
      }
      .pmgrowth-wrapped::before {
        content: '';
        position: absolute; /* 绝对定位 */
        top: 5px; /* 控制位置 */
        left: 0; /* 控制位置 */
        width: 4px; /* 短线宽度 */
        height: 25px; /* 短线高度 */
        background: linear-gradient(171deg, #0081FF 0%, #22CCE2 101%); /* 短线颜色 */
        border-radius: 0px 2px 2px 0px; /* 短线形状为圆形 */
      }
      .owcratio-wrapped {
        width: 100%;
        margin-bottom: 4px;
        height: calc(33% - 4px);
        display: flex;
        background: #1F2935;
      }

      .pmcindex-wrapped {
        width: 100%;
        margin-bottom: 4px;
        height: calc(33% - 4px);
        display: flex;
        background: #1F2935;
      }
    }

    .bottom-mid-wrapped {
      height: 100%;
      margin-left: 0.5%;
      width: 33%;
      display: flex;
      flex-direction: column;

      .largec-wrapped {
        width: 100%;
        margin-bottom: 10px;
        height: calc(50% - 10px);
        display: flex;
        background: #1F2935;
      }

      .cnetinc-wrapped {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        height: calc(50% - 10px);
        display: flex;
        background: #1F2935;
      }
    }

    .bottom-right-wrapped {
      height: 100%;
      margin-left: 0.5%;
      width: 33%;
      display: flex;
      flex-direction: column;

      .invest-wrapped {
        width: 100%;
        margin-bottom: 4px;
        height: calc(33% - 4px);
        display: flex;
        background: #1F2935;
      }

      .fintimes-wrapped {
        width: 100%;
        margin-bottom: 4px;
        height: calc(33% - 4px);
        display: flex;
        background: #1F2935;
      }

      .insur-wrapped {
        width: 100%;
        margin-bottom: 4px;
        height: calc(33% - 4px);
        display: flex;
        background: #1F2935;
      }
    }
  }
}

</style>