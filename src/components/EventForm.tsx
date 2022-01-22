import { Button, DatePicker, Form, Input, Row, Select} from 'antd'
import { Moment } from 'moment'
import React, { FC, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IUser } from '../store/reducers/authReducer'
import { IEvent } from '../store/reducers/eventReducer'
import { formatDate } from '../utils/date'
import { rules } from '../utils/rules'

interface EventFormProps {
  guests: IUser[]
  submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = ({guests, submit}) => {

  const {user} = useTypedSelector(state => state.authReducer)
  const [event, setEvent] = useState<IEvent>({
    author: '',
    date: '',
    description: '',
    guest: ''
  } as IEvent)

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({...event, date: formatDate(date.toDate())})
    }
  }

  const submitForm = () => {
    submit({...event, author: user.username})
  }
  
  return (
    <Form onFinish={submitForm}>      
      <Form.Item
        label="Description"
        name="description"
        rules={[rules.required()]}        
      >
        <Input value={event.description} 
                onChange={(e) => setEvent({...event, description: e.target.value})}/>
      </Form.Item>

      <Form.Item
        label="Guests"
        name="guests"
        rules={[rules.required()]}        
      >
        <Select onChange={(guest) => setEvent({...event, guest})}>
          {guests.map((guest, ind) => {
            return <Select.Option value={guest.username} key={ind}>{guest.username}</Select.Option>
          })}
        </Select>
      </Form.Item>

      <Row justify='space-between'>
        <Form.Item
          label="Date"
          name="date"
          rules={[rules.required(), rules.isDateAfter('you can\'t create an event in the past')]}      
        >
          <DatePicker onChange={(date) => selectDate(date)}/>
        </Form.Item>   
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>        
      </Row>       

    </Form>
  ) 
}

export default EventForm
