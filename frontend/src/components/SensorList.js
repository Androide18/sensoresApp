import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class SensorList extends Component {

  constructor(props) {
    super(props);
    this.state = {sensors: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/sensors')
      .then(response => response.json())
      .then(data => this.setState({sensors: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/sensor/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedSensors = [...this.state.sensors].filter(i => i.id !== id);
      this.setState({sensors: updatedSensors});
    });
  }
  

  render() {
    const {sensors, isLoading} = this.state;

    

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const sensorList = sensors.map(sensor => {
      return <tr key={sensor.id}>
        <td style={{whiteSpace: 'nowrap'}}>{sensor.nombre}</td>
        <td>{sensor.fecha}</td>
        <td>{sensor.hora}</td>
        <td>{sensor.temperatura}{'°'}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/sensors/" + sensor.id}>Modificar</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(sensor.id)}>Eliminar</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid className="sensor-box">
          <div className="float-right">
            <Button color="success" tag={Link} to="/sensors/new">+ Nuevo Sensor</Button>
            <Button color="info" tag={Link} to="/graphic">Grafico</Button>
            <Button color="warning" tag={Link} to="/report">Reporte ⮞</Button>
          </div>
          <h3>Lista de Sensores</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Nombre</th>
                <th width="20%">Fecha</th>
                <th width="10%">Hora</th>
                <th width="10%">Temperatura</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
            {sensorList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default SensorList;