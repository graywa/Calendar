import { Calendar, Row } from 'antd'
import React, { FC } from 'react'
import { IEvent } from '../store/reducers/eventReducer'

interface EventCalendarProps {
  events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = () => {
  return (
    
    <Calendar />         
    
  )
}

export default EventCalendar
