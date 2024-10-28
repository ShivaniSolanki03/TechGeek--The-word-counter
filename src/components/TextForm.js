import React, { useState } from 'react';

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [wordToReplace, setWordToReplace] = useState("");
  const [replaceWith, setReplaceWith] = useState("");
  const [searchWord, setSearchWord] = useState("");

  // Function to count words
  const countWords = (text) => {
    return text.split(/\s+/).filter((word) => word.length > 0).length;
  };

  // Other text manipulation functions
  const handleUppercase = () => {
    setText(text.toUpperCase());
  };

  const handleLowercase = () => {
    setText(text.toLowerCase());
  };

  const handleClear = () => {
    setText("");
  };

  const handleRemoveExtraSpaces = () => {
    setText(text.split(/\s+/).join(' '));
  };

  const handleCapitalizeFirstLetters = () => {
    const capitalizedText = text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    setText(capitalizedText);
  };

  const handleReverseText = () => {
    setText(text.split('').reverse().join(''));
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  const handleRemoveNumbers = () => {
    setText(text.replace(/[0-9]/g, ''));
  };

  const handleRemovePunctuation = () => {
    setText(text.replace(/[.,#!$%^&*;:{}=\-_`~()]/g, '')); // Fixed unnecessary escapes
  };

  const handleTitleCase = () => {
    const titleCasedText = text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    setText(titleCasedText);
  };

  const handleSpeakUp = () => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };

  const handleFindReplace = () => {
    setText(text.replace(new RegExp(wordToReplace, 'g'), replaceWith));
    setWordToReplace("");
    setReplaceWith("");
  };

  const handleCountWord = () => {
    alert(`The word "${searchWord}" occurs ${text.split(/\s+/).filter(word => word === searchWord).length} times.`);
    setSearchWord("");
  };

  return (
    <div className={`container ${props.mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <h2>{props.heading}</h2>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="6"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            backgroundColor: props.mode === 'dark' ? '#1e1e1e' : '#f0f0f0',
            color: props.mode === 'dark' ? 'white' : 'black'
          }}
        />
      </div>

      <div className="button-group">
        <button className="btn btn-primary my-2 mx-2" onClick={handleUppercase}>Uppercase</button>
        <button className="btn btn-secondary my-2 mx-2" onClick={handleLowercase}>Lowercase</button>
        <button className="btn btn-danger my-2 mx-2" onClick={handleClear}>Clear</button>
        <button className="btn btn-warning my-2 mx-2" onClick={handleRemoveExtraSpaces}>Remove Spaces</button>
        <button className="btn btn-info my-2 mx-2" onClick={handleCapitalizeFirstLetters}>Capitalize Words</button>
        <button className="btn btn-success my-2 mx-2" onClick={handleReverseText}>Reverse Text</button>
        <button className="btn btn-primary my-2 mx-2" onClick={handleCopyText}>Copy</button>
        <button className="btn btn-dark my-2 mx-2" onClick={handleRemoveNumbers}>Remove Numbers</button>
        <button className="btn btn-secondary my-2 mx-2" onClick={handleRemovePunctuation}>Remove Punctuation</button>
        <button className="btn btn-light my-2 mx-2" onClick={handleTitleCase}>Title Case</button>
        <button className="btn btn-info my-2 mx-2" onClick={handleSpeakUp}>Speak Up</button>
      </div>

      <div className="my-3">
        <h3>Find and Replace</h3>
        <input 
          type="text" 
          placeholder="Word to replace" 
          value={wordToReplace}
          onChange={(e) => setWordToReplace(e.target.value)} 
          className="form-control my-2"
        />
        <input 
          type="text" 
          placeholder="Replace with" 
          value={replaceWith}
          onChange={(e) => setReplaceWith(e.target.value)} 
          className="form-control my-2"
        />
        <button className="btn btn-warning" onClick={handleFindReplace}>Find and Replace</button>
      </div>

      <div className="my-3">
        <h3>Count Word</h3>
        <input 
          type="text" 
          placeholder="Word to count" 
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)} 
          className="form-control my-2"
        />
        <button className="btn btn-success" onClick={handleCountWord}>Count Word</button>
      </div>

      <div className="container my-2">
        <h3>Your text summary</h3>
        <p>{countWords(text)} words and {text.length} characters</p>
        <p>{(0.008 * countWords(text)).toFixed(2)} Minutes read</p>
        <h3>Preview</h3>
        <p>{text.length > 0 ? text : "Enter something in the textbox above to preview it here"}</p>
      </div>
    </div>
  );
}
