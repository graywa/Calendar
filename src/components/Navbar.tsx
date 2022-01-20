import React, { FC } from 'react'
import { Header } from 'antd/lib/layout/layout'
import { Menu, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { RouteNames } from '../router/router'
import { useTypedSelector } from '../hooks/useTypedSelector'

const Navbar: FC = () => {
  const navigate = useNavigate()
  const {isAuth} = useTypedSelector(state => state.authReducer)  

  return (
    <Header>
      <Row justify='end'>
        {isAuth
        ?
          <>
            <div style={{color: 'white'}}>Graywa</div>
            <Menu theme='dark' mode='horizontal' selectable={false}>            
              <Menu.Item onClick={() => console.log('logout')} key={1}>
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
