module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        proxy: {
          '/api': {
            target: 'https://zzh.hzysofti.com:8002',
            changeOrigin: true,
          },
          '/common': {
            target: 'https://zzh.hzysofti.com:8002',
            changeOrigin: true,
          }
        }
    }
}