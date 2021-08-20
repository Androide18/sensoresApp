import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class SensorEdit extends Component {

  emptySensor = {
    nombre: '',
    fecha: '',
    hora: '',
    temperatura: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptySensor
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const sensor = await (await fetch(`/api/sensor/${this.props.match.params.id}`)).json();
      this.setState({item: sensor});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/sensor', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/sensors');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Modificar Sensor' : 'Agregar Sensor'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="nombre">Nombre</Label>
            <Input type="text" name="nombre" id="nombre" value={item.nombre || ''}
                   onChange={this.handleChange} autoComplete="nombre"/>
          </FormGroup>
          <FormGroup>
            <Label for="fecha">Fecha de Alta</Label>
            <Input type="text" name="fecha" id="fecha" value={item.fecha || ''}
                   onChange={this.handleChange} autoComplete="fecha"/> <p className="date">{'Por ejemplo: 1999-12-05'}</p>
          </FormGroup>          
          <FormGroup>
            <Label for="hora">Hora</Label>
            <Input type="text" name="hora" id="hora" value={item.hora || ''}
                   onChange={this.handleChange} autoComplete="hora"/>
          </FormGroup>
          <FormGroup>
            <Label for="temperatura">Temperatura</Label>
            <Input type="text" name="temperatura" id="temperatura" value={item.temperatura || ''}
                   onChange={this.handleChange} autoComplete="temperatura"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Guardar</Button>{' '}
            <Button color="secondary" tag={Link} to="/sensors">Cancelar</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(SensorEdit);