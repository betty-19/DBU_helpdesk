import React, { useState, useRef } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios'

const User = () => {
  const [message, setMessage] = useState('');
  const textRef = useRef(null);
  const [titleError, setTitleError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [bothError, setBothError] = useState('');
  const [bothValid , setBothValid] = useState('');
  const [category, setCategory] = useState(''); 
  
  const handleFormatting = (command, value) => {
    // Check if there is selected text
    const selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      // Execute the specified command with the value
      document.execCommand(command, false, value);
    }
  };

  const handleIncreaseFontSize = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      for (let i = 0; i < selection.rangeCount; i++) {
        const range = selection.getRangeAt(i);
        const span = document.createElement('span');
        span.style.fontSize = 'larger';
        range.surroundContents(span);
      }
    }
  };
  

  const handleDecreaseFontSize = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.fontSize = 'smaller';
      range.surroundContents(span);
    }
  };
  const handleSubmit = () => {
    // Reset any previous error messages
    setTitleError('');
    setCategoryError('');
  
    // Get the values from the form inputs
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
  
    // Perform validation
    let isValid = true;
    if(title.trim() === '' && category === ''){
      setBothError('Please fill category and title')
      isValid = false;
 }
    if (title.trim() === '') {
      setTitleError('Title is required');
      isValid = false;
    }
  
    if (category === '') {
      setCategoryError('Category is required');
      isValid = false;
    }
    
  
    if (isValid) {
      // Submit the form or perform further actions
      // ...
      // Example: Submit the form using axios
      axios.post('http://localhost:5002/ticket',
      { title,
        chat: message,
        category
         })
         .then((response) => {
          if (response && response.data) {
            console.log('Ticket created successfully', response.data);
            setBothValid('Ticket created successfully');
            document.getElementById('title').value = ''; // Reset the title field
            textRef.current.innerHTML = ''; // Reset the message field
          setCategory(''); // Reset the category field
          // Reset form fields or perform any other necessary actions
            // Reset form fields or perform any other necessary actions
            // Reset form fields or perform any other necessary actions
          }
        })
        .catch((error) => {
          console.error('Ticket creation failed:', error);
          // Handle the error or display an error message
        });
    }
  };
  

  return (
    <div className="user-page">
      {/* Header */}
      <header className="bg-dark">
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div>
            <h1 className="text-light">DBU HelpDesk</h1>
          </div>
          <div>
            <Link to="/" className="text-light mx-2">Create Ticket</Link>
            <Link to="/faq" className="text-light mx-2">FAQ</Link>
            <Link to="/tickets" className="text-light mx-2">Tickets</Link>
            <Link to="/logout" className="text-light mx-2">Log out</Link>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="main-content">
        <div className="container">
          <h2>Welcome to the User Page</h2>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" />
            {titleError && <div className="error">{titleError}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select className="form-select" id="category" value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option>Select a category</option>
              <option>Category 1</option>
              <option>Category 2</option>
              <option>Category 3</option>
              {/* Add options dynamically from department table */}
            </select>
            {categoryError && <div className="error">{categoryError}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <div
              className="form-control message-input"
              contentEditable="true"
              ref={textRef}
              onInput={(e) => setMessage(e.target.innerHTML)}
            ></div>
            <div className="formatting-buttons">
              <button onClick={() => handleFormatting('bold')}><strong>B</strong></button>
              <button onClick={() => handleFormatting('italic')}><em>I</em></button>
              <button onClick={() => handleFormatting('underline')}><u>U</u></button>
              <button onClick={handleIncreaseFontSize}>font-inc</button>
              <button onClick={handleDecreaseFontSize}>font-dec</button>
              <select onChange={(e) => handleFormatting('foreColor', e.target.value)}>
  <option value="">Choose a color</option>
  <option value="red">Red</option>
  <option value="blue">Blue</option>
  <option value="green">Green</option>
  <option value="yellow">Yellow</option>
  <option value="black">Black</option> {/* Added option to change back to black */}
</select>

            </div>
          </div>
          {bothError && <div className="error">{bothError}</div>}
          {bothValid && <div className="valid">{bothValid}</div>}
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Send</button>

        </div>
      </main>
    </div>
  );
};

export default User;
