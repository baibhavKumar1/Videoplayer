import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { VideoCardProps, VideoCard } from "./VideoCard"


const VideoPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [curr, setCurr] = useState<VideoCardProps | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [commentIndex, setCommentIndex] = useState<number | null>(null);
  const [editComment, setEditComment] = useState<string>('');

  const videos: VideoCardProps[] = JSON.parse(localStorage.getItem("videos") || "[]")

  useEffect(() => {
    const selectedVideo: VideoCardProps | undefined = videos?.find(video => video.postId === id);
    setCurr(selectedVideo || null);
    const getLikes = localStorage.getItem(`${id}likes`);
    const getDislikes = localStorage.getItem(`${id}dislikes`);

    setLikes(getLikes ? parseInt(getLikes) : (selectedVideo?.reaction.count || 0));
    setDislikes(getDislikes ? parseInt(getDislikes) : 0);
    setDislikes(parseInt(localStorage.getItem(`${id}dislikes`) || '0'));
    setIsLiked(localStorage.getItem(`isLiked${id}`) === 'true');
    setIsDisliked(localStorage.getItem(`isDisliked${id}`) === 'true');

    const getComments = localStorage.getItem(`${id}comments`);
    if (getComments) {
      setComments(JSON.parse(getComments));
    }
  }, [id])

  const handleLike = () => {
    if (isLiked) {
      setLikes(prevCount => prevCount - 1);
      setIsLiked(false);
      localStorage.setItem(`${id}likes`, (likes - 1).toString());
      localStorage.setItem(`isLiked${id}`, 'false');
    }
    else {
      if (isDisliked) {
        setDislikes(prevCount => prevCount - 1);
        setIsDisliked(false);
        localStorage.setItem(`${id}dislikes`, (dislikes - 1).toString());
        localStorage.setItem(`isDisliked${id}`, 'false');
      }
      setLikes(prevCount => prevCount + 1);
      setIsLiked(true);
      localStorage.setItem(`likes_${id}`, (likes + 1).toString());
      localStorage.setItem(`isLiked${id}`, 'true');
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setDislikes(prevCount => prevCount - 1);
      setIsDisliked(false);
      localStorage.setItem(`${id}dislikes`, (dislikes - 1).toString());
      localStorage.setItem(`isDisliked${id}`, 'false');
    } else {
      if (isLiked) {
        setLikes(prevCount => prevCount - 1);
        setIsLiked(false);
        localStorage.setItem(`${id}likes`, (likes - 1).toString());
        localStorage.setItem(`isLiked${id}`, 'false');
      }
      setDislikes(prevCount => prevCount + 1);
      setIsDisliked(true);
      localStorage.setItem(`${id}dislikes`, (dislikes + 1).toString());
      localStorage.setItem(`isDisliked${id}`, 'true');
    }
  };


  const handleAdd = () => {
    if (newComment.trim() !== '') {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      localStorage.setItem(`${id}comments`, JSON.stringify(updatedComments));
      setNewComment('');
    }
  };

  const handleEdit = (index: number) => {
    setCommentIndex(index);
    setEditComment(comments[index]);
  };

  const handleSaveEdit = (index: number) => {
    const updatedComments = [...comments];
    updatedComments[index] = editComment;
    setComments(updatedComments);
    localStorage.setItem(`${id}comments`, JSON.stringify(updatedComments));
    setCommentIndex(null);
    setEditComment('');
  };

  const handleDelete = (index: number) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    localStorage.setItem(`${id}comments`, JSON.stringify(updatedComments));
  };

  const handleCancel = () => {
    setCommentIndex(null);
    setEditComment("");
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 px-6 mt-5">
      <div className="md:w-[70%] sm:w-[100%]">
        <div className="h-[75vh]">
          {curr && (
            <video
              src={curr?.submission?.mediaUrl}
              className="w-full h-full"
              loop
              controls
            >
            </video>
          )}
        </div>

        <div className="flex justify-between px-5">
          <div className="mt-2 flex items-center gap-4">
            <img src={curr?.creator.pic} alt="" className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-white text-start font-medium text-lg">
                {curr?.creator.name ? curr?.creator.name : "Random Creator"}
              </p>
              <p className='text-red-400'>@{curr?.creator.handle}</p>
            </div>
          </div>

          <div className="flex gap-1 items-center">
            <button className="text-white" onClick={handleLike} >Like</button>
            <p className="text-white mx-1">{likes}</p>
            <button className="text-white" onClick={handleDislike} >Dislike</button>
            <p className="text-white mx-1">{dislikes}</p>
          </div>
        </div>

        <div className="px-5 mt-5">
          <h1 className='text-white text-xl font-medium'>Description</h1>
          <p className='text-white/60'>
            {curr?.submission.description}
          </p>
        </div>

        <div className='my-2 flex flex-col gap-5 px-5'>
          <h1 className='font-medium text-white md:text-lg'>
            {comments ? comments.length : 0} Comments
          </h1>
          <textarea
            placeholder="Add a comment..." className="w-full border-b h-10 text-white bg-black outline-none " value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          {
            newComment && (<div className='flex justify-end text-white gap-2'>
              <button className='hover:bg-white/30 hover:rounded px-1' onClick={()=>setNewComment("")}>Cancel</button>
              <button className='hover:bg-white/30 hover:rounded px-1' onClick={handleAdd}>Comment</button>
            </div>)
          }

          <div className="text-white">
            {comments.map((comment, index) => (
              <div key={index} className="flex justify-between">
                {index === commentIndex ? (
                  <textarea className="w-[85%] border-b h-8 text-white outline-none" value={editComment} onChange={(e) => setEditComment(e.target.value)} />
                ) : (
                  <h2>{comment}</h2>
                )}
                <div className='flex gap-2'>
                  {index === commentIndex ? (
                    <div className='flex gap-2'>
                      <button onClick={() => handleSaveEdit(index)}>Save</button>
                      <button onClick={() => handleCancel()}>Cancel</button>
                    </div>

                  ) : (
                    <div className='flex gap-2'>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" m-auto h-[900px] overflow-auto flex-1">
        <div className="flex flex-col gap-4">
          {
            videos?.map((item: VideoCardProps) => {
              return <VideoCard key={item.postId} {...item} />
            })
          }
        </div>
      </div>
    </div >
  )
}

export default VideoPlayer