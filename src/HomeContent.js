import styled from 'styled-components'
import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import "./global.css";
import AddPost from "./components/add-post";
import Post from "./components/post";


const Container = styled.div`
  .header {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .create-tweet-top {
    border-bottom: 1px solid #333;
  }

  .new-tweets-info {
    border-bottom: 1px solid #333;
    padding: 20px;
    text-align: center;
    color: var(--theme-color);
    display: block;
    width: 100%;
    font-size: 16px;

    &:hover {
      background: #111;
    }
  }
`

export default function HomeContent() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      setUser(window.accountId);
    }

    window.contract.showAllPosts().then((posts) => {
      console.log("posts", posts);
      setPosts(posts.reverse());
    });
  }, []);

  const _updatePosts = (post) => {
    const findIndex = posts.findIndex((el) => post.id === el.id);
    if (findIndex !== -1) {
      const tmpPosts = [...posts];
      tmpPosts[findIndex] = post;
      setPosts(tmpPosts);
    }
  };

  return (
    <>
      <div className="body">
        {user && <AddPost setPost={setPosts} user={user} />}
        {posts.length === 0 && (
          <div className="not-found">
            <span className="material-icons">travel_explore</span>
            <span>No Posts Yet</span>
          </div>
        )}
        {posts.map((post) => (
          <Post
            key={post.id}
            data={post}
            user={user}
            _updatePosts={_updatePosts}
          />
        ))}
        <span className="footer">LOTUSTAR.NEAR©2021</span>
      </div>
    </>
  );
}