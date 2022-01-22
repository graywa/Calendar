import { Calendar} from 'antd'
import { Moment } from 'moment'
import React, { FC } from 'react'
import { IEvent } from '../store/reducers/eventReducer'
import { formatDate } from '../utils/date'

interface EventCalendarProps {
  events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = ({events}) => {

  function dateCellRender(value: Moment) {
    const formatedDate = formatDate(value.toDate())
    const currentDayEvents = events.filter( event => event.date === formatedDate)
    return (
      <div>
        {currentDayEvents.map((event, index) => {
          return <div key={index}>{event.description}</div>
        })}
      </div>
    )
  }

  return (    
    <Calendar dateCellRender={dateCellRender} />       
  )
}

export default EventCalendar
