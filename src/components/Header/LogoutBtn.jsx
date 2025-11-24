import React from 'react'
import { motion } from 'framer-motion'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ rotate: [0, 1.5, -1.5, 0], transition: { duration: 0.4 } }}
      className='inline-bock px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
      onClick={logoutHandler}
    >
      Logout
    </motion.button>
  )
}

export default LogoutBtn