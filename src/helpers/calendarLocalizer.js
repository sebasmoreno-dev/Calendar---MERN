import { format, parse, startOfWeek, getDay } from 'date-fns';
import enEs from 'date-fns/locale/es'
import { dateFnsLocalizer } from 'react-big-calendar';

const locales = {
  'es': enEs,
}

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})