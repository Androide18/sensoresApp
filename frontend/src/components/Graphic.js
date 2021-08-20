import React, { Component, useState, useEffect  } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import {Line} from 'react-chartjs-2';
import axios from 'axios';

function Graphic (){

  const data = {
    labels: ['Sensor1', 'Sensor2', 'Sensor1', 'Sensor3', 'Sensor4'],
    datasets:[{
      label:'Temperatura',
      backgroundColor: 'rgba(0,255,0,1)',
      borderColor: 'black',
      borderWidth: 1,
      hoverBackgroundColor: '#FF0000',
      data: [7, 22, 31, 17, 39]
    }]
  };


  // const peticionApi=async()=>{
  //   await axios.get('http://localhost:8080/api/sensors')
  //   .then(response=>{
  //     console.log(response.data);
  //   })
  // }

  // useEffect(()=>{
  //   peticionApi();
  // },[])
  

    return (
      <div>
        <AppNavbar/>
        <Container fluid className="sensor-box">
        <div className="float-right">
            <Button color="warning" tag={Link} to="/sensors">⮜ Volver a Lista de Sensores</Button>
          </div>
          <h3>Grafico de Sensores</h3>
          <div className="grafico">
          <Line data={data} />
        </div>
        </Container>
      </div>
    );
  }

export default Graphic;