import React, { useEffect, useState } from 'react'
import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'prismjs';
import Editor from 'react-simple-code-editor'
import axios from 'axios';

const CodeInput = () => {
   const [code, setCode] = useState (`
    function helloWorld() {
        console.log("Hello, world!");
        return true;
    }
    `) 

    const [review, setReview] = useState("")
  const URL = import.meta.env.VITE_BACKED_URL;


    useEffect( () => {
    Prism.highlightAll();
  })

  const handleReviewBtn = async() => {
    console.log("Review button clicked");
    const {data} = await axios.post(`${URL}/ai/getResponse`, { code }); 
    // console.log(data);
    setReview(data);
  }
   
  return (
    <div className='w-100% h-screen md:w-1/2 md:h-140  bg-blue-300 rounded-2xl'>
        <div>
     <Editor
     value={code}
        onValueChange={code => setCode(code)}
        highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
        padding={0}
        className="w-full h-screen  font-mono text-sm  bg-gray-900 text-white  outline-none rounded-sm"
      />

        </div>
       
      <button onClick={handleReviewBtn} className='absolute bottom-4 md:bottom-15 ml-50 md:right-4/7 w-30 h-8 bg-blue-500 rounded-2xl hover:cursor-pointer'> Review </button>
    </div>
  )
}

export default CodeInput
