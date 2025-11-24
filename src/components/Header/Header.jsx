import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import ThemeToggle from '../ThemeToggle'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='sticky top-0 z-40 backdrop-blur bg-gradient-to-r from-white/80 via-white/70 to-white/80 dark:from-gray-900/70 dark:via-gray-900/60 dark:to-gray-900/70 border-b border-gray-200 dark:border-gray-800 transition-colors'>
      <Container>
        <nav className='flex items-center h-16'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto items-center gap-2'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className='inline-bock px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}
export default Header