module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        host: '127.0.0.1',
        port: 8081,
        proxy: {
          '/api': {
            // target: 'https://pc.zugouqingsong.com',
            target: 'http://zzh.hzysofti.com:82/',
            changeOrigin: true,
          },
          '/common': {
            // target: 'https://pc.zugouqingsong.com',
            target: 'http://zzh.hzysofti.com:82/',
            changeOrigin: true,
          }
        }
    }
}