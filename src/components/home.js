import React, { Component } from 'react';
import search_l from '../assets/search-location-solid.svg';
import thermo from '../assets/thermometer-half-solid.svg';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            city: '',
        }
    }

    dt_tm() {
        var op_dt = { year: 'numeric', month: 'long', day: 'numeric' };
        var dt = new Date();
        var ampm = dt.getHours() >= 12 ? 'PM' : 'AM';
        var tm = dt.getHours() % 12 + " : " + dt.getMinutes() + " " + ampm;
        document.getElementById("dt").innerHTML = dt.toLocaleString("en-US", op_dt);
        document.getElementById("tm").innerHTML = tm.toLocaleString("en-US");
    }

    weather_api() {

        var location = document.getElementById('location').value || 'Jabalpur';
        var api_key = '3faadbb73e7e4c4fb09132852202809';
        var days=1;
        var api = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}&days=${days}`;
        console.log(this.state.city);

        var obj;
        fetch(api).then(res => res.json()).then(data => obj = data)
        .then(() => {
            var loc= obj.location.name;
            var loc_r=obj.location.region;
            var temp_c=obj.current.temp_c;
            var condition=obj.current.condition.text;

            document.getElementById('loc').innerHTML=`${loc}, ${loc_r}`;
            document.getElementById('deg').innerHTML=`${temp_c}<span>&deg;</span>`;
            document.getElementById('condition').innerHTML=condition;
        });
       
    }


    componentDidMount() {
        this.dt_tm();
        this.weather_api();
    }

    render() {
        return (
            <div className='home'>

                <div className='nav'>
                    <button id='thermo'>
                        <img src={thermo} height='32px' alt="Logo" />
                        <br />
                        &deg;C/F
                    </button>
                    <input type='text' id='location' placeholder='Search location' onSubmit={() => this.weather_api()}></input>
                    <button id='search_loc' type='submit' onClick={() => this.weather_api()}>
                        <img src={search_l} alt="Logo" />
                    </button>
                </div>

                <h3 className='location_f' id='loc'>-----------------</h3>
                <br />

                <div className='i_deg'>
                    <h1 className='deg' id='deg'>--<span>&deg;</span></h1>
                    <p id='condition'>------</p>
                    <br />
                </div>

                <div className='dt_tm'>
                    <p id='dt'></p>
                    <p id='tm'></p>
                </div>
                <br />

                <div className='w_info'>
                    <div className='card w_week'>

                    </div>
                    <br />
                    <div className='card w_forecast'>

                    </div>
                </div>

            </div>
        )
    }
}

export default Home;
