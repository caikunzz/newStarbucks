import './store.css';
window._AMapSecurityConfig = {
    securityJsCode:"410739eb541b709763a1d7936cf6d374",
}
import { areaList } from './AreaList.js'

new Vue({
    el: "#app",
    data: {
        areaList: areaList,
        area: {
            province: '选择省',
            city: '选择市',
            district: '选择区'
        },
        DialogShow: true,
        SearchValue: '',
        map: null,
        nearBy: [],
        nearMark: []
    },
    watch: {
        'area.district': function (value) {
            this.FindWhere(value)
        },
        nearBy(value) {
            value.forEach(item => {
                let marker = new AMap.Marker({
                    position: item.location,
                    map: this.map
                });
                marker.setLabel({
                    offset: new AMap.Pixel(20, 0),
                    content: item.name,
                    direction: 'top'
                });
                this.nearMark.push(marker)
            })
            this.map.add(this.nearMark);
        }
    },
    created() {
        this.InitMap();
    },
    methods: {
        DialogConfirm(value, index) {
            this.area = {
                province: value[0].name,
                city: value[1].name,
                district: value[2].name
            }
            this.DialogShow = !this.DialogShow;
        },
        onSearch() {

        },
        // 初始化地图
        InitMap() {
            AMapLoader.load({
                "key": "69611689f3f0a1172ba9eb0720bac7f7",              // 申请好的Web端开发者Key，首次调用 load 时必填
                "version": "2.0",
                "plugins": ['AMap.DistrictSearch', 'AMap.PlaceSearch'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
                "AMapUI": {             // 是否加载 AMapUI，缺省不加载
                    "version": '1.1',   // AMapUI 版本
                    "plugins":['overlay/SimpleMarker'],       // 需要加载的 AMapUI ui插件
                },
                "Loca":{
                    "version": '2.0'
                },
            }).then((AMap)=>{
                this.map = new AMap.Map('Map', { showBuildingBlock: true });
            })
        },
        // 查询条件地图位置
        FindWhere(rule) {
            const that = this;
            AMap.plugin('AMap.DistrictSearch', function () {
                new AMap.DistrictSearch({ level: 'city', subdistrict: 0, showbiz: true }).search(rule, function(status, result) {
                    // console.log(result)
                    that.map.setZoomAndCenter(16, result.districtList[0].center || [116, 39])
                    that.FindNearBy(result.districtList[0].center)
                })
            })
        },
        // 搜索地点周边位置
        FindNearBy(centerPoint) {
            const that = this;
            AMap.plugin(["AMap.PlaceSearch"], function() {
                var placeSearch = new AMap.PlaceSearch({ pageSize: 20, pageIndex: 1, autoFitView: true });
                placeSearch.searchNearBy('', centerPoint, 200, function(status, result) {
                    // that.map.clearMap();
                    that.nearMark.forEach(item => {
                        console.log(item);
                        that.map.remove(item);
                    })
                    that.nearBy = result.info === 'OK' ? result.poiList.pois : [];
                });
            })
        }
    }
})