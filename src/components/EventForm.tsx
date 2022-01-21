import { Button, DatePicker, Form, Input, Row, Select} from 'antd'
import React, { FC, useState } from 'react'
import { IUser } from '../store/reducers/authReducer'
import { IEvent } from '../store/reducers/eventReducer'
import { rules } from '../utils/rules'

interface EventFormProps {
  guests: IUser[]
}

const EventForm: FC<EventFormProps> = ({guests}) => {

  const [guest, setGuest] = useState({})
  const [event, setEvent] = useState<IEvent>({
    author: '',
    date: '',
    description: '',
    guest: ''
  } as IEvent)
  
  return (
    <Form >      
      <Form.Item
        label="Description"
        name="description"
        rules={[rules.required()]}        
      >
        <Input />
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
          rules={[rules.required()]}      
        >
          <DatePicker />
        </Form.Item>   
        <Form.Item>
          <Button type="primary">
            Add
          </Button>
        </Form.Item>        
      </Row>       

    </Form>
  ) 
}

export default EventForm
