import React, { FC } from 'react'
import Layout, { Content } from 'antd/lib/layout/layout'
import AppRouter from './components/AppRouter'
import Navbar from './components/Navbar'
import 'antd/dist/antd.css'
import './App.css'


const App: FC = () => {
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