const express = require('express');
const path = require('path');
var cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const Handlebars = require('express-handlebars');

const PORT = 3000;
const app = express();

app.engine('hbs', Handlebars());
app.set('view engine', 'hbs');
app.set('views', 'views');

app.get('/favicon.ico', (req, res) => res.status(204));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'styles')));

app.use(routes);

app.use((req, res) => {
  console.log('Got a request to the 404 error page');
  res.status(404).sendFile(path.join(__dirname, 'views', 'pagenotfound.html'));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
