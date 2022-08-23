

export const events = [
  {
    id: '1',
    start: new Date('2022-10-21 13:00:00'),
    end: new Date('2022-10-21 15:00:00'),
    title: 'Cumpleaños de Sebas',
    notes: 'Alguna nota'
  },
  {
    id: '2',
    start: new Date('2022-11-21 13:00:00'),
    end: new Date('2022-11-21 15:00:00'),
    title: 'Cumpleaños de Ana',
    notes: 'Alguna nota de Ana'
  }
]

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null
}

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events ],
  activeEvent: null
}

export const calendarWithActiveEventsState = {
  isLoadingEvents: false,
  events: [...events ],
  activeEvent: { ...events[0]}
}