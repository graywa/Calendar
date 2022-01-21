import { Button, Row } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { FC, useEffect, useState } from 'react'
import EventCalendar from '../components/EventCalendar'
import EventForm from '../components/EventForm'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

const Event: FC = () => {
  const [modalVisible, setModalVisible] = useState(false)  
  const {fetchGuests} = useActions()
  const {guests} = useTypedSelector(state => state.eventReducer)

  useEffect(() => {
    console.log('dddd')
    fetchGuests()
  }, [])

  return (
    <div>
      <EventCalendar events={[]} />
      <Row justify='center'>
        <Button onClick={() => setModalVisible(true)}>Add event</Button>
      </Row>
      <Modal
        title='Add event'
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <EventForm guests={guests} />
      </Modal>
    </div>
  )
}

export default Event
