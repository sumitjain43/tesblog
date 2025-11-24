import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion'

function PostCard({$id, title, tittle, featuredImage}) {
  const displayTitle = title || tittle || "";
    
  return (
    <Link to={`/post/${$id}`}>
        <motion.div
          className='w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow'
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3 }}
        >
            <div className='w-full justify-center mb-3 aspect-[3/2] overflow-hidden'>
                <img 
                  src={appwriteService.getFilePreview(featuredImage, 600, 400)} 
                  alt={displayTitle}
                  className='w-full h-full object-cover'
                  loading='lazy'
                  onError={(e) => {
                    const viewUrl = appwriteService.getFileView(featuredImage)
                    if (e.currentTarget.src !== viewUrl) {
                      e.currentTarget.src = viewUrl
                    }
                  }}
                />

            </div>
            <div className='px-4 pb-4'>
              <h2 className='text-lg font-semibold tracking-tight'>{displayTitle}</h2>
            </div>
        </motion.div>
    </Link>
  )
}



export default PostCard