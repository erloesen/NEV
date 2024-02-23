<template>
  <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
  <div class="fac-wrapped">
    <div class="filter-wrapped">
      <div class="condition-wrapped">
        <h3>工厂动态监测</h3>
        <span class="hint">请选择省份、城市、以及工厂名称</span>
        <div class="condition-info">
          <span>省份</span>
          <div class="condition-choose">
            <el-select v-model="province" clearable placeholder="请选择省份" @change="handleProChange(province)">
              <el-option v-for="item in procity.pro" :key="item.province" :label="item.label" :value="item.province"/>
            </el-select>
          </div>
        </div>
        <div class="condition-info">
          <span>城市</span>
          <div class="condition-choose">
            <el-select v-model="city" :disabled="!province" clearable placeholder="请选择城市" @change="handleCityChange(province, city)">
              <el-option v-for="item in procity.city" :key="item.city" :label="item.label" :value="item.city"/>
            </el-select>
          </div>
        </div>
        <div class="condition-info">
          <span>工厂</span>
          <div class="condition-choose">
            <el-select v-model="facid" :disabled="!city" clearable placeholder="请选择工厂">
              <el-option v-for="item in procity.fac" :key="item.id" :label="item.label" :value="item.id"/>
            </el-select>
          </div>
        </div>
        <div class="condition-button">
          <el-button type="info" :icon="Delete" size="large" @click="clear()">重置</el-button>
          <el-button type="success" :icon="Search" size="large" @click="getFacInfo(facid)">检索</el-button>
        </div>
      </div>
      <div class="result-wrapped">
        <el-descriptions class="result-table" title="厂区基本信息" :column="1" size="large" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="{ margin: '0 5px'}">
                  <House />
                </el-icon>
                工厂名称
              </div>
            </template>
          {{facinfo.company}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="{ margin: '0 5px'}">
                  <Medal />
                </el-icon>
                品牌
              </div>
            </template>
            {{facinfo.brand}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="{ margin: '0 5px'}">
                  <OfficeBuilding />
                </el-icon>
                地址
              </div>
            </template>
            {{facinfo.province + ' ' + facinfo.city + ' ' + facinfo.county}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="{ margin: '0 5px'}">
                  <Place />
                </el-icon>
                定位
              </div>
            </template>
            {{facinfo.x!==''?'经度：' + facinfo.x.toFixed(2) + '&nbsp;&nbsp;&nbsp;&nbsp;纬度：' + facinfo.y.toFixed(2):''}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="{ margin: '0 5px'}">
                  <School />
                </el-icon>
                宿舍情况
              </div>
            </template>
            {{facinfo.dormitory}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="{ margin: '0 5px'}">
                  <Iphone />
                </el-icon>
                基站情况
              </div>
            </template>
            {{facinfo.station}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="{ margin: '0 5px'}">
                  <Picture />
                </el-icon>
                影像情况
              </div>
            </template>
            {{facinfo.imgcount}}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <div class="middle-wrapped">
      <div class="map-wrapped">
        <Map ref="mapComponent"></Map>
      </div>
      <div class="chart-wrapped">
        <div class="fac-pop-wrapped">
        </div>
        <div class="fac-lbs-wrapped"></div>
      </div>
    </div>
    <div class="timeline-wrapped">
      <el-timeline>
        <el-timeline-item
            v-for="(date, index) in facinfo.imgdates"
            :key="index"
            :timestamp="date" placement="top"
            :class="{'active-item':index===activeIndex}"
            @click="(showFacImg(facinfo.id, index))"
        >
          <el-card>
            <h4>关于影像的标题</h4>
            <p>一些具体描述</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script lang="ts" setup>
import breadCrumb from '@/components/bread_crumb.vue'
import {onMounted, reactive, ref} from "vue";
import Map from './component/map.vue'
import * as echarts from 'echarts'
import {Search, Delete} from "@element-plus/icons-vue";
import {getProCity, getFaclist, getFacDetail} from '@/api/factory'
import {
  House,
  Medal,
  OfficeBuilding,
  Place,
  School,
  Iphone
} from '@element-plus/icons-vue'

onMounted(async () => {
  const res = await getProCity()
  res.pro.forEach((item, index) => {
    procity.pro.push({province:item, label:item})
  })
  procity.pcity = res.procity
})

const breadcrumb = ref()
const item = ref({
  first: '工厂监测'
})
const mapComponent = ref()
const procity = reactive({
  pro: [],
  pcity: {},
  city: [],
  fac: []
})
const activeIndex = ref()

const showFacImg = (id, index) => {
  mapComponent.value.showImage(id, facinfo.imgs[index])
  activeIndex.value = index
}

const showFac = (id) => {
  mapComponent.value.showSelectedFac(id)
  activeIndex.value = null
}

const province = ref()
const city = ref()
const facid = ref()
const facinfo = reactive({
  id:'',
  company:'',
  brand:'',
  province:'',
  city:'',
  county:'',
  x:'',
  y:'',
  dormitory:'',
  station:'',
  imgs:[],
  imgdates:[],
  imgcount:null
})

const handleProChange = (province) => {
  const citylist = procity.pcity[province]
  procity.city = []
  citylist.forEach((item, index) => {
    procity.city.push({city:item, label:item})
  })
}

const handleCityChange = async (province, city) => {
  const faclist = await getFaclist(province, city)
  procity.fac = []
  faclist.factory.forEach((item, index) => {
    const {id, company} = item
    procity.fac.push({id:id, label:company})
  })
}

const getFacInfo = async (id) => {
  const res = await getFacDetail(id)
  const fac = res.facinfo[0]
  const popdate = res.facpopdate
  const pop = res.facpop
  const lbsdate = res.faclbsdate
  const lbs = res.faclbs
  const img = res.imgdate
  facinfo.id = fac.id
  facinfo.company = fac.company
  facinfo.brand = fac.brand
  facinfo.province = fac.province
  facinfo.city = fac.city
  facinfo.county = fac.county
  facinfo.x = fac.x
  facinfo.y = fac.y
  facinfo.dormitory = fac.dormitory
  facinfo.station = fac.station
  facinfo.imgs = img
  const imgdates = []
  img.forEach((item, index) => {
    const date = `${item.slice(0,4)}-${item.slice(4,6)}-${item.slice(6)}`
    imgdates.push(date)
  })
  facinfo.imgdates = imgdates
  facinfo.imgcount = imgdates.length
  console.log(facinfo)
  await showFac(facinfo.id)
  selectFacPop(popdate, pop)
  selectFacLbs(lbsdate, lbs)
  echarts.connect('pop')
}

const clear = () => {
  province.value = ''
  city.value = ''
  facid.value = ''
}

const selectFacPop = (date, pop) => {
  const popchart = echarts.init(document.querySelector('.fac-pop-wrapped'))
  document.querySelector('.fac-pop-wrapped').setAttribute('_echarts_instance_', '')
    popchart.setOption({
    tooltip: {
      trigger: 'axis'
    },
    title: {
      left: 'center',
      text: '厂区日人流量（信令）'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '20%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 80,
        end: 100
      },
      {
        start: 80,
        end: 100
      }
    ],
    series: [
      {
        name: 'Signal Data',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(63, 81, 181)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 188, 212)'
            },
            {
              offset: 1,
              color: 'rgb(33, 150, 243)'
            }
          ])
        },
        data: pop
      }
    ]
  })
  window.addEventListener('resize', function () {
    popchart.resize()
  })
  popchart.group = 'pop'
}

const selectFacLbs = (date, pop) => {
  const lbschart = echarts.init(document.querySelector('.fac-lbs-wrapped'))
  document.querySelector('.fac-lbs-wrapped').setAttribute('_echarts_instance_', '')
  lbschart.setOption({
    tooltip: {
      trigger: 'axis'
    },
    title: {
      left: 'center',
      text: '厂区周抽样人流量（位置服务）'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '20%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 80,
        end: 100
      },
      {
        start: 80,
        end: 100
      }
    ],
    series: [
      {
        name: 'LBS Data',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)'
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }
          ])
        },
        data: pop
      }
    ]
  })
  window.addEventListener('resize', function () {
    lbschart.resize()
  })
  lbschart.group = 'pop'
}
</script>

<style scoped lang="scss">
.fac-wrapped {
  padding: 8px;
  height: calc(100vh - 101px);
  background: #f8f8f8;
  display:flex;

  .filter-wrapped {
    height: 100%;
    margin-right: 8px;
    width: calc(16% - 8px);
    display: flex;
    background: #409eff;
    flex-direction: column;
    padding:0 10px;

    .condition-wrapped {
      width: 100%;
      height: 50%;
      display: flex;
      align-items: center;
      flex-direction: column;
      h3 {
        text-align: center;
        font-size: 24px;
        color: #fff;
      }
      span.hint {
        color: gray;
        font-style: italic;
        font-size: 14px;
      }
      .condition-info {
        display: flex;
        align-items: center;
        padding-left: 0;
        margin-top: 48px;
        font-size: 18px;
        color: #fff;
        span {
          width: 80px;
          text-align: center;
        }
        .condition-choose {
          margin-left: 12px;
          margin-right: 12px;
          width: 180px;
        }
      }
      .condition-button {
        margin-top: 96px;
        display: flex;
        width: 200px;
        justify-content: space-between;
      }
    }

    .result-wrapped {
      background: #fff;
      width: 100%;
      height: 10%;

      .cell-item {
        display: flex;
        align-items: center;
        width: 80px;
      }
    }
  }

  .middle-wrapped {
    height:100%;
    margin-right: 8px;
    width: calc(68% - 8px);

    .map-wrapped {
      height: calc(70% - 8px);
      width: 100%;
      margin-bottom: 8px;
    }
    .chart-wrapped {
      height: 30%;
      width: 100%;
      display: flex;

      .fac-pop-wrapped {
        height: 100%;
        width: calc(50% - 4px);
        margin-right: 4px;
        background: #fff;
      }

      .fac-lbs-wrapped {
        height: 100%;
        width: calc(50% - 4px);
        margin-left: 4px;
        background: #fff;
      }
    }
  }

  .timeline-wrapped {
    padding: 100px 20px 100px 0;
    width: 16%;
    background: #409eff;
    overflow: auto;

    .active-item {
      font-size: 20px;
      :deep(.el-timeline-item__node--normal) {
        left: -3px;
        width: 16px;
        height: 16px;
      }
      :deep(.el-timeline-item__timestamp.is-top) {
        font-size: 24px;
      }
      .el-card {
        background: #409eff;
      }
    }
  }
}

:deep(.el-descriptions__header) {
  justify-content: center;
  margin: 10px 0;
}
:deep(.el-descriptions--large .el-descriptions__header .el-descriptions__title) {
  font-size: 20px;
}
:deep(.el-descriptions__label.el-descriptions__cell.is-bordered-label){
  width: 120px;
}
:deep(.el-timeline-item__timestamp.is-top){
  font-size: 18px;
  color:#fff;
}
:deep(.el-timeline-item__tail) {
      border-left: 2px solid #fff;
}
:deep(.el-timeline-item__node) {
      background-color: #fff;
}
:deep(.el-card) {
  border: 2px solid #fff
}
</style>