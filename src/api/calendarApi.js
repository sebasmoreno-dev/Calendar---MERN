import axios from 'axios';
import { getEnvVariables } from './../helpers';

const { VITE_API_URL } = getEnvVariables()

const calendarApi = axios.create({
  baseURL: VITE_API_URL
})


//Todo: configurar interceptores
//*Cualquier petición que se haga con el calendarApi adicionalmente se le añada el header
calendarApi.interceptors.request.use( config => {

  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token')
  }

  return config;
})

export default calendarApi;