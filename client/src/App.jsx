import React from 'react'
import PostRecord from './components/PostRecord'
import EditRecord from './components/EditRecord'
import Display from './components/Display'
import Root from './components/Root'
import Home from './components/Home'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


function App() {
  const browserRouterObj = createBrowserRouter([{
    path:'',
    element:<Root />,
    children:[
      {
        path: '/',
        element:<Home />,
      },{
        path:'post',
        element:<PostRecord/>
      },{
        path:'display',
        element:<Display/>
      },{
        path:'update',
        element:<EditRecord/>
      }
    ]
}])
  return (
    <div className="w-100">
      <RouterProvider router={browserRouterObj}/>
    </div>
    
  )
}

export default App