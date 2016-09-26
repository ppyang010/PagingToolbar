
//流程
//初始化 根据url method pagesize curpage
//返回需要（数据列表） 总记录数 当前页 每页数量
// 根据返回的数据列表创建html
//页面跳转函数-》获取数据 html修改
//回调函数（列表数据json） 解析页面 生成数据列表


//对外提供方法
//设置url 刷新


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
            ajax({
        	   method:options.method,
        	   url:options.url,
        	   data:{'curpage':options.curpage,'pagesize':options.pagesize},
        	   success:function(data){
        		console.log(data);
        		console.log(options);
        		console.log(_self);
        		_self._renderHTML(data,options.dom);
        		_self._options.callback(data);
        	   },
        	   async:true
        	});
        },
        /**
         * 生成HTML
         * @return {[type]} [description]
         */
        _renderHTML:function(data,dom){
            var _self=this;
            var groups=5;//连续分页数
            var curpage=_self._options.curpage||1;//当前页
            var pagesize=_self._options.pagesize||10;//每页记录数
            var total=data.total||0;//总记录数
            var totalpage=(total%pagesize)==0?total/pagesize:(total/pagesize)+1;

            //<=连续分页数
            //>连续分页数

            console.log('run');
            this._initEvent();
        },
        /**
         * 初始化事件
         * @return {[type]} [description]
         */
        _initEvent:function(){
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
                var map={'first':1,
                    'last':5,
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
            console.log(this);
            console.log(num);
        }


    };






window.pager=pager;

})()
