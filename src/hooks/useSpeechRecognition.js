import { useState, useEffect } from "react";

let recognition = null;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";
}

const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [listening, setListening] = useState("");

  useEffect(() => {
    if (!recognition) return console.log("Not supported");

    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
      recognition.stop();
      setListening(false);
    };
  }, []);

  const startListening = () => {
    setText("");
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setListening(false);
    recognition.stop();
  };

  return {
    text,
    listening,
    startListening,
    hasRecognitionSupport: !!recognition,
    stopListening,
  };
};

export default useSpeechRecognition;
