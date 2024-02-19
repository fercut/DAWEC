import React, { useState } from 'react';
import Imagen from '../assets/1.png'
import user from '../assets/user.jpg'

import appFirebase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(appFirebase);


const Login = () => {

    const [registrando, setRegistrando] = useState(false);

    const funcAutenticacion = async(e) => {
        e.preventDefault();
        const correo = e.target.email.value;
        const contraseña = e.target.password.value;
        
        if(registrando) {
            
            try {
                await createUserWithEmailAndPassword(auth, correo, contraseña);
            } catch (error) {
                alert("Asegurese que la contraseña tenga mas de 8 caracteres")
            }
        } else {
            try{
                await signInWithEmailAndPassword(auth, correo, contraseña);
            } catch (error){
                alert("El correo o la contraseña son incorrecta");
            }
            
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='padre'>
                        <div className='card card-body shadow-lg'>
                            <img src={Imagen} alt="avatar" className='estilo-profile' />
                            <form onSubmit={funcAutenticacion}>
                                <input type="text" placeholder='Ingresar Email' className='cajatexto' id='email'/>
                                <input type="password" placeholder='Inggresar contraseña' className='cajatexto' id='password'/>
                                <button className='btnform'>
                                    {registrando ? "Registrar" : "Iniciar sesión"}
                                </button>
                            </form>
                            <h4 className='texto'>{registrando ? "Tienes cuenta" : "No tienes cuenta"}<button className='btnswicth' onClick={() => setRegistrando(!registrando)} >{registrando ? "Iniciar sesión" : "Registrate"}</button></h4>
                        </div>
                    </div>
                </div>
                <div className='col-md-8'>
                    <img src={user} />
                </div>
            </div>
        </div>
    )
}

export default Login;