import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Write = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState(''); // 메시지 상태 추가
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/board/insert', {
                title,
                content,
            }, { withCredentials: true });

            setMessage('글이 성공적으로 작성되었습니다.'); // 성공 메시지 설정

            setTimeout(() => {
                navigate('/forum'); // 1초 후 게시글 리스트로 리다이렉트
            }, 1000);
        } catch (error) {
            console.error('Error submitting post:', error);
            setMessage('글 작성에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <div>
            <h1>글쓰기</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>내용:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <button type="submit">작성</button>
            </form>
            {message && <p>{message}</p>} {/* 메시지를 화면에 표시 */}
        </div>
    );
};

export default Write;
