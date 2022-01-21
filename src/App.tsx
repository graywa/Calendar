import React, { FC, useEffect } from 'react'
import Layout, { Content } from 'antd/lib/layout/layout'
import AppRouter from './components/AppRouter'
import Navbar from './components/Navbar'
import 'antd/dist/antd.css'
import './App.css'
import { useActions } from './hooks/useActions'
import { IUser } from './store/reducers/authReducer'

const App: FC = () => {

  const {setAuth, setUser} = useActions()

  useEffect(() => {
    if(localStorage.getItem('auth')) {
      setUser({username: localStorage.getItem('user') || ''} as IUser)
      setAuth(true)
    }
  }, [])  

  return ( 
    <div>  
      <Layout>        
        <Navbar />    
        <Content>
          <AppRouter />
        </Content>
      </Layout>     
    </div> 
  )
}

export default App