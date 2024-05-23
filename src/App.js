import { Route, Routes } from "react-router-dom";
import Workspace from "./component/Workspace";
import Auth from "./component/Auth";

import './style/App.css';


function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/login' element={<Auth />} />
        <Route path='/' element={<Workspace/>}/>
        <Route path='/page/:id' element={<Workspace/>}/>
      </Routes>
    </div>
  );
}

export default App;
