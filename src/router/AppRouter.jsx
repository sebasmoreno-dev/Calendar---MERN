import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

  const { checkAuthToken, status } = useAuthStore();
  //const authStatus =  'not-authenticated' // not-authenticated - 'authenticated'

  //*El useEffect simpre lo pondremos antes que una condición
  useEffect(() => {
    checkAuthToken();
  }, [])

  if ( status === 'checking') {
    return (
      <h3>Cargando...</h3>
    )
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
        ? <Route path="/auth/*" element={<LoginPage />} />
        : <Route path="/*" element={<CalendarPage />} />
      }

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
