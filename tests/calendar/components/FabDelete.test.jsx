import { render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from './../../../src/hooks/useCalendarStore';

jest.mock('./../../../src/hooks/useCalendarStore');

describe('Pruebas en FabDelete', () => {


test('debe de mostrar el componenete correctamente', () => {

  useCalendarStore.mockReturnValue({
    hasEventSelected: false
  });

  render(<FabDelete />);

  const btn = screen.getByLabelText('btn-delete')

  expect(btn.classList).toContain('btn');
  expect(btn.classList).toContain('btn-danger');
  expect(btn.classList).toContain('btn-danger');
  expect(btn.style.display).toBe('none');

});

test('', () => {

});
})