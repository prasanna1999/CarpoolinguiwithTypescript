import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';

function Home(props:any) {
  return (
    <div className="home">
      <div className="content">
        <div className="greet">
          Hey {localStorage.getItem('Name')}!
        </div>
        <span className="buttons"><Link to='/ui/bookaride'><button className="bookbutton">Book a ride</button></Link></span>
        <span className="buttons"><Link to='/ui/offeraride'><button className="offerbutton">Offer a ride</button></Link></span>
      </div>
    </div>
  );
}

export default Home;
