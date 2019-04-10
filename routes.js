const routes = module.exports = require('next-routes') ()

// .add(nombre, url, archivo.js)      
 routes
  .add('index')
  .add('channel', '/:slug.:id', 'channel')
  .add('podcast', '/:slugChannel.:idChannel/:slug.:id', 'podcast')  