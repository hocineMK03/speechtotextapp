import React from 'react';
import Userecog from '../hooks/speechrecog';
import './styles/home.css';

const Home = () => {
  const {
    text,
    isListening,
    startRecognition,
    stopRecognition,
    hasRecognitionSupport
  } = Userecog();

  const handleSave = () => {
    if(text){
      const blob = new Blob([text], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'saved_text.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
   
  };

  return (
    <div className='form'>
      <div className='form--input'>
        {hasRecognitionSupport ? (
          <>
            <div>
              {isListening && (
                <button id='id2' onClick={stopRecognition}>
                  Click to stop
                </button>
              )}
              {!isListening && (
                <button id='id1' onClick={startRecognition}>
                  Click to start
                </button>
              )}
            </div>
          </>
        ) : (
          <h1>Speech recognition is not supported in this browser.</h1>
        )}
      </div>
      <div className='form --output'>{isListening && <p>{text}</p>}</div>
      <div className='form--save'>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default Home;
