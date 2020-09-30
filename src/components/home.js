import React, { Component } from 'react';
import search_l from '../assets/search-location-solid.svg';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            city: '',
        }
    }

    day_night() {
        let dt = new Date();
        let loc = document.getElementById('location').style;
        loc.color = (dt.getHours() < 19) ? '#505050':'#fff';
        loc.backgroundColor = (dt.getHours() < 19) ? 'rgba(255,255,255,0.4)':'rgba(96, 117, 158, 0.4);';
        document.body.style.backgroundImage = (dt.getHours() < 19) ? 'linear-gradient(-165deg,#eb9359 18%,#169e80 82%)' : 'linear-gradient(-170deg,#101114 10%,#222a3b 65%,#883655)';
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
        let days = 3;
        let api = `//api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${location}&days=${days}`;

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

                //Forecast
                let fore = obj.forecast.forecastday;
                let len_fore = (fore).length;

                let op_dt = { year: 'numeric', month: 'short', day: 'numeric' };
                let dt = new Date().getTime() + 86400000 + 86400000;
                let dat = new Date(dt);
                document.getElementById('date2').innerHTML = dat.toLocaleString("en-US", op_dt);
                var i;
                for (i = 0; i < len_fore; i++) {
                    document.getElementById(`condition${i}`).innerHTML = fore[i].day.condition.text;
                    document.getElementById(`min_temp${i}`).innerHTML = `${fore[i].day.mintemp_c}<sup>°C<sup>`;
                    document.getElementById(`max_temp${i}`).innerHTML = `${fore[i].day.maxtemp_c}<sup>°C<sup>`;
                    document.getElementById(`sunrise${i}`).innerHTML = fore[i].astro.sunrise;
                    document.getElementById(`sunset${i}`).innerHTML = fore[i].astro.sunset;


                }

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
        this.day_night();
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

                        <div className='days'>

                            <div>
                                <h4 id='date0'>Today</h4>
                                <p id='condition0'>------</p>
                            </div>
                            <div>
                                <div>
                                    <h3 id='max_temp0'>- -</h3>
                                    <p>Max temp</p>
                                </div>
                                <div>
                                    <h3 id='min_temp0'>- -</h3>
                                    <p>Min temp</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h3 id='sunrise0'>- -</h3>
                                    <p>Sunrise</p>
                                </div>
                                <div>
                                    <h3 id='sunset0'>- -</h3>
                                    <p>Sunset</p>
                                </div>
                            </div>
                        </div>

                        <div className='days'>

                            <div>
                                <h4 id='date1'>Tommorow</h4>
                                <p id='condition1'>------</p>
                            </div>
                            <div>
                                <div>
                                    <h3 id='max_temp1'>- -</h3>
                                    <p>Max temp</p>
                                </div>
                                <div>
                                    <h3 id='min_temp1'>- -</h3>
                                    <p>Min temp</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h3 id='sunrise1'>- -</h3>
                                    <p>Sunrise</p>
                                </div>
                                <div>
                                    <h3 id='sunset1'>- -</h3>
                                    <p>Sunset</p>
                                </div>
                            </div>
                        </div>

                        <div className='days'>

                            <div>
                                <h3 id='date2'>-- -- --</h3>
                                <p id='condition2'>------</p>
                            </div>
                            <div>
                                <div>
                                    <h3 id='max_temp2'>- -</h3>
                                    <p>Max temp</p>
                                </div>
                                <div>
                                    <h3 id='min_temp2'>- -</h3>
                                    <p>Min temp</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h3 id='sunrise2'>- -</h3>
                                    <p>Sunrise</p>
                                </div>
                                <div>
                                    <h3 id='sunset2'>- -</h3>
                                    <p>Sunset</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
