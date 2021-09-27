import React from 'react'
import { Route , Switch , Redirect} from 'react-router-dom'
import routeList from './config'
import { isLogined  } from '@/utils/auth'
// import Login from '@/pages/components/login/index'

const Layouts =() => {
    return isLogined()?(
        <Switch>
            
            {
                routeList.map((route) => {
                    return (
                        <Route 
                            component={route.component} 
                            key={route.path} 
                            path={route.path} 
                            exact 
                        />
                    )
                })
            }

        </Switch>
    ):(
        <div>ssss</div>
        // <Redirect to="login" component={Login} />
    )
}
export default Layouts