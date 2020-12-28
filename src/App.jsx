import React from 'react';
import { Provider } from 'react-redux';
import store from 'Redux/store';

import Img1 from 'Assets/img/avatar.jpg';
import Img2 from 'Assets/img/carousel1.jpg';
import './style.scss';

function App() {
  return (
    <Provider store={store}>
      <div className="test">
        Admin paged
        <img src={Img1} alt="" />
        <img src={Img2} alt="" />
      </div>
    </Provider>
  );
}

export default App;
