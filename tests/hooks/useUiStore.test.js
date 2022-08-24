import { renderHook } from "@testing-library/react";
import { useUiStore } from "../../src/hooks/useUiStore";
import { store, uiSlice } from "../../src/store";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";


const getMockStore = ( initialState ) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer
    },
    preloadedState: {
      ui: { ...initialState}
    }
  })
}

describe('Pruebas en useUiStore', () => {


  test('debe de regresar los valores por defecto', () => {

    const mockStore = getMockStore({ isDateModalOpen: false })

    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }> { children }</Provider>
    });
    expect(result.current).toEqual({
      isDateModalOpen: false,
      closeDateModal: expect.any(Function),
      openDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
    })
  });

  test('openModal debe de colocar true en el isDateModalOpen', () => {

    const mockStore = getMockStore({ isDateModalOpen: false });
    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }> { children } </Provider>
    });

    const { isDateModalOpen, openDateModal } = result.current;

    act( () => {
      openDateModal();
    })

    console.log({ result: result.current, isDateModalOpen})
  });
})