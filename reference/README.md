分页组件
=========

> 简介：基于原生js开发，没有依赖JQ库

参数说明：

- id_dom：元素ID
- total：总页数
- per_page：每页分多少条
- nowpage：当前页数
- callback：回调函数


----------
	在sass文件中引用样式
	@import "components/page/page.css";


	在js文件中引用模块
	var page = require('page');

    new page({
      "id_dom":"pagination",
      "total":10,
      "per_page":1,
      "nowpage":1,
      "callback":function(now){
          console.log('当前页:' + now);
       }
    });