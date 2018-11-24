const app = require('./src/app');

app.listen(3000, () => {
  process.stdout.write('app is listening on port 3000\n');
});
