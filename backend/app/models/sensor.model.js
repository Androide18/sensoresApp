module.exports = (sequelize, Sequelize) => {
	const Sensor = sequelize.define('sensor', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
	  nombre: {
			type: Sequelize.STRING
	  },
	  fecha: {
		  type: Sequelize.DATEONLY,
		  validation: {
			isDate: true,
		  }
  	},
	  hora: {
			type: Sequelize.STRING
	  },
	  temperatura: {
			type: Sequelize.INTEGER
    }
	});
	
	return Sensor;
}