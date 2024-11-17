import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { Flex, Spinner } from '@chakra-ui/react';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const {username} = useParams();

  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async() => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();

        if(data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        setUser(data);

        console.log(data);
      } catch (error) {
        console.log(error); 
      } finally {
        setLoading(false);
      }
    };

    getUser();

  },[username, showToast]);

  if(!user && loading){
    return (
      <Flex justifyContent={"center"}>
        <Spinner size='xl' />
      </Flex>
    )
  }

  if(!user && !loading){
    return (
      <Flex justifyContent={"center"}>
        <h1>User not found</h1>
      </Flex>
    )
  }

  if(!user) return null;

  return (
    <>
        <UserHeader user={user}></UserHeader>
        <UserPost likes={1200} comments={481} postImg="/post1.png" postTitle="Let's talk about threads."></UserPost>
        <UserPost likes={1680} comments={345} postImg="/post2.png" postTitle="Nice tutorial."></UserPost>
        <UserPost likes={734} comments={45} postImg="/post3.png" postTitle="I love this guy."></UserPost>
        <UserPost likes={734} comments={45} postTitle="This is my first thread"></UserPost>
    </>
  )
}

export default UserPage