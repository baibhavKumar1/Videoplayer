import React, { useEffect, useState } from 'react'
import { getVideos } from '../redux/action'
import { useDispatch, useSelector } from 'react-redux'
import { VideoCard, VideoCardProps } from './VideoCard'
import { Initial } from '../redux/reducer'
import { RootDispatch } from '../redux/store'

const Home: React.FC = () => {
    const [curr, setCurr] = useState<number>(0);

    const { videos, isLoading } = useSelector((state: Initial) => state)

    const dispatch : RootDispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideos(curr))
    }, [curr])

    return (
        <div>
            <div className="w-[94vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 dark:bg-black m-auto mt-[20px]">
                {isLoading ? <p>Loading...</p> : 
                    videos?.map((item: VideoCardProps) => {
                        return <VideoCard key={item.postId} {...item} />
                    })
                }
            </div>
            <div className="flex justify-center mt-10 gap-5">
                <button onClick={() => { if (curr > 0) { setCurr((prev) => prev - 1)} }}
                    disabled={curr === 0}
                    className={`${curr === 0? "disabled":""} py-2 px-5 rounded bg-black dark:bg-white/20 text-white `}>
                    Previous
                </button>
                <p className="text-white mx-1 font-medium py-2 px-4 bg-black dark:bg-white/20 rounded-full">{curr + 1}</p>
                <button
                    onClick={() => {
                        setCurr((prev) => prev + 1)}}
                    className={`${curr === 9? "disabled":""} py-2 px-5 rounded bg-black dark:bg-white/20 text-white`}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Home