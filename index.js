const express = require('express'); // COMMON JS MODULES -> on server side
const app = express(); // instance of running Express app

//1
app.get('/', (req, res) => {
	res.send({ hi: 'There!' });
});

//2
const PORT = process.env.PORT || 5000;
app.listen(PORT);

//1 ROUTE HANDLER
//  get -> watches for incoming requests
//  '/' -> route portion of the handler

//2 env -> variable passed by underlining environment (i.e. heroku)
