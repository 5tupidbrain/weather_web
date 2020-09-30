import React, { Component } from 'react';
import logo from '../assets/Ohweather.svg'

class Home extends Component {
    render(){
        return(
            <footer id='footer'>
                <div>
                    <div className='f_logo'>
                        <img src={logo} alt='logo'></img>
                    </div>
                    <p>Oh Weather! &copy; 2020</p>
                </div>
                <div>

                </div>
            </footer>
        )
    }
}

export default Home;
