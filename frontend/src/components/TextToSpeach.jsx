// import React, { useState, useEffect } from 'react';
// import { MdSportsGolf } from 'react-icons/md';

// const TextToSpeech = () => {
//   const [text, setText] = useState('random dog shit');

//   const handleSpeak = (message) => {
//     const utterance = new SpeechSynthesisUtterance(message);
//     console.log(message);
//     window.speechSynthesis.speak(utterance);
//   };


//   const handleClick = () => {
//     handleSpeak(text);
//   };
  
//   return (
//     <div>
//       <button onClick={handleClick}>Test Speech</button>
//     </div>
//   );
  
// };

// export default TextToSpeech;



// import React, { useState, useEffect } from 'react';

// const TextToSpeech = () => {
//   const [text, setText] = useState('');

//   // Function to convert text to speech
//   const handleSpeak = (message) => {
//     console.log("Speaking:", message); // Debugging log
//     const utterance = new SpeechSynthesisUtterance(message);
//     window.speechSynthesis.speak(utterance);
//   };

//   useEffect(() => {
//     // Create WebSocket connection to server
//     const ws = new WebSocket('ws://localhost:8080');

//     // When connection is established
//     ws.onopen = () => {
//       console.log('Connected to WebSocket server');
//     };

//     // When message is received from WebSocket server
//     ws.onmessage = (event) => {
//       const message = event.data;
//       setText(message);
//       console.log("Received message:", message);
//       handleSpeak(message); // Speak the received message
//     };

//     // Handle errors
//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     // Handle WebSocket close
//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     // Cleanup WebSocket connection on unmount
//     return () => {
//       ws.close();
//     };
//   }, []);

//   return (
//     <div>
//       <p>{text}</p>
//     </div>
//   );
// };

// export default TextToSpeech;



import React, { useState, useEffect } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [isReady, setIsReady] = useState(false);

  // Function to convert text to speech
  const handleSpeak = (message) => {
    if (!message) {
      console.error('Message is empty, cannot speak.');
      return;
    }

    console.log("Preparing to speak:", message);

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => console.log("Speech started");
    utterance.onend = () => console.log("Speech finished");
    utterance.onerror = (e) => console.error("Speech synthesis error:", e);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('SpeechSynthesis API is unavailable');
    }
  };

  const startListening = () => {
    setIsReady(true);
  };

  useEffect(() => {
    if (!isReady) return;

    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const message = event.data;
      setText(message);
      console.log("Received message:", message);
      handleSpeak(message);  // Speak the received message
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [isReady]);

  return (
    <div>
      <button onClick={startListening}>Start Listening</button>
      <p>{text}</p>
    </div>
  );
};

export default TextToSpeech;
