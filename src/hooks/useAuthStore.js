//* Tiene como objetivo realizar cualquier interacción con la parte del auth en nuestro store

import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "./../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //*Proceso de login (async)
  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      //*Debemos de llegar al backend - enviando la info (email, password)
      const { data } = await calendarApi.post("/auth", { email, password });
      //*Establecer el token en el local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));

    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  //*Proceso de registro startRegister
  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      //*Debemos de hacer la peticion al back enviando los datos
      const { data } = await calendarApi.post('/auth/new',{ email, password, name });
      //*Establecer el token en el local storage
      localStorage.setItem('token', data.token );
      localStorage.setItem('token-init-date', new Date().getTime() );
      dispatch( onLogin({ name: data.name, uid: data.uid }) );

    } catch (error) {
        dispatch( onLogout( error.response.data?.msg || '--' ) );
        setTimeout(() => {
            dispatch( clearErrorMessage() );
        }, 10);
      }
  };


  const checkAuthToken = async() => {
    //*Traemos el token de localStorage
    const token = localStorage.getItem('token');
    if ( !token ) return dispatch( onLogout());

    try {
      const { data } = await calendarApi.get('auth/renew');
      //*Establecer el token en el localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));

    } catch (error) {
      localStorage.clear();
      dispatch( onLogout());
      }
    }

  return {
    //*Propiedades
    status,
    user,
    errorMessage,

    //*Métodos
    startLogin,
    startRegister,
    checkAuthToken
  };

}

