import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './_ui/main/App/App';
import './index.css';
import reportWebVitals from './rest/reportWebVitals';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './_bll/main/store';
import {ScrollToTop} from './_ui/main/ScrollToTop/ScrollToTop';
//2
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <ScrollToTop/>
                <App/>
            </HashRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
