const express = require('express');

const app = express();

app.set('secret', 'fdadger45#3$&f' + Math.random());

app.use(require('cors')());
app.use(express.json());

app.use('/', express.static(__dirname + '/admin'));

require('./db')(app);
require('./api')(app);

app.listen(3001, () => {
	console.log('running on 3001');
});
