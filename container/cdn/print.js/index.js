/*/**
 * Created by xgq on 2017/4/17.
 * Copyright© 2015-2020 DianDaInfo (https://github.com/diandainfo)
 * H:\DD\public\javascript\statistics\orders
 * @version 0.0.3 created
 */

"use strict";

let $ajax = require('../../_general/ajax'),
    Modal = require('../../_general/modal'),
    TimeSet = require('../../_general/time').TimeSet;

let tableApi, tableSO, Goods = {};


const Data = {
    sales: (data, callback) => {
       let str = '?';
       if(data && typeof data == 'object'){
           for(let k in data){
               str += ( k + '=' + data[k] + '&');
           }
       }
       str = str.substring(0, str.length-1);
       return $ajax({
           url: '/api/statistics/allOrders' + str
           , method: 'get'
           , errMsg: '获取销售数据失败'
       }, callback)
    }
};

const Dom = {
    getTime: (_) => {
        let startDate,
            endDate,
            sd = $('#start_time').val(),
            ed = $('#end_time').val();
        if (sd) {
            _.startDate = sd;
        } 
        if (ed) {
            _.endDate = ed;
        } 
    },
    getNewTime: () => {
        let _ = {};
        let startDate,
            endDate,
            sd = $('#start_time').val(),
            ed = $('#end_time').val();
        if (sd) {
            _.startDate = sd;
        } 
        if (ed) {
            _.endDate = ed;
        } 
        return _;
    }
}




let EL = {
    listener: () => {
        $('#good_search').on('click', () => {
            let startDate = $('#start_time').val(),
                endDate = $('#end_time').val();
            let date1 = new Date(startDate),
                time1 = date1.getTime();
            let date2 = new Date(endDate),
                time2 = date2.getTime();
            if (startDate === "" || endDate === "") {
                Modal.setAlert('输入的时间不可为空！');
                return false;
            }else if (time1 > time2) {
                Modal.setAlert('输入的开始时间不可大于结束时间！');
                return false;
            } else {
                HCTable.test();
                tableApi.ajax.reload();
                setTimeout(function(){
                    sidebarHeight();
                }, 100);
            }
        });
    },
    printOrder: () => {
        $('#print_orders_btn').on('click', () => {
            $ajax({
               url: '/api/statistics/output', 
               method: 'post',
               errMsg: '获取统计导出数据失败',
               data: Dom.getNewTime()
           }, function(error, json){
                if (error) {
                    console.log('%c printOrder Error', "color: red; font-size: 32px");
                    // Modal.setAlert('统计时间导出数据为空！');
                } else {
                    function ExportTableToExcel(arr) {
                        let data = arr;
                        let table = `
                            <html>
                            <head>
                               <meta charset="UTF-8">
                                <style>
                                    table, td {
                                        border: thin solid #000; 
                                        font-size: 16px; 
                                        min-width: 100px;
                                    } 
                                    tr:nth-of-type(1){
                                        text-align: center;
                                    }
                                    tr:nth-of-type(n+2) >td:nth-of-type(2){
                                        text-align: center;
                                    }
                                    table {
                                        border-collapse: collapse;
                                    }
                                </style>
                            </head>
                            <body>
                                <table><tr>
                         `;
                        for (let i = 0; i < data.length; i++) {
                            if (i === 0) {
                                table = table  + "<td>" + "下单时间" + "</td>" 
                                         + "<td>" + "订单编号" + "</td>"
                                         + "<td>" + "订单状态" + "</td>"
                                         + "<td>" + "店铺名称" + "</td>"
                                         + "<td>" + "订单金额" + "</td>"
                                         + "</tr>";
                            }
                            table = table + "<tr>";
                            for (let prop in data[i]) {
                                if(prop == "state"){
                                    let d = data[i][prop];
                                    if(d == null){
                                        table = table + "<td>" + "--"+ "</td>";
                                    }else if(d == 0){
                                        table = table + "<td>" + "未审核"+ "</td>";
                                    }else if(d == 1){
                                        table = table + "<td>" + "配货中"+ "</td>";
                                    }else if(d == 5){
                                        table = table + "<td>" + "已送出"+ "</td>";;
                                    }else if(d == 10){
                                        table = table + "<td>" + "已送达"+ "</td>";
                                    }else if(d == -99){
                                        table = table + "<td>" + "已取消"+ "</td>";
                                    }
                                }else if(prop == "sum"){
                                    table = table + "<td>" + (data[i][prop] === null ? "--" : data[i][prop] )+ "</td>";
                                }
                                else{
                                    table = table + "<td>" + (data[i][prop] === null ? "" : data[i][prop] )+ "</td>";
                                }
                            }
                            table = table + "</tr>";
                        }
                        table = table + "</table></body></html>";
                        table = table.replace(/<A[^>]*>|<\/A>/g, "");
                        table = table.replace(/<img[^>]*>/gi, ""); 
                        table = table.replace(/<input[^>]*>|<\/input>/gi, ""); 
                        let sa = true;
                        let myBlob =  new Blob( [table] , {type:'application/vnd.ms-excel'});
                        let url = window.URL.createObjectURL(myBlob);
                        let a = document.createElement("a");
                        document.body.appendChild(a);
                        a.href = url;
                        a.download = "订单统计.xls";
                        a.click();
                        setTimeout(function() {window.URL.revokeObjectURL(url);},0);
                        return (sa);
                    }
                    if(json.data.length == 0){
                        Modal.setAlert('统计时间段内无数据！');
                        console.log('%c printOrder null', "color: red; font-size: 32px");
                    }else{
                        ExportTableToExcel(json.data);
                    }
                }
           });
        });
    },
    init: () => {
        EL.listener();
        EL.printOrder();
    }
};



const HCTable = {
    test: () => {
        Data.sales(Dom.getNewTime(), function(error,json){
            if(error){
                console.log(error);
            }else{
                let tsA, tsC, tsa, tsc;
                tsA = json.totalSalesAmount;
                tsC = json.totalSalesCount;
                tsa = json.todaySalesAmount;
                tsc = json.todaySalesCount;
                $("#totalSalesAmount").text(tsA);
                $("#totalSalesCount").text(tsC);
                $("#todaySalesAmount").text(tsa);
                $("#todaySalesCount").text(tsc);
                let data = json.dailyStatisticsList;
                let OAD = [], OAC = [], OAA = [];
                for (let i = 0; i < data.length; i++) {
                    OAD[i] = data[i].date;
                    OAC[i] = data[i].ordersCount;
                    OAA[i] = data[i].salesAmount;
                }
                const HC = (function(){
                    let hcm = (function() {
                        var noData = {
                            attr: undefined,
                            position: {
                                align: "center",
                                verticalAlign: "middle",
                                x: 0,
                                y: 0
                            },
                            style: { "fontSize": "12px", "fontWeight": "bold", "color": "#777" },
                            useHTML: false
                        };
                        var lang = {
                            noData: "没有数据显示!"
                        };
                        var title = {
                            text: '销售金额'
                        };
                        var subtitle = {
                            text: ''
                        };
                        var yAxis = {
                            title: {
                                text: ''
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        };
                        var xAxis = {
                            categories: OAD
                        };
                        var tooltip = {
                            valueSuffix: ' 元'
                        };
                        var legend = {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        };
                        var series = [{
                            name: '销售金额',
                            color: '#13b5b0',
                            data: OAA
                        }];
                        var json = {};
                        json.noData = noData;
                        json.lang = lang;
                        json.title = title;
                        json.subtitle = subtitle;
                        json.xAxis = xAxis;
                        json.yAxis = yAxis;
                        json.tooltip = tooltip;
                        json.series = series;
                        $('#hct_money').highcharts(json);
                    })();
                    let hca = (function() {
                        var noData = {
                            attr: undefined,
                            position: {
                                align: "center",
                                verticalAlign: "middle",
                                x: 0,
                                y: 0
                            },
                            style: { "fontSize": "12px", "fontWeight": "bold", "color": "#777" },
                            useHTML: false
                        };
                        var lang = {
                            noData: "没有数据显示!"
                        };
                        var title = {
                            text: '订单数量'
                        };
                        var subtitle = {
                            text: ''
                        };
                        var yAxis = {
                            title: {
                                text: ''
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        };
                        var xAxis = {
                            categories: OAD
                        };
                        var tooltip = {
                            valueSuffix: ' 单'
                        };
                        var legend = {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        };
                        var series = [{
                            name: '订单数量',
                            color: '#dc4ff9',
                            data: OAC
                        }];
                        var json = {};
                        json.noData = noData;
                        json.lang = lang;
                        json.title = title;
                        json.subtitle = subtitle;
                        json.xAxis = xAxis;
                        json.yAxis = yAxis;
                        json.tooltip = tooltip;
                        json.series = series;
                        $('#hct_amount').highcharts(json);
                    })();
                    return {
                        hcm: hcm,
                        hca: hca
                    }
                })();
            }
        })
    }
}



const DataTables = {
    init: () => {
        tableApi = $('#good_list').DataTable({
            language: require('../../_general/language.dt'),
            paginType: 'full_numbers',
            lengthMenu: [
                [10, 25, 50],
                [10, 25, 50]
            ],
            dom: 'rt<"table-footer col-md-12 mt-1e"<"col-md-3" l><"col-md-3" i><"col-md-6" p>>',
            searching: false,
            ordering: false,
            processing: true,
            serverSide: true,
            autoWidth: true,
            stateSave: true,
            ajax: {
                url: '/api/statistics/orders',
                method: 'post',
                errMsg: '获取订单查询的信息失败',
                data: Dom.getTime
            },
            columns: [
                { title: '下单时间', class: 'data-createdAt', data: 'createdAt' },
                { title: '订单编号', class: 'data-id', data: 'id' },
                { title: '店铺名称', class: 'data-storeName ', data: 'storeName' },
                { 
                    title: '订单状态', class: 'data-state ', data: 'state' ,render: (d)=> {
                        if(d == null){
                            return "--";
                        }else if(d == 0){
                            return "未审核";
                        }else if(d == 1){
                            return "配货中";
                        }else if(d == 5){
                            return "已送出";
                        }else if(d == 10){
                            return "已送达";
                        }else if(d == -99){
                            return "已取消";
                        }
                    }
                },
                { 
                    title: '订单金额', class: 'data-sum ', data: 'sum' , render: (d)=> {
                        if(d == null){
                            return "--";
                        }else{
                            return d;
                        }
                    }
                }
            ]
            , createdRow: (row, data)=> {
                $(row).addClass('good-detail').data('gid', data.id);
            }
        });
    }
};


let sidebarHeight = () => {
    let sb = $('.sidebar-container');
    let hight = document.body.clientHeight; 
    $( document ).ready(function() {
        if( hight > 950){
            sb[0].style.height = hight + 'px';
        }
    });
}


$(function() {
    TimeSet.init();
    require('../../_general/side').Side.run();
    HCTable.test();
    DataTables.init();
    EL.init();
    sidebarHeight();
});
