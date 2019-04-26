const app = require('./app');

//const { PORT = 9090 } = process.env;

app.listen(process.env.PORT || 9090, () => console.log(`Listening on port ${PORT}...`));
