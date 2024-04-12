import { useNavigate } from "react-router-dom";

export interface VideoCardProps {
    submission: {
        mediaUrl: string;
        title: string;
        thumbnail: string;
        description: string
    };
    creator: {
        pic: string;
        name: string;
        handle: string
    };
    reaction: {
        count: number;
    };
    postId: string;
    currentPage: number;
}

export const VideoCard: React.FC<VideoCardProps> = ({ postId, creator, submission }) => {
    const navigate = useNavigate();
    return (
        <div className="cursor-pointer">
            <div className="relative overflow-hidden rounded h-60" onClick={() => navigate(`/video/${postId}`)} >
                <img src={submission.thumbnail} alt="img" className="w-full h-full object-cover rounded" />
            </div>
            <div className="mt-2 flex items-center gap-5" onClick={() => navigate(`/video/${postId}`)} >
                <img src={creator.pic} alt="img" className="w-10 h-10 rounded-full" />
                <div>
                    <p className="dark:text-white text-left font-medium text-lg">
                        {submission?.title}
                    </p>
                    <p className="dark:text-red-300 text-red-700 font-medium">@{creator?.name ? creator?.name : "Random Creator"}</p>
                </div>
            </div>
        </div>
    )
}

