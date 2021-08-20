let express = require('express');
let router = express.Router();
 
const sensors = require('../controllers/controller.js');

router.post('/api/sensor', sensors.createSensor);
router.get('/api/sensor/:id', sensors.getSensor);
router.get('/api/sensors', sensors.sensors);
router.put('/api/sensor', sensors.updateSensor);
router.delete('/api/sensor/:id', sensors.deleteSensor);

module.exports = router;