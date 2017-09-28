import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter} from 'react-router-redux'
import {Provider} from "react-redux"
import store from "./store"
import history from "./history"
import {MuiThemeProvider} from 'material-ui'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    </MuiThemeProvider>, document.getElementById('root')
);
registerServiceWorker();
