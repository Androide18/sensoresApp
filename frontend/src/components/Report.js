import React, { Component } from 'react';
import { Button, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class Report extends Component {

  constructor(props) {
    super(props);
    this.state = {sensors: [], isLoading: true};
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/sensors')
      .then(response => response.json())
      .then(data => this.setState({sensors: data, isLoading: false}));
  }


  render() {
    const {sensors, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const sensorList = sensors.sort(((a, b) => new Date(a.fecha) - new Date(b.fecha)) ).map(sensor => {
      return <tr key={sensor.id}>
        <td >{sensor.nombre}</td>
        <td>{sensor.fecha}</td>
        <td>{sensor.hora}</td>
        <td>{sensor.temperatura}{'°'}</td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid className="sensor-box">
        <div className="float-right">
            <Button color="warning" tag={Link} to="/sensors">⮜ Volver a Lista de Sensores</Button>
          </div>
          <h3>Reporte de Sensores</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Nombre</th>
                <th width="20%">Fecha</th>
                <th width="10%">Hora</th>
                <th width="10%">Temperatura</th>
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

export default Report;