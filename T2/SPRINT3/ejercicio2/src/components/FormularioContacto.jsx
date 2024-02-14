import React from 'react';
import { useForm } from 'react-hook-form';

const FormularioContacto = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    alert("Formulario enviado con éxito");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='inpu'>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" {...register('nombre', { required: true })} />
        {errors.nombre && <span>El nombre es requerido</span>}
      </div>

      <div className='inpu'>
        <label htmlFor="email">Email:</label>
        <input type="text" {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} />
        {errors.email && <span>Introduce un correo electrónico válido</span>}
      </div>

      <div className='inpu'>
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea {...register('mensaje', { required: true })} />
        {errors.mensaje && <span>El mensaje es requerido</span>}
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormularioContacto;
