import React from 'react'

function PostCardSkeleton() {
  return (
    <div className='w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm'>
      <div className='aspect-[3/2] bg-gray-100 dark:bg-gray-900 shimmer' />
      <div className='p-4'>
        <div className='h-4 bg-gray-100 dark:bg-gray-900 rounded w-3/4 shimmer mb-2' />
        <div className='h-4 bg-gray-100 dark:bg-gray-900 rounded w-1/2 shimmer' />
      </div>
    </div>
  )
}

export default PostCardSkeleton


