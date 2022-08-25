import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import { Provider } from "react-redux";
import { renderHook, act, waitForElementToBeRemoved, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authenticatedState, initialState, notAuthenticatedState } from "./../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";


const getMockStore = ( initialState ) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    }
  })
}

describe('Pruebas en useAuthStore', () => {


  test('debe de regresar los valores por defecto', () => {

    const mockStore = getMockStore( {...initialState} );

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }> { children }</Provider>
    });

    expect(result.current).toEqual({
        status: 'checking',
        user: {},
        errorMessage: undefined,
        checkAuthToken: expect.any(Function),
        startLogin: expect.any(Function),
        startRegister: expect.any(Function),
        startLogout: expect.any(Function),
    })
  });

  test('startLogin debe de realizar el login correctamente', async() => {
    localStorage.clear();
    const mockStore = getMockStore( {...notAuthenticatedState })
    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }> { children }</Provider>
    });

    await act(async() => {
      await result.current.startLogin( testUserCredentials );
    })

    const { errorMessage, status , user } = result.current
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test User', uid: '6303a717703f0eaa9db6e113'}
    });

    expect( localStorage.getItem('token')).toEqual( expect.any(String));
    expect( localStorage.getItem('token-init-date')).toEqual( expect.any(String));
  });

  test('startLogin debe de fallar la autenticación', async() => {

    localStorage.clear();
    const mockStore = getMockStore( {...notAuthenticatedState })
    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }> { children }</Provider>
    });

    await act(async() => {
      await result.current.startLogin({ email: 'mal@gmail.com', password: '123456' });
    })

    const { errorMessage, status , user } = result.current;
    expect(localStorage.getItem('token')).toBe(null);
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'Credenciales incorrectas',
      status: 'not-authenticated',
      user: {}
    });

    await waitFor(
      () => expect( result.current.errorMessage).toBe(undefined)
    );

  })
})