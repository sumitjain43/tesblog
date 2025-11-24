import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo, TiltCard} from './index.js'
import { motion } from 'framer-motion'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <TiltCard className='mx-auto w-full max-w-lg'>
          <div className='bg-white dark:bg-gray-950 rounded-2xl p-10 border border-gray-200 dark:border-gray-800 shadow-xl'>
            <div className="mb-4 flex justify-center">
              <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
              </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-300">
              Already have an account?&nbsp;
              <Link to="/login" className="font-medium text-blue-600 hover:underline">Sign In</Link>
            </p>
            {error && <p className="text-red-500 mt-6 text-center">{error}</p>}

            <form onSubmit={handleSubmit(create)} className='mt-8' noValidate>
              <div className='space-y-5'>
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  {...register("name", { required: true })}
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                  })}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
                <Button type="submit" className="w-full">Create Account</Button>
              </div>
            </form>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  )
}

export default Signup