import React from 'react';
import { Provider } from 'react-redux';
import store from 'Redux/store';
import './style.scss';

function App() {
  return (
    <Provider store={store}>
      <div className="test">
        Admin page
      </div>
    </Provider>
  )
}

export default App
