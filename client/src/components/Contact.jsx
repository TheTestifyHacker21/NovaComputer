import React from 'react';
import { MdEmail } from "react-icons/md";
import { FaPhone , FaLocationDot } from "react-icons/fa6";



const Contact = () => {
  return (
    <div className="text-white">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="text-center display-4 fw-bold mb-5">Contact Us</h1>
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="rounded p-5 mb-4" style={{backgroundColor : "#0F172A" }}>
                  <h2 className="h3 fw-bold mb-4">Get In Touch</h2>
                  <p className="text-light mb-4">
                    Have questions about our products or services? We're here to help. 
                    Fill out the form and we'll get back to you as soon as possible.
                  </p>
                  
                  <div className="d-flex flex-column gap-3">
                    
                    <div className="d-flex align-items-start">
                      <span className='me-3'><MdEmail color='#2563EB' size={30}/></span>
                      <div>
                        <h5 className="fw-semibold mb-1">Email</h5>
                        <p className="text-light mb-0">support@pccomponents.com</p>
                      </div>
                    </div>
                    
                    
                    <div className="d-flex align-items-start">
                      <span className='me-3'><FaPhone  color='#15803D' size={30}/></span>
                      <div>
                        <h5 className="fw-semibold mb-1">Phone</h5>
                        <p className="text-light mb-0">(968) 12345678</p>
                      </div>
                    </div>
                    
                    
                    <div className="d-flex align-items-start">
                      <span className='me-3'><FaLocationDot  color='#DC2626' size={30}/></span>
                      <div>
                        <h5 className="fw-semibold mb-1">Address</h5>
                        <p className="text-light mb-0">123 Gulf Street, Al-Seeb , CA 94025</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                
                <div className="rounded p-5" style={{backgroundColor : "#0F172A" }}>
                  <h4 className="fw-bold mb-3">Business Hours</h4>
                  <div className="d-flex flex-column gap-2 text-light">
                    <p className="mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="mb-1">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="mb-0">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              
              <div className="col-md-6">
                <div className="rounded p-5 h-100" style={{backgroundColor : "#0F172A" }}>
                  <h2 className="h3 fw-bold mb-4">Send a Message</h2>
                  
                  <form className="d-flex flex-column gap-3">
                    <div>
                      <label className="form-label text-light">Name</label>
                      <input 
                        type="text" 
                        className="form-control border-dark text-white"
                        placeholder="Your name"
                        style={{backgroundColor : "#6a83a6ff" }}
                      />
                    </div>
                    
                    <div>
                      <label className="form-label text-light">Email</label>
                      <input 
                        type="email" 
                        className="form-control border-dark text-white"
                        placeholder="Your email"
                        style={{backgroundColor : "#6a83a6ff" }}
                      />
                    </div>
                    
                    <div>
                      <label className="form-label text-light">Message</label>
                      <textarea 
                        className="form-control border-dark text-white"
                        rows="6"
                        placeholder="Your message"
                        style={{backgroundColor : "#6a83a6ff" }}
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg w-100 fw-semibold mt-2"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;