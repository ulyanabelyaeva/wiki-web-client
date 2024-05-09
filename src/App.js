import { Route, Routes } from "react-router-dom";
import Workspace from "./component/Workspace";
import Login from "./component/Login";
import { isAuth } from "./redux/slice/LoginSlice"

import './style/App.css';


function App() {
  return (
    <div className='app'>
      <Routes>
        {console.log(isAuth())}
        {isAuth() ? (<Route path='/' element={<Workspace />} />) : (<Route path='/login' element={<Login />} />)}

        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
