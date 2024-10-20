import React, { useState } from 'react'; // Import React and useState hook
import './ui/TestimonialForm.css'; // Import the CSS file for styling

export default function TestimonialForm({ onSubmit, onCancel }) {
  // Component for the testimonial submission form
  const [formData, setFormData] = useState({ // State to hold form data
    name: '', // Name of the person giving the testimonial
    institution: '', // Institution of the person
    class: '', // Class of the person
    comment: '', // Testimonial comment
    rating: 5 // Default rating value
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setFormData(prev => ({ ...prev, [name]: value })); // Update the specific field in the form data
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await fetch('http://localhost:5000/testimonials', { // Make a POST request to submit the testimonial
        method: 'POST', // Specify the method as POST
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(formData), // Convert form data to JSON
      });
  
      if (!response.ok) { // Check if the response is not ok
        throw new Error('Failed to submit testimonial'); // Throw an error if submission fails
      }
  
      const result = await response.json(); // Parse the response JSON
      console.log('Testimonial submitted:', result); // Log the submitted testimonial
      onSubmit(result); // Call onSubmit prop with the response data
    } catch (error) {
      console.error('Error submitting testimonial:', error); // Log any errors that occur during submission
    }
  };  

  return (
    <form className="testimonial-form" onSubmit={handleSubmit}> {/* Form for submitting testimonials */}
      <h3>Add Your Testimonial</h3> {/* Title for the form */}
      <div className="form-group"> {/* Group for the name input */}
        <label htmlFor="name">Name:</label> {/* Label for the name input */}
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name} // Bind input value to state
          onChange={handleChange} // Handle input change
          required // Make this field required
        />
      </div>
      <div className="form-group"> {/* Group for the institution input */}
        <label htmlFor="institution">Institution:</label> {/* Label for the institution input */}
        <input
          type="text"
          id="institution"
          name="institution"
          value={formData.institution} // Bind input value to state
          onChange={handleChange} // Handle input change
          required // Make this field required
        />
      </div>
      <div className="form-group"> {/* Group for the class input */}
        <label htmlFor="class">Class:</label> {/* Label for the class input */}
        <input
          type="text"
          id="class"
          name="class"
          value={formData.class} // Bind input value to state
          onChange={handleChange} // Handle input change
          required // Make this field required
        />
      </div>
      <div className="form-group"> {/* Group for the comment textarea */}
        <label htmlFor="comment">Comment:</label> {/* Label for the comment textarea */}
        <textarea
          id="comment"
          name="comment"
          value={formData.comment} // Bind textarea value to state
          onChange={handleChange} // Handle input change
          required // Make this field required
        ></textarea>
      </div>
      <div className="form-group"> {/* Group for the rating input */}
        <label htmlFor="rating">Rating:</label> {/* Label for the rating input */}
        <input
          type="number"
          id="rating"
          name="rating"
          min="1" // Minimum value for the rating
          max="5" // Maximum value for the rating
          value={formData.rating} // Bind input value to state
          onChange={handleChange} // Handle input change
          required // Make this field required
        />
      </div>
      <div className="form-actions"> {/* Container for action buttons */}
        <button type="submit">Submit</button> {/* Button to submit the form */}
        <button type="button" onClick={onCancel}>Cancel</button> {/* Button to cancel and close the form */}
      </div>
    </form>
  );
}
