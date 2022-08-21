import { useSelector, useDispatch } from "react-redux";
import { calendarApi } from './../api';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = ( calendarEvent ) => {
    dispatch(onSetActiveEvent( calendarEvent ))
  }

  const startSavingEvent = async( calendarEvent ) => {
    //TODO: Update event

    //Todo bien
    if( calendarEvent._id) {
      //Actualizando
      dispatch(onUpdateEvent( { ...calendarEvent }) );
    } else {
      //Creando
      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
    }
  }

  const startDeletingEvent = () => {
    //Todo: Llegar al backend

    dispatch(onDeleteEvent());
  }

  const startLoadingEvents = async() => {
    try {
      //*Llegar al backend
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents( data.eventos);
      console.log(events);

    } catch (error) {
      console.log('Error cargando eventos')
    }
  }


  return {
    //*Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //*Métodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
