const app = require('./app');

app.listen(3333, () => console.log('Server up in 3333'));

module.exports = app;