import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
  return (
    <>
        <UserHeader></UserHeader>
        <UserPost likes={1200} comments={481} postImg="/post1.png" postTitle="Let's talk about threads."></UserPost>
        <UserPost likes={1680} comments={345} postImg="/post2.png" postTitle="Let's talk about threads."></UserPost>
        <UserPost likes={734} comments={45} postImg="/post3.png" postTitle="Let's talk about threads."></UserPost>
    </>
  )
}

export default UserPage