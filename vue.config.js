module.exports = {
    //生成环境部署路径，默认为'/'


    devServer: {
        proxy: 'http://192.168.1.6:8080', //这会告诉开发服务器将任何未知请求 (没有匹配到静态文件的请求) 代理到http://localhost:4000
    }
}