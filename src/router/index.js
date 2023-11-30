const fs = require('fs')
const userRoutes = app => {
  const paths = fs.readdirSync(__dirname)
  paths.forEach(path => {
    if (path !== 'index.js') {
      const item = require('./' + path)
      app.use(item.routes())
      app.use(item.allowedMethods())
    }
  })
}

module.exports = userRoutes
