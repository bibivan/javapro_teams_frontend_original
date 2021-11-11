module.exports = {
    devServer: {
      // Бэкенд сервер 
      proxy: { 
        "^/api/*": {
          target: 'https://45.134.255.54:8086/',
          changeOrigin: true
        }
      },
      
    },
  };
