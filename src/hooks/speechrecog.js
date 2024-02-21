import { useEffect, useState, useCallback, useRef } from "react";

let recognition = null;

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = true;
//   recognition.lang = "en-US";
recognition.lang = "fr-FR"
} else {
  console.error("Web Speech API is not supported in this browser.");
}

const Userecog = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const processingResultRef = useRef(false);

  const processResult = useCallback(
    (result) => {
      if (!processingResultRef.current) {
        processingResultRef.current = true;
        setText((prevText) => prevText + ' ' + result.trim());
        processingResultRef.current = false;
      }
    },
    []
  );

  useEffect(() => {
    if (!recognition) return;

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event);
      recognition.stop();
      setIsListening(false);
      processingResultRef.current = false;
    };

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1][0].transcript;
      console.log("onresult event", result);
      processResult(result);
    };

    recognition.onstart = () => {
      console.log("Recognition started");
      setText("");
      processingResultRef.current = false;
    };
  }, [processResult]);

  useEffect(() => {
    if (isListening) {
      console.log("Starting recognition");
      try {
        recognition.start();
      } catch (error) {
        console.error("Error starting recognition:", error);
        setIsListening(false);
      }
    } else {
      console.log("Stopping recognition");
      recognition.stop();
    }
  }, [isListening]);

  const startRecognition = () => {
    setIsListening(true);
  };

  const stopRecognition = () => {
    setIsListening(false);
  };

  return {
    text,
    isListening,
    startRecognition,
    stopRecognition,
    hasRecognitionSupport: !!recognition,
  };
};

export default Userecog;
