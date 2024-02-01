<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'

onMounted( () => {
  initMap()
  const initFac = L.geoJson(null, {
    onEachFeature: function (feature, marker) {
      marker.bindPopup('<h4>' + feature.properties.name + '</h4>')
    }
  }).addTo(map)
  const initImg = L.layerGroup().addTo(map)
  dataMap.工厂围栏 = initFac
  dataMap.影像 = initImg
  L.control.layers(baseMap, dataMap).addTo(map)
})

let map = null
const dataMap = reactive({
  '工厂围栏':'',
  '影像':''
})
const baseMap = reactive({
  '矢量地图':'',
  '卫星地图':''
})

const initMap = () => {
  map = L.map('map');
  map.setView([39.900497, 116.370491], 8);
  const vector = L.tileLayer('https://api.mapbox.com/styles/v1/jockcharles/cls1dbq63010h01r4fin8gi55/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9ja2NoYXJsZXMiLCJhIjoiY2pxMXRxMGhkMGh3bDQ5cDd6NmY0ajNxayJ9.nBMQKu4EBCPDPwL4j6gWzQ', {
    maxZoom: 19,
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
  }).addTo(map);
  const satellite = L.tileLayer('https://api.mapbox.com/styles/v1/jockcharles/cls1gbslm00n201qsdendcan6/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9ja2NoYXJsZXMiLCJhIjoiY2pxMXRxMGhkMGh3bDQ5cDd6NmY0ajNxayJ9.nBMQKu4EBCPDPwL4j6gWzQ', {
    maxZoom: 19,
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
  })
  baseMap.矢量地图 = vector
  baseMap.卫星地图 = satellite
}

const setMapView = (x, y) => {
  map.setView([y, x], 15)
}

const showSelectedFac = async (id) => {
  const url = "http://172.16.206.127:8080/geoserver/LightWebGIS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=LightWebGIS%3Acompany_polygon_relation&maxFeatures=500&outputFormat=application%2Fjson"
  const response = await axios.get(url+'&CQL_FILTER=id='+id)
  const data = response.data
  dataMap.工厂围栏.clearLayers()
  L.geoJson(data, {
    onEachFeature: function (feature, marker) {
      marker.bindPopup('<h4>' + feature.properties.name + '</h4>')
    }
  }).addTo(dataMap.工厂围栏)
  map.fitBounds(dataMap.工厂围栏.getBounds());
}

const showImage = (id, imgdate) => {
  dataMap.影像.clearLayers()
  L.tileLayer.wms("http://172.16.206.127:8080/geoserver/LightWebGIS/wms", {
    format: "image/png",
    version: "1.1.0",
    layers: `LightWebGIS:${id}`,
    exceptions: "application/vnd.ogc.se_inimage",
    transparent: true,
    pane: "tilePane",
    maxZoom: 21,
    CQL_FILTER:`location = '${imgdate}.tif'`
  }).addTo(dataMap.影像)
}


defineExpose({
  setMapView,
  showSelectedFac,
  showImage
})
</script>

<template>
  <div id="map"></div>
</template>

<style scoped lang="scss">
#map {
  height: 100%;
  width: 100%;
}
</style>