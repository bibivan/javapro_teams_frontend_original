module.exports = {
  devServer: {
    proxy: {
      '/api/v1': {
        target: 'http://45.134.255.54:8086/',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
