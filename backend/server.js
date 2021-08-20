const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
global.__basedir = __dirname;
 
const db = require('./app/config/db.config.js');

const Sensor = db.Sensor;

let router = require('./app/routers/router.js');

const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);

// Create a Server
const server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  Sensor.sync().then(() => {
    const sensors = [
      { nombre: 'Termosensor', fecha: '2004-12-02', 
                hora: "11:33", temperatura: '33'},
      { nombre: 'Sensor RTD', fecha: '2019-01-26', 
                hora: "04:32", temperatura: '10'},
      { nombre: 'Sensor RTD', fecha: '2000-05-14', 
                hora: "15:26", temperatura: '15'},
      { nombre: 'Termistor NTC', fecha: '2013-01-10', 
                hora: "08:00", temperatura: '39'},
    ]
    
    for(let i=0; i<sensors.length; i++){
      Sensor.create(sensors[i]);
    }
  })
}); 