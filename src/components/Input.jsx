import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1 text-sm text-gray-600 dark:text-gray-300' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white dark:bg-gray-950 text-black dark:text-white outline-none focus:bg-gray-50 dark:focus:bg-gray-900 duration-200 border border-gray-200 dark:border-gray-800 w-full shadow-sm focus:shadow-md focus:ring-2 focus:ring-blue-400/40 ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input