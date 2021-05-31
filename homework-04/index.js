const app = require('./src/app');
const db = require('./src/db');

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server runing .Use our API on port :${PORT}`);
  });
}).catch(err => {
  console.log(`server not running .Error message:${err.message}`);
});
