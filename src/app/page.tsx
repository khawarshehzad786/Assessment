import { CalendarApp } from '@/components/calendar-app'
import { CalendarProvider } from '@/context/calendar-context'
import React from 'react'



const Home = () => {
  return (
    <CalendarProvider>
      <CalendarApp/>
    </CalendarProvider>
  )
}

export default Home