//* Tiene como objetivo realizar cualquier interacción con la parte del auth en nuestro store

import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from './../store';

export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  //*Proceso de login (async)
  const startLogin = async({ email, password }) => {
    dispatch( onChecking() );

    try {
      //*Debemos de llegar al backend - enviando la info (email, password)
      const { data } = await calendarApi.post('/auth', { email, password });
      //*Establecer el token en el local storage
      localStorage.setItem('token', data.token );
      localStorage.setItem('token-init-date', new Date().getTime() );
      dispatch( onLogin({ name: data.name, uid: data.uid }));


    } catch (error) {
        dispatch( onLogout('Credenciales incorrectas'))
        setTimeout(() => {
          dispatch( clearErrorMessage() );
        }, 10)
    }
  }

  return {
    //*Propiedades
    status,
    user,
    errorMessage,

    //*Métodos
    startLogin,

  }
}