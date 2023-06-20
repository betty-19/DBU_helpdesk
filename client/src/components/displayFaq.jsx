import React, { useState, useEffect } from 'react';

function DisplayFaq() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/getCategories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchFaqs(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchFaqs = async (category) => {
    try {
      const response = await fetch(`http://localhost:4000/api/faq?category=${category}`);
      const data = await response.json();
  
      // Initialize showAnswer property in each FAQ object to false
      const faqsWithAnswer = data.map(faq => ({ ...faq, showAnswer: false }));
  
      setFaqs(faqsWithAnswer);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };
  
  const toggleAnswer = (index) => {
    setFaqs(prevFaqs => {
      const updatedFaqs = [...prevFaqs];
      updatedFaqs[index].showAnswer = !updatedFaqs[index].showAnswer;
      return updatedFaqs;
    });
  };

  return (
    <div>
      <select className="form-select" id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>
     
      {faqs.map((faq, index) => (
        <div key={faq.id}>
          <h6 onClick={() => toggleAnswer(index)}>{faq.question}</h6>
          {faq.showAnswer && faq.answer && <p>{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
}

export default DisplayFaq;
