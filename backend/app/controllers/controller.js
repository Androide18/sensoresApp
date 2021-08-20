
 const db = require('../config/db.config.js');
 const Sensor = db.Sensor;
 
 /**
  * Save a Sensor object to database MySQL/PostgreSQL
  * @param {*} req 
  * @param {*} res 
  */
 exports.createSensor = (req, res) => {
     let sensor = {};
 
     try{
         // Building Sensor object from upoading request's body
         sensor.nombre = req.body.nombre;
         sensor.fecha = req.body.fecha;
         sensor.hora = req.body.hora;
         sensor.temperatura = req.body.temperatura;
     
         // Save to MySQL database
         Sensor.create(sensor, 
                           {attributes: ['id', 'nombre', 'fecha', 'temperatura', 'hora']})
                     .then(result => {    
                       res.status(200).json(result);
                     });
     }catch(error){
         res.status(500).json({
             message: "Fail!",
             error: error.message
         });
     }
 }
 
 /**
  * Retrieve Sensor information from database
  * @param {*} req 
  * @param {*} res 
  */
 exports.sensors = (req, res) => {
     // find all Sensor information from 
     try{
         Sensor.findAll({attributes: ['id', 'nombre', 'fecha', 'temperatura', 'hora']})
         .then(sensors => {
             res.status(200).json(sensors);
         })
     }catch(error) {
         // log on console
         console.log(error);
 
         res.status(500).json({
             message: "Error!",
             error: error
         });
     }
 }
 
 exports.getSensor = (req, res) => {
     Sensor.findByPk(req.params.id, 
                         {attributes: ['id', 'nombre', 'fecha', 'temperatura', 'hora']})
         .then(sensor => {
           res.status(200).json(sensor);
         }).catch(error => {
           // log on console
           console.log(error);
 
           res.status(500).json({
               message: "Error!",
               error: error
           });
         })
 }




 
 /**
  * Updating a Sensor
  * @param {*} req 
  * @param {*} res 
  */
 exports.updateSensor = async (req, res) => {
     try{
         let sensor = await Sensor.findByPk(req.body.id);
     
         if(!sensor){
             // return a response to client
             res.status(404).json({
                 message: "Not Found for updating a sensor with id = " + sensorId,
                 error: "404"
             });
         } else {    
             // update new change to database
             let updatedObject = {
                 nombre: req.body.nombre,
                 fecha: req.body.fecha,
                 hora: req.body.hora,
                 temperatura: req.body.temperatura
             }
             let result = await Sensor.update(updatedObject,
                               { 
                                 returning: true, 
                                 where: {id: req.body.id},
                                 attributes: ['id', 'nombre', 'fecha', 'temperatura', 'hora']
                               }
                             );
 
             // return the response to client
             if(!result) {
                 res.status(500).json({
                     message: "Error -> No se puede modificar el Sensor con Id = " + req.params.id,
                     error: "No se puede Modificar",
                 });
             }
 
             res.status(200).json(result);
         }
     } catch(error){
         res.status(500).json({
             message: "Error -> No se puede modificar el Sensor con Id = " + req.params.id,
             error: error.message
         });
     }
 }
 
 /**
  *  Delete a Sensor by ID
  * @param {*} req 
  * @param {*} res 
  */
 exports.deleteSensor = async (req, res) => {
     try{
         let sensorId = req.params.id;
         let sensor = await Sensor.findByPk(sensorId);
 
         if(!sensor){
             res.status(404).json({
                 message: "No existe el Sensor con el Id = " + sensorId,
                 error: "404",
             });
         } else {
             await sensor.destroy();
             res.status(200).send('Se elimino el sensor con exito');
         }

     } catch(error) {
         res.status(500).json({
             message: "Error -> Nose puede borrar el Sensor con el id = " + req.params.id,
             error: error.message
         });
     }
 }