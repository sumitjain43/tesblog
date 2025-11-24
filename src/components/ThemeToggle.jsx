import React from 'react'

function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(() => document.documentElement.classList.contains('dark'))

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    const root = document.documentElement
    if (next) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
  }

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark') {
        document.documentElement.classList.add('dark')
        setIsDark(true)
      }
    } catch {}
  }, [])

  return (
    <button
      onClick={toggle}
      className='px-3 py-2 rounded-full text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
      aria-label='Toggle dark mode'
    >
      {isDark ? 'Light' : 'Dark'}
    </button>
  )
}

export default ThemeToggle


