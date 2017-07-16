var Z_Ajax = {
    ajax: function() {
        var ajaxData = {
            type: arguments[0].type || "GET",
            url: arguments[0].url || "",
            async: arguments[0].async || "true",
            data: arguments[0].data || null,
            dataType: arguments[0].dataType || "text",
            contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
            beforeSend: arguments[0].beforeSend || function() {},
            success: arguments[0].success || function() {},
            error: arguments[0].error || function() {}
        };
        ajaxData.beforeSend();
        var xhr = Z_Ajax.createxmlHttpRequest();
        xhr.responseType = ajaxData.dataType;
        xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
        xhr.setRequestHeader("Content-Type", ajaxData.contentType);
        xhr.send(Z_Ajax.convertData(ajaxData.data));
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    ajaxData.success(xhr.response)
                } else {
                    ajaxData.error()
                }
            }
        };
    },
    createxmlHttpRequest: function() {
        if (window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    },
    convertData: function(data) {
        if (typeof data === 'object') {
            var convertResult = "";
            for (var c in data) {
                convertResult += c + "=" + data[c] + "&";
            }
            convertResult = convertResult.substring(0, convertResult.length - 1)
            return convertResult;
        } else {
            return data;
        }
    }
};
var getHTML = function(url, fn){
    Z_Ajax.ajax({
        url: url,
        success: function(res){
            fn(res);
        }
    });
};
var BLOG = {
    ROOT: '/',
    SHARE: true,
    REWARD: false
};
var scriptArr = [
    "//cdn.bootcss.com/node-waves/0.7.4/waves.min.js",
    "//unpkg.com/hexo-theme-material-indigo@latest/js/main.js",
    "//unpkg.com/hexo-theme-material-indigo@latest/js/search.js",
    "//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"
];
var insertScript = function(dom, scriptArr){
    for(var i in scriptArr){
        var script = document.createElement('script');
        script.src = scriptArr[i];
        dom.appendChild(script);
    }
}
getHTML('../common/header.html', function(header){
    document.querySelector('head').innerHTML += header;
});
getHTML('../common/menu.html', function(menu){
    document.querySelector('body').innerHTML += menu;
    insertScript(document.querySelector('body'), scriptArr);
});

(function() {
    var OriginTitile = document.title,
        titleTime;
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.title = '人哪里去了?';
            clearTimeout(titleTime);
        } else {
            document.title = '又回来了!';
            titleTime = setTimeout(function() {
                document.title = OriginTitile;
            }, 2000);
        }
    });
})();
