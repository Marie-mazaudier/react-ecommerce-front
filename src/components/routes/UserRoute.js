import React from 'react'
import {Route, Link} from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoadingToRedirect from './LoadingToRedirect'

const UserRoute = ({children, ...rest}) => { // fonction pour protéger certains chemins url
 const {user} = useSelector((state) => ({...state}))
  return user && user.token ? (
  <Route {...rest} /> // soit on retourne les chemins avec contenus enfant
  ):(
  <LoadingToRedirect/> // sinon on retourne le spinner loading
  )
}

export default UserRoute