module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        host: '127.0.0.1',
        port: 8081,
        proxy: {
          '/api': {
            target: 'https://zzh.hzysofti.com',
            changeOrigin: true,
          },
          '/common': {
            target: 'https://zzh.hzysofti.com',
            changeOrigin: true,
          }
        }
    }
}