import { Input, Form, Button} from 'antd'
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { AuthActionCreators } from '../store/reducers/authReducer'
import { rules } from '../utils/rules'

const LoginForm: FC = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const {error, isLoading} = useTypedSelector(state => state.authReducer)

  const submit = () => {
    dispatch(AuthActionCreators.login(username, password))
  }

  return (
    <Form name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"  
          onFinish={submit}        
    >      
      <Form.Item
        label="Username"
        name="username"
        rules={[rules.required('Please input your username')]}        
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"        
        rules={[rules.required('Please input your password!')  ]}
      >
        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Item>      
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
      {error && <div style={{color: 'darkred', textAlign: 'center'}}>{error}</div>}
    </Form>
  )
}

export default LoginForm
