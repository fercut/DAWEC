import React, { useState } from 'react';
import appFirebase from '../credenciales';
import { getAuth, signOut, updateEmail, updatePassword, deleteUser } from 'firebase/auth';

const auth = getAuth(appFirebase);

const Home = ({ correoUsuario }) => {
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleUpdateEmail = async () => {
        try {
            await updateEmail(auth.currentUser, newEmail);
            alert('Email actualizado correctamente.');
        } catch (error) {
            console.error('Error al actualizar el email:', error.message);
        }
    };

    const handleUpdatePassword = async () => {
        try {
            await updatePassword(auth.currentUser, newPassword);
            alert('Contraseña actualizada correctamente.');
        } catch (error) {
            console.error('Error al actualizar la contraseña:', error.message);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteUser(auth.currentUser);
            alert('Cuenta eliminada correctamente.');
        } catch (error) {
            console.error('Error al eliminar la cuenta:', error.message);
        }
    };

    return (
        <div className='home'>
            <h2 className='text-center'>Bienvenido usuario {correoUsuario}</h2>
            <div>
                <h3>Salir de Cuenta</h3>
                <button className='btn btn-primary mb-5' onClick={() => signOut(auth)}>
                    Salir
                </button>
            </div>

            <div className='row custom-width mb-5'>
                <h3>Editar Cuenta</h3>
                <label htmlFor='newPassword'>Nueva Contraseña:</label>
                <input
                    type='password'
                    id='newPassword'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='col-md-2'
                /><br/>
                <button className='btn btn-primary col-md-2' onClick={handleUpdatePassword}>Actualizar Contraseña</button>
            </div>

            <div>
                <h3>Borrar Cuenta</h3>
                <button className='btn btn-primary' onClick={handleDeleteAccount}>Borrar Cuenta</button>
            </div>
        </div>
    );
};

export default Home;
