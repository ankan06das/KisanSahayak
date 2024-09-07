import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios with `npm install axios`
import "./market.css"

function ThreeInputForm() {
    // State variables for the form inputs
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate inputs
        if (!input1 || !input2 || !input3) {
            alert('Please fill in all fields.');
            return;
        }

        // Prepare data to be sent
        const data = { input1, input2, input3 };

        try {
            // Send data to backend
            const response = await axios.post('/submit-form', data); // Replace with your actual endpoint
            alert('Form submitted successfully: ' + response.data.message);
        } catch (error) {
            alert('Failed to submit form: ' + error.message);
        }
    };

    return (
        <div className='form-outer'>
            <h2 style={{fontSize:"30px", fontWeight:"bold"}}>INPUT DETAILS</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="input1">Name of crop:</label>
                    <input
                        type="text"
                        id="input1"
                        placeholder="Enter name of crop here"
                        value={input1}
                        onChange={(e) => setInput1(e.target.value)}
                    />
                </div>

                <div className="flex justify-around text-brown-600">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  className="mr-2"
                  value="M"
                  onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                />
                Retailer
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  className="mr-2"
                  value="F"
                  onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                />
                Farmer
              </label>
            </div>

                <div className="form-group">
                    <label htmlFor="input2">Name of farmer:</label>
                    <input
                        type="text"
                        id="input2"
                        placeholder="Enter name of farmer here"
                        value={input2}
                        onChange={(e) => setInput2(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="input3">Price of the crop per kg:</label>
                    <input
                        type="text"
                        id="input3"
                        placeholder="Enter price of crop here"
                        value={input3}
                        onChange={(e) => setInput3(e.target.value)}
                    />
                </div>

                <button type="submit" className='primary-button-new'>Submit</button>
            </form>
        </div>
    );
}

export default ThreeInputForm;
