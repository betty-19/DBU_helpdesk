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
      const response = await fetch(`http://localhost:8000/user/faq?category=${category}`);
      const data = await response.json();

      // Initialize showAnswer property in each FAQ object to false
      const faqsWithAnswer = data.map(faq => ({ ...faq, showAnswer: false }));

      setFaqs(faqsWithAnswer);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  // const toggleAnswer = (index) => {
  //   setFaqs(prevFaqs => {
  //     const updatedFaqs = [...prevFaqs];
  //     updatedFaqs[index].showAnswer = !updatedFaqs[index].showAnswer;
  //     return updatedFaqs;
  //   });
  // };
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Collapse the answer if already expanded
    } else {
      setExpandedIndex(index); // Expand the answer
    }
  };

  return (
    <div>
    <select className="form-select mt-3" id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category}>{category}</option>
      ))}
    </select>
    <div className="mt-4">
      {faqs.map((faq, index) => (
        <div 
          key={index}
          className="card mb-2"
          style={{ maxWidth: '28rem' }}
          onClick={() => toggleAnswer(index)}
        >
          <div className="card-header d-flex align-items-center justify-content-between">
            <span>{faq.question}</span>
            <span className={`bi ${expandedIndex === index ? 'bi-caret-up-fill' : 'bi-caret-down-fill'}`} />
          </div>
          {expandedIndex === index && (
            <div className="card-body">
              <p className="card-text">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
  );
}

export default DisplayFaq;
