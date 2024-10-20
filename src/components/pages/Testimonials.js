import React, { useState, useEffect } from 'react'; // Import React and hooks for state and side effects
import TestimonialForm from './TestimonialForm'; // Import the TestimonialForm component
import './ui/Testimonials.css'; // Import the CSS file for styling

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]); // State to hold the array of testimonials
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the index of the currently displayed testimonial
  const [showForm, setShowForm] = useState(false); // State to toggle the visibility of the testimonial form

  // Fetch testimonials from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/testimonials') // Make a GET request to the testimonials endpoint
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        setTestimonials(data); // Update state with the fetched testimonials
      })
      .catch(error => {
        console.error('Error fetching testimonials:', error); // Log any errors that occur during the fetch
      });
  }, []); // Empty dependency array means this runs once on mount

  // Automatically change the displayed testimonial every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length); // Cycle through testimonials
    }, 6000);
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [testimonials]); // Dependency on testimonials to reset the interval when testimonials change

  const addTestimonial = (newTestimonial) => {
    // Function to add a new testimonial to the state
    const updatedTestimonials = [
      { ...newTestimonial, id: Date.now() }, // Add the new testimonial with a unique ID
      ...testimonials
    ].slice(0, 7); // Limit to the most recent 7 testimonials
    setTestimonials(updatedTestimonials); // Update state with the new testimonials
    setShowForm(false); // Hide the form after submission
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index); // Set the current index when a dot is clicked
  };

  return (
    <div className="testimonials-container"> {/* Container for the testimonials */}
      <h2>Customer Testimonials</h2> {/* Title for the testimonials section */}
      <div className="testimonials-grid" style={{ transform: `translateX(-${currentIndex * 20}%)` }}> {/* Grid for displaying testimonials */}
        {testimonials.map((testimonial) => ( // Map through the testimonials array
          <div key={testimonial._id} className="testimonial-card"> {/* Card for each testimonial */}
            <div className="testimonial-header"> {/* Header section for the testimonial */}
              <h3>{testimonial.name}</h3> {/* Display the name of the person */}
              <p>{testimonial.institution} - {testimonial.class}</p> {/* Display institution and class */}
            </div>
            <p className="testimonial-comment">{testimonial.comment}</p> {/* Display the testimonial comment */}
            <div className="testimonial-rating"> {/* Section for displaying the rating */}
              {[...Array(5)].map((_, ratingIndex) => ( // Create stars based on the rating
                <span key={ratingIndex} className={ratingIndex < testimonial.rating ? 'star filled' : 'star'}>★</span> // Conditional class for filled star
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="testimonial-dots"> {/* Dots for navigating testimonials */}
        {Array.from({ length: testimonials.length }).map((_, index) => ( // Create a dot for each testimonial
          <button
            key={index}
            className={`testimonial-dot ${index === currentIndex ? 'active' : ''}`} // Add 'active' class if dot is for the current testimonial
            onClick={() => handleDotClick(index)} // Handle dot click
          />
        ))}
      </div>
      {showForm ? ( // Conditional rendering for the testimonial form
        <TestimonialForm onSubmit={addTestimonial} onCancel={() => setShowForm(false)} /> // Show form if showForm is true
      ) : (
        <button className="add-testimonial-btn" onClick={() => setShowForm(true)}>Add Your Testimonial</button> // Button to show the form
      )}
    </div>
  );
}
