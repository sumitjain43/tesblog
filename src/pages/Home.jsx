import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard, PostCardSkeleton} from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        }).finally(() => setLoading(false))
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-24 text-center">
                <Container>
                    <div className="max-w-xl mx-auto">
                        <h1 className="text-3xl font-extrabold tracking-tight mb-3">Welcome to MegaBlog</h1>
                        <p className="text-gray-600">Sign in to explore posts from the community or add your own.</p>
                    </div>
                </Container>
            </div>
        )
    }
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

export default Home