import React from "react";
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { storeManager } from './store';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';

storeManager.initState(require('./store/menu').default);

ReactDOM.render(
    <Provider store={ storeManager.store }>
        { require('./router').default }
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
