import React, { Component } from 'react';
import '../App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Jumbotron , Row, Col } from 'reactstrap';
import WeatherInfo from './WeatherInfo';
import WeatherForm from './WeatherForm';

import { WEATHER_KEY } from '../keys';


class Home extends Component {

  state = {
    temperature: '',
    description: '',
    humidity: '',
    wind_speed: 0,
    city: '',
    country: '',
    error: null
};

getWeather = async (e) => {
    e.preventDefault();
    const { city, country } = e.target.elements;
    const cityValue = city.value;
    const countryValue = country.value;

    if (cityValue && countryValue) {
        // metric parameter is for Celcius Unit
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${WEATHER_KEY}&units=metric`;
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data)

        this.setState({
            temperature: data.main.temp,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            wind_speed: data.wind.speed,
            city: data.name,
            country: data.sys.country,
            error: null
        });
    } else {
        this.setState({
            error: 'Por favor ingresá una ciudad y un país.'
        });
    }

}


  render() {
    return (
      <div>
        <AppNavbar/>

        <Row className="contenedor">
        <Col sm="12" md={{ size: 6 }}>
     
      
        <Jumbotron className="animated fadeInUp">
        <h1 className="display-3">Registro de Sensores</h1>
        <p className="lead">Aplicación web para el Registro de Sensores.</p>
        <hr className="my-2" />
        <p>Tecnologías utiilzadas: ReactJS, Express, PostgreSQL, NodeJS</p>
        <p className="lead">
          <div className="btn-home-box">
        <Button color="info"><Link className="blanco" to="/sensors">Administrar Lista de Sensores</Link></Button>
        </div>
        </p>
      </Jumbotron>
      <div className="animated fadeInRight">
      <WeatherForm getWeather={this.getWeather} /></div>
      <WeatherInfo {...this.state} />
      
        </Col>
        </Row>
      </div>
    );
  }
}

export default Home;