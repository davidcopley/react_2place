import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter} from 'react-router-redux'
import {Provider} from "react-redux"
import store from "./store"
import history from "./history"
import {MuiThemeProvider} from 'material-ui'
import getMuiTheme from "material-ui/styles/getMuiTheme"
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const muiTheme = getMuiTheme({
    palette:{
        primary1Color:"#1e717f",
        primary2Color:"#1e717f"
    }
})

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    </MuiThemeProvider>, document.getElementById('root')
);
registerServiceWorker();
