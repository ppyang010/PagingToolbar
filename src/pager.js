

/**
 * 分页组件
 * 用于请求分页数据显示分页按钮
 * 依赖另一个ajax.js文件
 */


(function(){

    function pager(options){
        this._options=options;
        this._options.dom=document.getElementById(options.domID);
        this._options.domID=options.domID;
        this._options.curpage=options.curpage||1;
        this._options.pagesize=options.pagesize||10;
        this._options.url=options.url;
        this._options.data=options.data||{};
        this._options.method=options.method||"get"
        this._init(this._options);
        //_self=this;

    }

    pager.prototype= {
        /**
         * 初始化
         */
        _init:function(options){
            this._request(options);
        },
        /**
         * 数据请求
         * @return {[type]} [description]
         */
        _request:function(options){
            var _self=this;
            var _data={};
            for(var s in options.data){
                _data[s]=options.data[s];
            }
            _data['curpage']=options.curpage;
            _data['pagesize']=options.pagesize;
            ajax({
                method:options.method,
            	url:options.url,
            	data:_data,
            	success:function(data){
                    _self._renderHTML(data,options);
            		_self._options.callback((data.rows||data.list),data);
            	},
            	async:false
            });
        },
        /**
         * 生成HTML
         * @return {[type]} [description]
         */
        _renderHTML:function(data,options){
            var _self=this;
            data=eval("("+data+")")
            data=JSON.parse(data);
            var dom=options.dom;
            var groups=((options.groups%2 ==1) ? options.groups: options.groups+1) ||5;//连续分页数
            var curpage=_self._options.curpage||1;//当前页
            var pagesize=_self._options.pagesize||10;//每页记录数
            var total=data.totalRows||data.total||0;//总记录数
            var totalpage=(total%pagesize)==0?Math.floor(total/pagesize):Math.floor((total/pagesize)+1);
            dom.innerHTML="";
            console.dir(data);
            //上一页
            if(curpage>1){
              var a=document.createElement('a');
              a.className="page prev f-bg";
              a.href="javascript:void(0);";
              a.innerText="<";
              dom.appendChild(a);
            }

            var s=Math.ceil(curpage/groups)-1;//第几页  从0开始 用于计算当前要显示的页码
            var diff=groups/2;//当前页两边显示数 临界点
            //总页数小于等于连续分页数
            console.log(totalpage);
            if(totalpage<=groups){
                this._cycleShow(s,curpage,totalpage,groups,dom);//生成分页项

            }else { //总页数大于连续分夜数小于连续分页数+临界点  if(totalpage<groups+diff)
                var ellipsis=document.createElement('a');
                ellipsis.innerText="...";
                ellipsis.className="page";
                if(curpage<=groups-diff){//后面显示省略号
                    this._cycleShow(s,curpage,totalpage,groups,dom);//生成分页项
                    dom.appendChild(ellipsis);

                }else if(curpage+diff>=totalpage){//前面显示省略号
                    dom.appendChild(ellipsis);
                    this._cycleShow(s,curpage,totalpage,groups,dom);//生成分页项
                }else {//前后均显示省略号
                    dom.appendChild(ellipsis);
                    this._cycleShow(s,curpage,totalpage,groups,dom);//生成分页项
                    dom.appendChild(ellipsis);
                }
            }

            //下一页
            if(curpage<totalpage){
              var a=document.createElement('a');
              a.className="page next f-bg";
              a.innerText=">";
              dom.appendChild(a);

            }
            //初始化事件
            this._initEvent(curpage,totalpage);
        },
        //循环显示分页项
        _cycleShow:function(s,curpage,totalpage,groups,dom){
            for(var i=1;i<=groups;i++){
                var num=s*groups+i;//当前要显示的页码
                if(num<=totalpage){
                    var a=document.createElement('a');
                    a.innerText=num;
                    a.href="javascript:void(0);";
                    a.className="page";
                    if(num==curpage){
                        a.className="page cur";
                    }
                    dom.appendChild(a);
                }
            }
        },
        /**
         * 初始化事件
         * @return {[type]} [description]
         */
        _initEvent:function(curpage,totalpage){
            var _self=this;//pager对象本地化
            var _dom=this._options.dom;
            if(!!_dom){
                var doms=_dom.querySelectorAll("#"+this._options.domID+" a")
                for(var i=0,len=doms.length;i<len;i++){
                    var num=Number(doms[i].innerText);
                    if(!!num && num!=_self._options.curpage){
                        doms[i].addEventListener('click',function(num){
                        	return function(){
                        		//console.log(this);//this显示为dom
                                _self._gotoPage(num);
                        	}
                        }(num));

                        //方式2
    //                    (function (num){
    //                    	doms[i].addEventListener('click',function(){
    //                    		_self._gotoPage(num);
    //                    	})
    //                    })(num);
                    }
                }
                var map={
                    'prev':_self._options.curpage-1,
                    'next':_self._options.curpage+1
                    }
                for(var s in map){
                    var dom=_dom.querySelector("."+s);
                    if(!!dom){
                        dom.addEventListener('click',function(s){
                        	return function(){
                        		_self._gotoPage(map[s]);
                        	}
                        }(s))
                    }
                }

            }


        },
        /**
         * 页面跳转
         * @return {[type]} [description]
         */
        _gotoPage:function(num){
            var _self=this;
            this._options.curpage=num;
            console.log(num);
            _self._request(this._options);
        }


    };






window.pager=pager;

})();


//流程
//初始化 根据url method pagesize curpage
//返回需要（数据列表） 总记录数 当前页 每页数量
// 根据返回的数据列表创建html
//页面跳转函数-》获取数据 html修改
//回调函数（列表数据json） 解析页面 生成数据列表


//对外提供方法
//设置url 刷新
