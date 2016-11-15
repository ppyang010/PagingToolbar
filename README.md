# PagingToolbar
分页控件



示例
``` javascript
var p=new pager({
    domID:"ppager",//节点id
    method:'get',//方式
    url:'${pageContext.request.contextPath}/getTestDate2',//请求地址  url?pagesize=&curpage= &(data中的参数)
    pagesize:5,//每页显示记录数
    curpage:1,//当前第几页
    groups:5,//连续分页数
    data:{},//额外参数
    callback:function(data,all){//回调函数
        console.log('数据列表' + data);
        console.log('全部数据'+all);
    }
});
```
