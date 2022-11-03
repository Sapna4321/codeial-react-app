// import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import styles from '../styles/home.module.css';
import {Loader, Comment, FriendsList, CreatePost, Post} from '../components';
import {getPosts} from '../api';
import  {Link} from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';


const Home = () => {
  const auth = useAuth();
  const posts  = usePosts(); 

  
  if(posts.loading){
    return <Loader/>;
  }

  return (
    <div className={styles.Home}>
    <div className={styles.postsList}>
      <CreatePost />
      {posts.data.map((post) => (
        <Post post = {post} key = {`post-${post._id}`} />
      ))}
    </div>
    {auth.user && <FriendsList/>}
    </div>
  );
};

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default Home;
