import { IoIosPeople } from "react-icons/io";
import { SlBadge } from "react-icons/sl";
import { FaHeart } from "react-icons/fa6";



const About = () => {
  return (
    <div className="text-white">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h1 className="text-center display-4 fw-bold mb-5">About Us</h1>
            
            
            <div className="bg-opacity-25 rounded-4 p-5 mb-5" style={{backgroundColor : "#0F172A" }}>
              <p className="text-light mb-4" style={{textAlign : "justify" }}>
                Welcome to PC Components, your trusted destination for premium computer parts and accessories. 
                We are passionate about technology and committed to helping enthusiasts, gamers, and professionals 
                build their dream systems.
              </p>
              <p className="text-light" style={{textAlign : "justify" }}>
                With years of experience in the industry, we carefully curate our product selection to ensure 
                quality, performance, and value. Our mission is to make high-performance computing accessible to everyone.
              </p>
            </div>

            
            <div className="row g-4 mb-5" >
              <div className="col-md-4" >
                <div className="bg-opacity-25 rounded-4 p-4 text-center h-100" style={{backgroundColor : "#0F172A" }}>
                  <div className="text-primary mb-3">

                    <IoIosPeople color="#3B82F6" size={50}/>
                    
                  </div>
                  <h3 className="h4 fw-semibold text-white mb-3">Expert Team</h3>
                  <p className="text-light opacity-75 mb-0">Knowledgeable staff ready to assist you</p>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="bg-opacity-25 rounded-4 p-4 text-center h-100" style={{backgroundColor : "#0F172A" }}>
                  <div className="text-success mb-3">

                    <SlBadge  color="#22C55E" size={50}/>

                  </div>
                  <h3 className="h4 fw-semibold text-white mb-3">Quality Products</h3>
                  <p className="text-light opacity-75 mb-0">Only the best brands and components</p>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="bg-opacity-25 rounded-4 p-4 text-center h-100" style={{backgroundColor : "#0F172A" }}>
                  <div className="text-danger mb-3">

                    <FaHeart color="#EF4444" size={50}/>

                  </div>
                  <h3 className="h4 fw-semibold text-white mb-3">Customer First</h3>
                  <p className="text-light opacity-75 mb-0">Your satisfaction is our priority</p>
                </div>
              </div>
            </div>


            
            <div className="bg-opacity-25 rounded-4 p-5" style={{backgroundColor : "#0F172A" }}>
              <h2 className="h1 fw-bold text-white mb-4">Our Values</h2>
              <ul className="list-unstyled">
                <li className="d-flex align-items-start mb-3">
                  <span className="text-warning me-2">•</span>
                  <span className="text-light">Commitment to quality and authenticity in every product</span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <span className="text-warning me-2">•</span>
                  <span className="text-light">Transparent pricing with no hidden fees</span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <span className="text-warning me-2">•</span>
                  <span className="text-light">Fast and reliable shipping services</span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <span className="text-warning me-2">•</span>
                  <span className="text-light">Exceptional customer support before and after purchase</span>
                </li>
                <li className="d-flex align-items-start">
                  <span className="text-warning me-2">•</span>
                  <span className="text-light">Building lasting relationships with our community</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;