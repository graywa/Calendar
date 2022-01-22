import { Button, Row } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { FC, useEffect, useState } from 'react'
import EventCalendar from '../components/EventCalendar'
import EventForm from '../components/EventForm'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IEvent } from '../store/reducers/eventReducer'

const Event: FC = () => {
  const [modalVisible, setModalVisible] = useState(false)  
  const {fetchGuests, createEvent, fetchEvents} = useActions()
  const {guests, events} = useTypedSelector(state => state.eventReducer)
  const {user} = useTypedSelector(state => state.authReducer)

  useEffect(() => {
    fetchGuests()
    fetchEvents(user.username)
  }, [])

  const addNewEvent = (event: IEvent) => {
    setModalVisible(false)
    createEvent(event)
  }

  console.log(events)

  return (
    <div>
      <EventCalendar events={events} />
      <Row justify='center'>
        <Button onClick={() => setModalVisible(true)}>Add event</Button>
      </Row>
      <Modal
        title='Add event'
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <EventForm guests={guests} submit={addNewEvent}/>
      </Modal>
    </div>
  )
}

export default Event
