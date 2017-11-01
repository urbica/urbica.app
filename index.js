require('dotenv').config();

const app = require('./src/server/app');

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
