import React, { useState, useRef, useEffect } from 'react';
// import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useSelector } from 'react-redux';


import './User.css'

const Ticket = () => {
  const [message, setMessage] = useState('');
  const textRef = useRef(null);
  const [titleError, setTitleError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [bothError, setBothError] = useState('');
  const [bothValid , setBothValid] = useState('');
  const [category, setCategory] = useState(''); 
  const [categories, setCategories] = useState([]);
  const creatorId = useSelector((state) => state.user.employeeId);
  const user = useSelector(state => state.user);

  useEffect(() => {
    fetch('http://localhost:4000/api/getCategories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => {
        console.error('Error fetchin g categories: ', error);
      });
  }, []);
  
  
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
        category,
        creator_id: creatorId ,
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
      {/* Page content */}
      <main className="main-content">
        <div className="container">
        <h1>Welcome, {user.username}!</h1>
          <h2>Create Ticket</h2>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" onClick={() => setBothValid('')} />
            {titleError && <div className="error">{titleError}</div>}
          </div>
          <div className="mb-3">
      <label htmlFor="category" className="form-label">Category</label>
      <select className="form-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)}  onClick={() => setBothValid('')}>
        <option>Select a category</option>
        {categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>
      {categoryError && <div className="error">{categoryError}</div>}
    </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Discription</label>
            <div
              className="form-control message-input"
              contentEditable="true"
              ref={textRef}
              onInput={(e) => setMessage(e.target.innerHTML)
              }
              onClick={() => setBothValid('')}
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

export default Ticket;
