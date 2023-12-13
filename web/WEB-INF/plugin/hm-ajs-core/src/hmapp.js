/***
 Metronic AngularJS App Main Script
 ***/

angular.module("hm.appcore", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    "ngStorage",
    "ngCookies",
]);

if(hmappSystemConfig!=null){
    angular.module("hm.appcore").constant('SYSNAME', hmappSystemConfig.SYSNAME);
    angular.module("hm.appcore").constant('SYSCODE', hmappSystemConfig.SYSCODE);
    angular.module("hm.appcore").constant('VERSION', hmappSystemConfig.VERSION);
    angular.module("hm.appcore").constant('CONFIGURL', hmappSystemConfig.CONFIGURL);
    angular.module("hm.appcore").constant('GATEWAYURL', hmappSystemConfig.GATEWAYURL);
    angular.module("hm.appcore").constant('LOGINURL', hmappSystemConfig.LOGINURL);
    angular.module("hm.appcore").constant('LOGOUTURL', hmappSystemConfig.LOGOUTURL);
    angular.module("hm.appcore").constant('INDEXURL', hmappSystemConfig.INDEXURL);
}

angular.module("hm.appcore").constant('COMMONSTATE', [
    {
        "name":"403",
        "url":"/403.html",
        "templateUrl":"hm/views/403.html",
        "data":{"pageTitle":"403 - 禁止访问: 访问被拒绝。"},
        "controller":"",
        "ocLazyLoad":{
            "name":"hm.appcore",
            "files":[
            ]
        }
    },
    {
        "name":"404",
        "url":"/404.html",
        "templateUrl":"hm/views/404.html",
        "data":{"pageTitle":"404 - 找不到文件或目录。"},
        "controller":"",
        "ocLazyLoad":{
            "name":"hm.appcore",
            "files":[
            ]
        }
    },
    {
        "name":"500",
        "url":"/500.html",
        "templateUrl":"hm/views/500.html",
        "data":{"pageTitle":"500 - 内部服务器错误。"},
        "controller":"",
        "ocLazyLoad":{
            "name":"hm.appcore",
            "files":[
            ]
        }
    },
]);

angular.module("hm.appcore").controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {

    });
    console.log('AppController');
}]);

angular.module("hm.appcore").run(['$rootScope', '$state','$ocLazyLoad','$location','_routerHistory','$http','$sessionStorage',
    function($rootScope, $state,$ocLazyLoad,$location,_routerHistory,$http,$sessionStorage) {
    console.log('do run');

    $http({
        method:'GET',
        url:hmappSystemConfig.CONFIGURL+'api/sysInfo',
        params:{},
        data:{}
    }).success(function(data,status,headers,config){
        if(data.errorCode==0){
            $sessionStorage.sysInfo=data.data;
        }
    });

    //检查url参数
    $ocLazyLoad.load('hm.appcore');
    $rootScope.$state = $state; // state to be accessed from view

    _routerHistory.clearHistory();
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if(toState.name!=null && toState.name.split('.').length > 1){
            showChild();
        }else{
            showMain();
        }
        _routerHistory.saveState(toState, toParams);
    });

    function showChild(){
        setTimeout(function(){
            if($('.child-view').length>0){
                $('.main-view').removeClass('active');
                $('.child-view').addClass('active');
            }else{
                showChild();
            }
        },0);
    }

    function showMain(){
        setTimeout(function(){
            if($('.main-view').length>0){
                $('.child-view').removeClass('active');
                $('.main-view').addClass('active');
            }else{
                showMain();
            }
        },0)
    }
}]);
/**
 * Created by cbjiang on 2017/2/22.
 */

(function() {
    'use strict';

    //延迟加载
    angular.module("hm.appcore").config(['$ocLazyLoadProvider','globalLazyLoad',function($ocLazyLoadProvider,globalLazyLoad) {
        $ocLazyLoadProvider.config({
            debug: true,
            events: true,
            modules: [
                {
                    name: 'hm.appcore',
                    insertBefore: '#ng_load_plugins_before',
                    files: globalLazyLoad.concat([

                    ])
                }
            ]
        });
    }]);

    angular.module("hm.appcore").config(['$controllerProvider',function($controllerProvider) {
        $controllerProvider.allowGlobals();
    }]);

    angular.module("hm.appcore").config(['$stateProvider', '$urlRouterProvider','STATECONFIG','COMMONSTATE', function($stateProvider, $urlRouterProvider,STATECONFIG,COMMONSTATE) {
        if(STATECONFIG!=null && STATECONFIG.length>0){

            angular.forEach(STATECONFIG, function(stateInfo) {
                $stateProvider.state(stateInfo.name, {
                    url: stateInfo.url,
                    params: stateInfo.params,
                    templateUrl: stateInfo.templateUrl,
                    data: stateInfo.data,
                    controller: stateInfo.controller,
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load($.extend({serie: true},stateInfo.ocLazyLoad));
                        }]
                    }
                });
            });

            angular.forEach(COMMONSTATE, function(stateInfo) {
                $stateProvider.state(stateInfo.name, {
                    url: stateInfo.url,
                    params: stateInfo.params,
                    templateUrl: stateInfo.templateUrl,
                    data: stateInfo.data,
                    controller: stateInfo.controller,
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load($.extend({serie: true},stateInfo.ocLazyLoad));
                        }]
                    }
                });
            });

        }
    }]);

})();



angular.module("hm.appcore").factory('_routerHistory', [ '$state', function($state){
    var history = [];
    var backHistory = [];
    var forwardHistory = [];
    var currentState = {};
    var limit=10;

    return {
        saveCurrentState:function(state, params){
            console.log('current state: '+ state.name);
            currentState = { state: state, params: params};
        },
        saveState: function(state, params){
            var isStateExists = false;//backHistory.find(function(history){ return state.name == history.state.name });
            if(backHistory.length>0 && backHistory[backHistory.length-1].state.url==state.url){
                isStateExists=true;
            }
            if(!isStateExists){
                console.log('saving state: '+ state.name);
                backHistory.push({ state: state, params: params });
                if(backHistory.length>limit){
                    backHistory.shift();
                }
            }
        },
        removeBackState: function(){
            var back = backHistory.pop();
            forwardHistory.push(back);
            return backHistory[backHistory.length - 1]; // return n-1 object or prev state
        },
        removeForwardState: function(){
            var forward = forwardHistory.pop();
            backHistory.push(forward);
            return forward;
        },
        goBackState: function(reload){
            var backState = this.removeBackState();
            this.goToState(backState,reload);
        },
        goForwardState: function(reload){
            var forwardState = this.removeForwardState();
            this.goToState(forwardState,reload);
        },
        goToState: function(state,reload){
            $state.go(state.state.name, state.params, { reload: reload==null?false:reload});
        },
        clearHistory: function(){
            history = [];
            backHistory = [];
            forwardHistory = [];
        },
        isBackHistory: function(){
            return backHistory.length > 1; // 1 since we store current state into back
        },
        isForwardHistory: function(){
            return forwardHistory.length > 0;
        },
        getBackHistory:function(){
            return backHistory;
        }
    };
}]);

angular.module("hm.appcore").directive( "ngDoLogout", [ 'auth', function(auth) {
    return {
        link: function( scope, element, attrs ) {
            element.bind( "click", function() {
                auth.doLogout();
            });
        }
    }
}]);

angular.module("hm.appcore").directive('ngSpinnerBar', ['$rootScope', '$location', '$sessionStorage' ,
    function($rootScope,$location,$sessionStorage) {
        return {
            link: function(scope, element, attrs) {

                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function() {
                    console.log('$stateChangeStart');
                    element.removeClass('hide'); // show spinner bar
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function() {
                    console.log('$stateChangeSuccess');
                    setTimeout(function(){
                        matchMenu(function(){
                            element.addClass('hide'); // hide spinner bar
                            $('body').removeClass('page-on-load'); // remove page loading indicator
                        })
                    },1000)
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function() {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function() {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])

function matchMenu(callback){
    if($('#jquery-accordion-menu').find('li').length>0){
        Layout.setSidebarMenuActiveLink('match');
        callback();
    }else{
        setTimeout(function(){matchMenu(callback)},100);
    }
}


// Handle global LINK click
angular.module("hm.appcore").directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e) {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
});


// Handle Dropdown Hover Plugin Integration
angular.module("hm.appcore").directive('dropdownMenuHover', function () {
  return {
    link: function (scope, elem) {
      elem.dropdownHover();
    }
  };  
});


angular.module("hm.appcore").directive( "ngPageUtil", ['$compile',function( $compile ) {

    var _watchers=[]

    return {
        link:function( scope, element, attrs ){
            refresh(scope,element);
            _watchers.push(scope.$watch('total',function(newValue,oldValue,scope){
                refresh(scope,element);
            }));
            scope.$on('$destroy', function() {
                while (_watchers.length) {
                    _watchers.shift()();
                }
            });
        }
    }

    function refresh(scope,element){
        element.empty();
        var page=scope.page;
        var total=scope.total;
        if(total==null){
            setTimeout(function(){refresh(scope,element)},100);
            return;
        }
        var size=scope.size;

        var lastPage=Math.ceil(total/size);
        var numFrom=(page-1)*size+1;
        var numTo=page*size>total?total:page*size;

        var infoTemp='<p>当前显示<span>'+numFrom+'到'+numTo+'</span>条，共<span>'+total+'</span>条记录</p>';
        $(element[0]).append(infoTemp);

        var pageItemTemp='<li ng-class="{\'active\':page=={pageNum}}"><a ng-click="loadPage({page})">{pageStr}</a></li>';
        var ellipsisItemTemp='<li class="disabled"><a>...</a></li>';
        var previous='<li class="{disabled}"><a ng-click="loadPage({page})" aria-label="Previous"><span class="glyphicon glyphicon-triangle-left" aria-hidden="true"></span></a></li>';
        var next='<li class="{disabled}"><a ng-click="loadPage({page})" aria-label="Next"><span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span></a></li>';
        var str='';
        if(page==1){
            str=str+previous.replace('{disabled}','disabled').replace('{page}',1);
        }else{
            str=str+previous.replace('{disabled}','').replace('{page}',page-1);
        }
        if(lastPage<=7){
            for(var i=0;i<lastPage;i++){
                str=str+pageItemTemp.replace('{pageNum}',i+1).replace('{page}',i+1).replace('{pageStr}',i+1);
            }
        }else{
            str=str+pageItemTemp.replace('{pageNum}',1).replace('{page}',1).replace('{pageStr}',1);
            if(page<=4){
                str=str+pageItemTemp.replace('{pageNum}',2).replace('{page}',2).replace('{pageStr}',2);
                str=str+pageItemTemp.replace('{pageNum}',3).replace('{page}',3).replace('{pageStr}',3);
                str=str+pageItemTemp.replace('{pageNum}',4).replace('{page}',4).replace('{pageStr}',4);
                str=str+pageItemTemp.replace('{pageNum}',5).replace('{page}',5).replace('{pageStr}',5);
                str=str+ellipsisItemTemp;
            }else if(page>=lastPage-3){
                str=str+ellipsisItemTemp;
                str=str+pageItemTemp.replace('{pageNum}',lastPage-4).replace('{page}',lastPage-4).replace('{pageStr}',lastPage-4);
                str=str+pageItemTemp.replace('{pageNum}',lastPage-3).replace('{page}',lastPage-3).replace('{pageStr}',lastPage-3);
                str=str+pageItemTemp.replace('{pageNum}',lastPage-2).replace('{page}',lastPage-2).replace('{pageStr}',lastPage-2);
                str=str+pageItemTemp.replace('{pageNum}',lastPage-1).replace('{page}',lastPage-1).replace('{pageStr}',lastPage-1);
            }else{
                str=str+ellipsisItemTemp;
                str=str+pageItemTemp.replace('{pageNum}',page-1).replace('{page}',page-1).replace('{pageStr}',page-1);
                str=str+pageItemTemp.replace('{pageNum}',page).replace('{page}',page).replace('{pageStr}',page);
                str=str+pageItemTemp.replace('{pageNum}',page+1).replace('{page}',page+1).replace('{pageStr}',page+1);
                str=str+ellipsisItemTemp;
            }
            str=str+pageItemTemp.replace('{pageNum}',lastPage).replace('{page}',lastPage).replace('{pageStr}',lastPage);
        }
        if(page==lastPage){
            str=str+next.replace('{disabled}','disabled').replace('{page}',lastPage);
        }else{
            str=str+next.replace('{disabled}','').replace('{page}',page+1);
        }
        $(element[0]).append($compile('<ul  class="pagination">'+str+'</ul>')(scope));
        element.find('li').on('click',function(){
            if(!$(this).hasClass('disabled')){
                refresh(scope,element);
            }
        });

    }

}]);

angular.module("hm.appcore").directive( "ngGoBack", ['$window','_routerHistory',function( $window,_routerHistory ) {
    return {
        link:function( scope, element, attrs ){
            element.on('click',function(e){
                _routerHistory.goBackState();
                //$window.history.back();
                e.stopPropagation();
            })
        }
    }
}]);

angular.module("hm.appcore").factory("hmState",['$state','$window','$location','_routerHistory',function($state,$window,$location,_routerHistory){
    function init(scope,mainPath){
        var path=mainPath==null?$location.path():mainPath;
        showMain()

        scope.$on("$locationChangeSuccess",function(event,newUrl, oldUrl) {
            if($location.path()==path){
                showMain()
            }else{
                showChild()
            }
        });
    }

    function go(url,params,callback){
        $state.go(url,params);
        showChild()
        if(typeof callback == 'function'){
            callback();
        }
    }

    function back(callback){
        _routerHistory.goBackState();
        //$window.history.back();
        showMain()
        if(typeof callback == 'function'){
            callback();
        }
    }

    function showChild(){
        setTimeout(function(){
            if($('.child-view').length>0){
                $('.main-view').removeClass('active');
                $('.child-view').addClass('active');
            }else{
                showChild();
            }
        },0);
    }

    function showMain(){
        setTimeout(function(){
           if($('.main-view').length>0){
               $('.child-view').removeClass('active');
               $('.main-view').addClass('active');
           }else{
               showMain();
           }
        },0)
    }

    return{
        go:go,
        back:back,
        init:init,
    }

}]);

angular.module("hm.appcore").directive("hmStateGoBack",['$window','_routerHistory',function( $window,_routerHistory ) {
    return {
        link:function( scope, element, attrs ){
            element.on('click',function(e){
                $('.child-view').removeClass('active');
                $('.main-view').addClass('active');
                _routerHistory.goBackState();
                //$window.history.back();
                e.stopPropagation();
            })
        }
    }
}]);

angular.module("hm.appcore").directive("hmFormPoints",function() {
    return {
        require: '?ngModel',
        restrict : 'A',
        scope:{
            ngModel: '='
        },
        link:function( scope, element, attrs, ngModel ){
            ngModel.$render = function() {
                element.val(ngModel.$viewValue || '');
                var point=parseInt(ngModel.$viewValue);
                contentTr.find('li').slice(0,point).addClass('active');
            };
            var total=attrs["total"]==null?5:parseInt(attrs["total"]);
            var temp='<li class="point-item"></li>';
            var str='';
            for(var i=0;i<total;i++){
                str+=temp;
            }
            var contentTr = angular.element('<ul class="point-bar">'+str+'</ul>');
            contentTr.insertAfter(element);
            element.addClass('hide');

            contentTr.find('li').hover(function(){
                $(this).addClass('hover');
                $(this).prevAll().addClass('hover');
            },function(){
                contentTr.find('li').removeClass('hover');
            })

            contentTr.find('li').on('click',function(){
                contentTr.find('li').removeClass('active');
                $(this).addClass('active');
                $(this).prevAll().addClass('active');

                element.val($(this).prevAll().length+1).trigger('change');
            })

            contentTr.on('dblclick',function(){
                contentTr.find('li').removeClass('active');

                element.val(0).trigger('change');
            })
        }
    }
});
angular.module("hm.appcore").directive("hmWordNum",function() {
    return {
        require: '?ngModel',
        restrict : 'A',
        scope:{
            ngModel: '='
        },
        link:function( scope, element, attrs, ngModel ){
            var tip;
            var temp='<div style="{display}margin-top: {top}px;margin-left: 10px;float:left;">{num}/{total}</div>';
            if(element.css('display')!='none'){
                if(ngModel!=null){
                    ngModel.$render = function() {
                        element.val(ngModel.$viewValue || '');
                        change()
                    };
                }else{
                    change()
                }

                element.on('keyup',function(){
                    change();
                })

                element.on('resize',function(e){
                    change();
                    e.stopPropagation();
                })

                element.parents().on('resize',function(e){
                    change();
                    e.stopPropagation();
                })
            }

            function change(){
                if(tip!=null){
                    tip.remove();
                }
                var color='black';
                if((element.val().length/attrs.hmWordNum)>1){
                    color='red'
                }
                var display='';
                if(element.css('display')=='none'){
                    display='display:none;'
                }
                if(element.offset().top!=0 && element.offset().left!=0){
                    tip=$(temp.replace("{display}",display).replace("{top}",element.height()-5)
                        .replace("{num}",element.val().length).replace("{total}",attrs.hmWordNum));
                    element.after(tip);
                }
            }

        }
    }
});



/**
 * Created by cbjiang on 2017/2/22.
 */

(function() {
    'use strict';

    angular.module("hm.appcore").service('hmappService', hmappService);

    hmappService.$inject = ['$http','$q','$sessionStorage','CONFIGURL','auth'];

    function hmappService ($http,$q,$sessionStorage,CONFIGURL,auth) {
        var service= {
            getSidebarInfo:getBar,
            getUserInfo:getUserInfo,
            changeMyPassword:changeMyPassword,
            changeDefaultRole:changeDefaultRole,
            setDefaultRole:setDefaultRole,
            getSysInfo:getSysInfo,
        };

        return service;

        function getSysInfo(){
            var deferred = $q.defer();
            $http({
                method:'GET',
                url:CONFIGURL+'api/sysInfo',
                params:{},
                data:{}
            }).success(function(data,status,headers,config){
                deferred.resolve(data);
            }).error(function(data,status,headers,config){
                deferred.reject(data);
            })
            return deferred.promise;
        }

        function getBar(callback){
            if($sessionStorage.userInfo==null){
                console.log("getBar do getUserInfo");
                getUserInfo().then(function(data){
                    $sessionStorage.userInfo=data;
                    if($sessionStorage.userInfo.roles!=null){
                        setDefaultRole($sessionStorage.userInfo.roles);
                        getSidebarInfo($sessionStorage.currentRole.id,callback);
                    }
                })
            }else{
                if($sessionStorage.currentRole!=null){
                    getSidebarInfo($sessionStorage.currentRole.id,callback);
                }else{
                    if($sessionStorage.userInfo.roles!=null){
                        setDefaultRole($sessionStorage.userInfo.roles);
                        getSidebarInfo($sessionStorage.currentRole.id,callback);
                    }
                }
            }
        }

        function setDefaultRole(roles){
            if(roles!=null && roles.length>0){
                for(var i=0;i<roles.length;i++){
                    if(roles[i].isDefault == 1){
                        $sessionStorage.currentRole=roles[i];
                    }
                }

                if($sessionStorage.currentRole==null){
                    $sessionStorage.currentRole=roles[0];
                }
            }
        }

        function changeDefaultRole(roleId){
            var deferred = $q.defer();
            $http({
                method:'POST',
                url:CONFIGURL+'api/users/current/roles/default/'+roleId,
                params:{},
                data:{}
            }).success(function(data,status,headers,config){
                deferred.resolve(data);
            }).error(function(data,status,headers,config){
                deferred.reject(data);
            })
            return deferred.promise;
        }

        function getSidebarInfo(roleId,callback){
            $http({
                method:'GET',
                url:CONFIGURL+'api/menus/init/'+roleId,
                params:{},
                data:{}
            }).success(function(data,status,headers,config){
                callback(data.data,status,headers,config);
            }).error(function(data,status,headers,config){
                callback(data,status,headers,config);
            })
        }

        function getUserInfo(){
            var deferred = $q.defer();
            $http({
                method:'GET',
                url:CONFIGURL+'api/users/current',
                params:{},
                data:{}
            }).success(function(data,status,headers,config){
                deferred.resolve(data.data);
            }).error(function(data,status,headers,config){
                deferred.reject(data);
            })
            return deferred.promise;
        }

        function changeMyPassword(newPassword,oldPassowrd){
            var deferred = $q.defer();
            $http({
                method:'POST',
                url:CONFIGURL+'api/users/password/change',
                params:{},
                data:{
                    newPassword:newPassword,
                    oldPassword:oldPassowrd
                }
            }).success(function(data,status,headers,config){
                deferred.resolve(data);
            }).error(function(data,status,headers,config){
                deferred.reject(data);
            })
            return deferred.promise;
        }
    }
})();

/**
 * Created by cbjiang on 2017/5/22.
 */

var Layout = function () {

    var handleSidebarMenuActiveLink = function(mode, el) {
        var url = location.hash.toLowerCase();

        var menu = $('#jquery-accordion-menu');

        if (mode === 'click' || mode === 'set') {
            el = $(el);
        } else if (mode === 'match') {
            var aList=menu.find("li > a");
            menu.find("li > a").each(function() {
                var path = $(this).attr("href")==null?'':$(this).attr("href").toLowerCase();
                // url match condition
                if (path.length > 1 && url.substr(1, path.length - 1) == path.substr(1)) {
                    el = $(this);
                    return;
                }
            });
        }
        if (!el || el.size() == 0) {
            return;
        }
        if (el.attr('href').toLowerCase() === 'javascript:;' || el.attr('href').toLowerCase() === '#') {
            return;
        }
        menu.find('li.active').removeClass('active');
        el.parents('li').each(function () {
            $(this).addClass('active');
            $(this).find('> a').addClass('submenu-indicator-minus');

            if ($(this).find('ul.submenu').size() > 0) {
                $(this).find('ul.submenu').css('display','block')
            }
        });
    };

    return {

        setSidebarMenuActiveLink: function(mode, el) {
            handleSidebarMenuActiveLink(mode, el);
        },

    };

}();
/**
 * Created by cbjiang on 2017/7/18.
 */

angular.module("hm.appcore").factory('auth',['$q','$http','$location','$localStorage','$sessionStorage','GATEWAYURL','LOGINURL','LOGOUTURL','SYSNAME',
function($q,$http,$location,$localStorage,$sessionStorage,GATEWAYURL,LOGINURL,LOGOUTURL,SYSNAME){

    return{
        saveToken:saveToken,
        doLogout:doLogout,
        doLogin:doLogin,
    }

    function saveToken(){
        resetStorage();
        var token = $location.search().token;
        console.log('token',token);
        if(token!=null && token!=''){
            $localStorage.authenticationToken=token;
        }
    }

    function resetStorage(){
        $localStorage.$reset();
        $sessionStorage.$reset();
    }

    function doLogin(){
        console.log('doLogin');
        var params='';
        var host=getServerUrl();
        if(host!=null && host!=''){
            params='?url='+host;
        }
        resetStorage();
        console.log('LOGINURL+params',LOGINURL+params);
        window.location.replace(window.location.href=LOGINURL+params);
    }

    function doLogout(){
        $localStorage.$reset();
        $sessionStorage.$reset();
        window.location = LOGOUTURL.replace('${serverUrl}',getServerUrl()).replace('${host}',getHost());
    }

    function getHost(){
        return $location.protocol()+'://'+$location.host()+':'+$location.port()+'/'+SYSNAME;
    }

    function getServerUrl(){
        return encodeURIComponent($location.protocol()+'://'+$location.host()+':'+$location.port()+'/'+SYSNAME);
    }

    function check(jwt){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:GATEWAYURL+'api/authenticate',
            responseType:'text',
            headers: {'Authorization':('Bearer '+jwt)},
            transformResponse:[function (data, headersGetter) {
                return data;
            }]
        }).success(function(response){
            deferred.resolve(response);
        }).error(function(response){
            deferred.reject(response);
        })
        return deferred.promise;
    }

}]);
