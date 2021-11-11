module.exports = {
    dev: {
      // Бэкенд сервер 
        '/api/v1/': {
          target: 'https://45.134.255.54:8086/',
          changeOrigin: true,
          ws: true,
        },  
    },
  };
