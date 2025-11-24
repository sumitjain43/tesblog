import React, {useState, useEffect} from 'react'
import { Container, PostCard, PostCardSkeleton } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        }).finally(() => setLoading(false))
    }, [])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {loading && Array.from({length: 8}).map((_, i) => <PostCardSkeleton key={i} />)}
                {!loading && posts.map((post) => (
                    <PostCard key={post.$id} {...post} />
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts