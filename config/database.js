const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  uri: 'mongodb://localhost:27017/ehub', //for local
  //uri: 'mongodb://khan:khan@ds141464.mlab.com:41464/first-angular-app', // for production
  secret: crypto,
  //db: 'first-angular-app'
  db: 'ehub'
}