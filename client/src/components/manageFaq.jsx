// import React, { useState, useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// //import { fetchFAQs } from './redux/actions/faqActions';

// function ManageFaq() {
//   const dispatch = useDispatch();
//   const userDepartment = useSelector((state) => state.user.department);
//   const [showFAQ, setShowFAQ] = useState(false);
//   const [faqList, setFaqList] = useState([]);
//   const [message, setMessage] = useState('');
//   const textRef = useRef(null);

//   useEffect(() => {
//     fetchFAQsByDepartment();
//   }, []);

//   const fetchFAQsByDepartment = async () => {
//     try {
//       const response = await fetch(`http://localhost:4000/api/faqs?category=${userDepartment}`);
//       const data = await response.json();
//       setFaqList(data);
//     } catch (error) {
//       console.error('Error fetching FAQs:', error);
//     }
//   };

//   const handleAddFAQ = () => {
//     setShowFAQ(true);
//   };

//   const handleSubmitFAQ = async (e) => {
//     e.preventDefault();
  
//     const question = document.getElementById('question').value;
//     const answer = textRef.current.innerHTML;
//     const category = userDepartment;
  
//     const faqData = {
//       question,
//       answer,
//       category,
//     };
  
//     try {
//       const response = await fetch('http://localhost:4000/api/faq', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(faqData),
//       });
  
//       if (response.ok) {
//         console.log('FAQ stored successfully');
//         // Reset the form values
//         document.getElementById('question').value = '';
//         textRef.current.innerHTML = '';
//         setCategory('');
//         // Fetch FAQs again to update the list
//         fetchFAQsByDepartment();
//       } else {
//         console.error('Error storing FAQ:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error storing FAQ:', error);
//     }
//   };
  

//   const handleFormatting = (command, value) => {
//         // Check if there is selected text
//         const selectedText = window.getSelection().toString();
//         if (selectedText.length > 0) {
//           // Execute the specified command with the value
//           document.execCommand(command, false, value);
//         }
//       };
    
//       const handleIncreaseFontSize = () => {
//         const selection = window.getSelection();
//         if (selection.rangeCount > 0) {
//           for (let i = 0; i < selection.rangeCount; i++) {
//             const range = selection.getRangeAt(i);
//             const span = document.createElement('span');
//             span.style.fontSize = 'larger';
//             range.surroundContents(span);
//           }
//         }
//       };
      
    
//       const handleDecreaseFontSize = () => {
//         const selection = window.getSelection();
//         if (selection.rangeCount > 0) {
//           const range = selection.getRangeAt(0);
//           const span = document.createElement('span');
//           span.style.fontSize = 'smaller';
//           range.surroundContents(span);
//         }}

//   return (
//     <div>
//       <h1>Manage FAQ</h1>
//       <button onClick={handleAddFAQ}>Add FAQ</button>

//       {showFAQ && (
//         <div className="col">
//           <h1>Create FAQ</h1>
//           <form onSubmit={handleSubmitFAQ}>
//             <div className="mb-3">
//               <label htmlFor="question" className="form-label">Question</label>
//               <textarea className="form-control" id="question" rows="3" required></textarea>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="message" className="form-label">Answer</label>
//               <div
//                 className="form-control message-input"
//                 contentEditable="true"
//                 ref={textRef}
//                 onInput={(e) => setMessage(e.target.innerHTML)}
//               ></div>
//               <div className="formatting-buttons">
//                 <button onClick={() => handleFormatting('bold')}><strong>B</strong></button>
//                 <button onClick={() => handleFormatting('italic')}><em>I</em></button>
//                 <button onClick={() => handleFormatting('underline')}><u>U</u></button>
//                 <button onClick={handleIncreaseFontSize}>font-inc</button>
//                 <button onClick={handleDecreaseFontSize}>font-dec</button>
//                 <select onChange={(e) => handleFormatting('foreColor', e.target.value)}>
//                   <option value="">Choose a color</option>
//                   <option value="red">Red</option>
//                   <option value="blue">Blue</option>
//                   <option value="green">Green</option>
//                   <option value="yellow">Yellow</option>
//                   <option value="black">Black</option>
//                 </select>
//               </div>
//             </div>
//             <button type="button" className="btn btn-primary" onClick={handleSubmitFAQ}>Add</button>
//           </form>
//         </div>
//       )}

//       <table className='table'>
//         <thead>
//           <tr>
//             <th>Question</th>
//             <th>Answer</th>
//             <th>Category</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {faqList.map((faq) => (
//             <tr key={faq.id}>
//               <td>{faq.question}</td>
//               <td>{faq.answer}</td>
//               <td>{faq.category}</td>
//               <td>
//                 <button>Delete</button>
//                 <button>Edit</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ManageFaq;
