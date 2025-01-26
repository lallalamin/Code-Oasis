import React, { useState } from 'react'
import useShowToast from './useShowToast';

const usePreviewImg = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const showToast = useShowToast();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(!file) return;

    if(!allowedTypes.includes(file.type)) {
        showToast("File format not supported", "Please select an image file", "error");
        setImgUrl(null);
        return;
    }
    
    if(file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onloadend = () => {
            setImgUrl(reader.result);
        }
        reader.readAsDataURL(file); // this will take our file that we selected, turn it to base 64 string. take that string and render it in our image.
    }
    else{
        showToast("File format not supported", "Please select an image file", "error");
        setImgUrl(null);
    }
  }
  return { handleImageChange, imgUrl, setImgUrl }
}

export default usePreviewImg