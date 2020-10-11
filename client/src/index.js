import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';
import App from './App';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import common_es from "./translations/es.json";
import common_en from "./translations/en.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
    resources: {
        en: {
            common: common_en
        },
        es: {
            common: common_es
        },
    },
});

ReactDOM.render(
  <Router>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Router>, 
  document.getElementById('root')
);

serviceWorker.unregister();