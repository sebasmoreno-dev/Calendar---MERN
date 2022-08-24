import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import { Provider } from "react-redux";
import { renderHook } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { initialState } from "./../fixtures/authStates";


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

  test('', () => {

  });
})