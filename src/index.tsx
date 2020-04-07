import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './Components/App/App';
import SignUp from './Components/SignUp/SignUp';
import * as serviceWorker from './serviceWorker';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

initializeIcons();

const LoadingIndicator = (props:any) => {
    const { promiseInProgress } = usePromiseTracker();
   return (
    promiseInProgress &&
    <div><Loader type="ThreeDots" color="#2BAD60"/></div>
  );  
}

ReactDOM.render(<div><SignUp /></div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
