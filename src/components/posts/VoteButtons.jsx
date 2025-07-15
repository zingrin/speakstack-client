import { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const VoteButtons = ({ 
  postId, 
  initialUpvotes = 0, 
  initialDownvotes = 0, 
  compact = false 
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState(null);

  const handleVote = (type) => {
    if (type === 'up') {
      if (userVote === 'up') {
        setUpvotes(upvotes - 1);
        setUserVote(null);
      } else {
        setUpvotes(upvotes + 1);
        if (userVote === 'down') setDownvotes(downvotes - 1);
        setUserVote('up');
      }
    } else {
      if (userVote === 'down') {
        setDownvotes(downvotes - 1);
        setUserVote(null);
      } else {
        setDownvotes(downvotes + 1);
        if (userVote === 'up') setUpvotes(upvotes - 1);
        setUserVote('down');
      }
    }
  };

  return (
    <div className={`flex items-center ${compact ? 'gap-1' : 'gap-2'}`}>
      <button
        onClick={() => handleVote('up')}
        className={`btn btn-xs btn-ghost ${userVote === 'up' ? 'text-green-500' : ''}`}
        aria-label="Upvote"
      >
        <FaThumbsUp className={compact ? 'text-sm' : ''} />
        {!compact && <span>{upvotes}</span>}
      </button>
      
      <span className={`${compact ? 'text-xs' : 'text-sm'}`}>
        {upvotes - downvotes}
      </span>
      
      <button
        onClick={() => handleVote('down')}
        className={`btn btn-xs btn-ghost ${userVote === 'down' ? 'text-red-500' : ''}`}
        aria-label="Downvote"
      >
        <FaThumbsDown className={compact ? 'text-sm' : ''} />
        {!compact && <span>{downvotes}</span>}
      </button>
    </div>
  );
};

export default VoteButtons;