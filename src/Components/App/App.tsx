import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../Home/Home';
import Navbar from '../NavBar/Navbar';
import BookARide from '../BookARide/BookaRide';
import OfferARide from '../OfferARide/OfferARide';
import MyRides from '../MyRides/MyRides';
import SignUp from '../SignUp/SignUp';
import RideDetails from '../RideDetails/RideDetails';
import BookingDetails from '../BookingDetails/BookingDetails';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Redirect to="/signup" />
      </Route>
      <Route path="/ui" component={Navbar} />
      <Switch>
        <Route exact path="/ui/home" component={Home} />
        <Route path="/ui/bookaride" component={BookARide} />
        <Route path="/ui/offeraride" component={OfferARide} />
        <Route path="/ui/myrides" component={MyRides} />
        <Route path="/signup" component={SignUp} />
        <Route path="/ui/profile" component={Profile} />
        <Route path="/ui/offeredRide/:id" component={RideDetails} />
        <Route path="/ui/bookedRide/:id" component={BookingDetails} />
        <Route path="" component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
