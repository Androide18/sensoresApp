import React from 'react';

const WeatherForm = props => (
  
        <form className="form" onSubmit={props.getWeather}>
            <div className="form-group">
                <input type="text" name="city" placeholder="Ciudad" className="form-control" autoFocus/>
            </div>
            <div className="form-group">
                <input type="text" name="country" placeholder="País" className="form-control" />
            </div>
            <button className="btn btn-warning btn-block">
                ¿Cómo está el Clima?
            </button>
        </form>
    
);

export default WeatherForm;