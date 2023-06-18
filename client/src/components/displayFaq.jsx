import React, { useState, useEffect } from 'react';

function DisplayFaq() {
  // const [categories, setCategories] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState('');
  const [faqs, setFaqs] = useState([]);
 // const [category, setCategory] = useState(''); 
  const [categories, setCategories] = useState([]);
  

  // useEffect(() => {
  //   // Fetch categories from the department table
  //   fetchCategories();
  // }, []);
  useEffect(() => {
    fetch('http://localhost:4000/api/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => {
        console.error('Error fetchin g categories: ', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      // Fetch FAQs based on the selected category
      fetchFaqs(selectedCategory);
    }
  }, [selectedCategory]);

  // const fetchCategories = async () => {
  //   try {
  //     const response = await fetch('http://localhost:4000/api/categories');
  //     const data = await response.json();
  //     console.log('Categories data:', data);
  //     setCategories(data);
  //   } catch (error) {
  //     console.error('Error fetching categories:', error);
  //   }
  // };
  
  {/*compare it*/}
  useEffect(() => {
    fetch('http://localhost:4000/api/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => {
        console.error('Error fetchin g categories: ', error);
      });
  }, []);
  {/*compare */}
  

  const fetchFaqs = async (category) => {
    try {
      const response = await fetch(`http://localhost:4000/api/faq?category=${category}`); // Replace with your API endpoint for fetching FAQs based on the category
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const toggleAnswer = (index) => {
    setFaqs(prevFaqs => {
      const updatedFaqs = [...prevFaqs];
      updatedFaqs[index].showAnswer = !updatedFaqs[index].showAnswer;
    
    });
  };

  return (
    <div>
      {/* <select
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
      >
        <option value="">Select a category</option>
        {categories.map(category => (
  <option key={category} value={category}>
    {category}
  </option>
))}

      </select> */}
      <select className="form-select" id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>
     
      {faqs.map((faq, index) => (
        <div key={faq.id}>
          <h3 onClick={() => toggleAnswer(index)}>{faq.question}</h3>
          {faq.showAnswer && <p>{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
}

export default DisplayFaq;
