import React, { FC } from 'react'
import { Header } from 'antd/lib/layout/layout'
import { Menu, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { RouteNames } from '../router/router'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'

const Navbar: FC = () => {
  const navigate = useNavigate()
  const {isAuth, user} = useTypedSelector(state => state.authReducer)  
  const {logout} = useActions()

  return (
    <Header>
      <Row justify='end'>
        {isAuth
        ?
          <>
            <div style={{color: 'white'}}>{user.username}</div>
            <Menu theme='dark' mode='horizontal' selectable={false}>            
              <Menu.Item onClick={() => logout()} key={1}>
                Logout
              </Menu.Item>
            </Menu>
          </>          
        :      
          <Menu theme='dark' mode='horizontal' selectable={false}>            
            <Menu.Item onClick={() => navigate(RouteNames.LOGIN)} key={6}>
              <span>Logiiiiin</span>
            </Menu.Item>
          </Menu>
        }
      </Row>
    </Header>
  )
}

export default Navbar
