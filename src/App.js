import React,{useEffect} from "react";
import { AllRoute } from "./routes/AllRoute";
import store from "./Redux/store";
import { Provider } from 'react-redux';
import axios from 'axios';

function App() {
  
  return (
    <>
    <Provider store={store}>
      <AllRoute />
    </Provider>
    </>
  );
}

export default App;
