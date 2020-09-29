import React, { Component } from 'react';
import search_l from '../assets/search-location-solid.svg';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            city: '',
        }
    }

    dt_tm() {
        let op_dt = { year: 'numeric', month: 'long', day: 'numeric' };
        let dt = new Date();
        let ampm = dt.getHours() >= 12 ? 'PM' : 'AM';
        let tm = (dt.getHours() % 12 === 0 ? '12' : dt.getHours() % 12) + " : " + dt.getMinutes() + " " + ampm;
        document.getElementById("dt").innerHTML = dt.toLocaleString("en-US", op_dt);
        document.getElementById("tm").innerHTML = tm.toLocaleString("en-US");
    }
    // ip_api() {
    //     let ip_url = 'https://ipapi.co/json/';
    //     let da;
    //     fetch(ip_url)
    //         .then(response => response.json())
    //         .then(data => da = data)
    //         .then(() => {
    //             document.getElementById('location').value = da.city;
    //         }
    //         );
    // }

    async weather_api() {
        let location = document.getElementById('location').value || 'Jabalpur';
        let api_key = '3faadbb73e7e4c4fb09132852202809';
        let days = 1;
        let api = `//api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}&days=${days}`;

        let obj;
        await fetch(api).then(res => res.json()).then(data => obj = data)
            .then(() => {
                let loc = obj.location.name;
                let loc_r = obj.location.region;
                let temp_c = obj.current.feelslike_c;
                let condition = obj.current.condition.text;
                let wind_dir = obj.current.wind_dir;
                let wind_kph = obj.current.wind_kph;
                let wind_mph = obj.current.wind_mph;
                let humidity = obj.current.humidity;
                let cloud = obj.current.cloud;

                document.getElementById('loc').innerHTML = `${loc}, ${loc_r}`;
                document.getElementById('deg').innerHTML = `${temp_c}<sup>&deg;C</sup>`;
                document.getElementById('condition').innerHTML = condition;
                document.getElementById('wind_dir').innerHTML = wind_dir;
                document.getElementById('wind_kph').innerHTML = wind_kph;
                document.getElementById('wind_mph').innerHTML = wind_mph;
                document.getElementById('humidity').innerHTML = `${humidity}%`;
                document.getElementById('cloud').innerHTML = `${cloud}%`;

            });
    }

    change_temp() {
        let deg = document.getElementById('deg');
        if (deg.innerHTML.includes('C')) {
            let kelvin = ((parseFloat(deg.innerHTML) * 9 / 5) + 32).toFixed(1);
            let temp = (kelvin).includes(.0) ? parseInt(kelvin) : kelvin;
            deg.innerHTML = `${temp}<sup>&deg;F</sup>`;
        }
        else {
            let celsius = ((parseFloat(deg.innerHTML) - 32) * 5 / 9).toFixed(1);
            let temp = (celsius).includes(.0) ? parseInt(celsius) : celsius;
            deg.innerHTML = `${temp}<sup>&deg;C</sup>`;
        }
    }


    componentDidMount() {
        this.dt_tm();
        // this.ip_api();
        this.weather_api();

        let input = document.getElementById("location");
        input.addEventListener("keyup", function (event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("search_loc").click();
            }
        });
    }

    render() {
        return (
            <div className='home'>

                <div className='nav'>
                    <button id='thermo' onClick={() => this.change_temp()}>
                        &deg;C/F
                    </button>
                    <input type='text' id='location' placeholder='Search location'></input>
                    <button id='search_loc' type='supmit' onClick={() => this.weather_api()}>
                        <img src={search_l} alt="Logo" />
                    </button>
                </div>

                <h3 className='location_f' id='loc'>-----------------</h3>
                <br />

                <div className='i_deg'>
                    <h1 className='deg' id='deg'>--<sup>&deg; C</sup></h1>
                    <p id='condition'>------</p>
                    <br />
                </div>

                <div className='dt_tm'>
                    <p id='dt'></p>
                    <p id='tm'></p>
                </div>
                <br />

                <div className='w_info'>
                    <div className='card winfo'>

                        <div className='wind_i flex_m'>
                            <div className='wind_dir'>
                                <h2 id='wind_dir'>- -</h2>
                                <p>Wind Direction</p>
                            </div>
                            <div>
                                <h4 id='wind_kph'>- -</h4>
                                <p>Wind(Kph)</p>
                                <br />
                                <h4 id='wind_mph'>- -</h4>
                                <p>Wind(Mph)</p>
                            </div>
                        </div>

                        <div className='flex_m other_i'>
                            <div>
                                <h3 id='cloud'>- -</h3>
                                <p>Humidity</p>
                            </div>
                            <div>
                                <h3 id='humidity'>- -</h3>
                                <p>cloud</p>
                            </div>

                        </div>
                    </div>
                    <br />
                    <div className='card w_week'>

                    </div>
                </div>

            </div>
        )
    }
}

export default Home;
