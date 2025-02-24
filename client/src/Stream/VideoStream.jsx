import React, { useRef, useEffect, useState } from 'react';
import Picker from 'emoji-picker-react';
import './stream.css';
import Navbar from '../Layout/Navbar';

<Navbar />
const CommentInput = ({ comment, onCommentChange, onSend, onKeyPress, onEmojiClick }) => {
  return (
    <div className="comment-input-container">
      <textarea
        placeholder="Send a message..."
        value={comment}
        onChange={onCommentChange}
        onKeyDown={onKeyPress}
      />
      <button className="emoji-button" onClick={onEmojiClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-smile"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      </button>
      <button className="send-button" onClick={onSend}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-send"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
  );
};

const CommentsList = ({ comments }) => {
  const commentsDivRef = useRef(null);

  useEffect(() => {
    if (commentsDivRef.current) {
      commentsDivRef.current.scrollTop = commentsDivRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <div ref={commentsDivRef} id="comments-div" className="comments-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          {comment.text}
        </div>
      ))}
    </div>
  );
};

const VideoStream = () => {
  const videoRef = useRef(null);
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const startStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Error accessing media devices.', err);
        alert('Permission denied. Please allow access to camera and microphone.');
      }
    };

    startStream();
  }, []);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSend = () => {
    if (comment.trim() !== '') {
      const newComment = { id: Date.now(), text: comment };
      setCommentsList([...commentsList, newComment]);
      setComment('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

  const onEmojiClick = (emojiObject) => {
    setComment((prevComment) => prevComment + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="stream-container">
      <div className="video-container">
        <video ref={videoRef} autoPlay className="stream-iframe" />
        <div className="video-controls">
          <button onClick={toggleMute} className="control-button">
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
          <button onClick={toggleFullScreen} className="control-button">
            {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
          </button>
        </div>
      </div>
      <div className="comments-section">
        <CommentsList comments={commentsList} />
        <CommentInput
          comment={comment}
          onCommentChange={handleCommentChange}
          onSend={handleSend}
          onKeyPress={handleKeyPress}
          onEmojiClick={toggleEmojiPicker}
        />
        {showEmojiPicker && <Picker onEmojiClick={onEmojiClick} />}
      </div>
    </div>
  );
};

export default VideoStream;