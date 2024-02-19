import { useState } from 'react';
import appFirebase from './credenciales.js';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import './App.css';

import Login  from './components/Login';
import Home from './components/Home';

const auth = getAuth(appFirebase);

function App() {

  const [usuario, setUsuario] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {

    if (usuarioFirebase){
      setUsuario(usuarioFirebase);
    }else {
      setUsuario(null);
    }

  });

  return (
    <div>
      {usuario ? <Home correoUsuario = {usuario.email}/> : <Login/>}
    </div>
  )
}

export default App
