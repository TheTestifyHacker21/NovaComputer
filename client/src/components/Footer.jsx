import Logo from "../images/Main-Logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter , FaInstagram } from "react-icons/fa6";







const Footer = () => {

  return (
    <>

    <footer className="text-light py-5" id="footer" style={{ backgroundColor: "#0F172A" }}>
      <div className="container px-4">
        
        <div className="row g-4 mb-4">
          
          <div className="col-md-6 col-lg-3">
            <img src={Logo} width={200} />
            <p className="small my-3">Premium PC components at unbeatable prices</p>
          </div>

          
          <div className="col-md-6 col-lg-3">
            <h5 className="text-white fw-semibold mb-3">Products</h5>
            <ul className="list-unstyled small">
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">CPUs</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">GPUs</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Storage</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Power Supplies</a></li>
            </ul>
          </div>

          
          <div className="col-md-6 col-lg-3">
            <h5 className="text-white fw-semibold mb-3">Company</h5>
            <ul className="list-unstyled small">
              <li className="mb-2"><a href="/About" className="text-white text-decoration-none">About Us</a></li>
              <li className="mb-2"><a href="/Stores" className="text-white text-decoration-none">Stores</a></li>
              <li className="mb-2"><a href="/Contact" className="text-white text-decoration-none">Contact</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Support</a></li>
            </ul>
          </div>

          
          <div className="col-md-6 col-lg-3">
            <h5 className="text-white fw-semibold mb-3">Legal</h5>
            <ul className="list-unstyled small">
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Terms of Service</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Shipping Policy</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Returns</a></li>
            </ul>
          </div>
        </div>

        
        <div className="pt-4 border-top border-secondary">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <p className="text-white small mb-0">
              © 2025 PC Components. All rights reserved.
            </p>
            <div className="d-flex gap-4">
              <a href="#" className="text-muted text-decoration-none hover-primary">
                <span className="visually-hidden">Facebook</span>
                <FaFacebook color="white" size={20}/>

              </a>
              <a href="#" className="text-muted text-decoration-none hover-primary">
                <span className="visually-hidden">Twitter</span>
                <FaTwitter  color="white" size={20}/>
              </a>
              <a href="#" className="text-muted text-decoration-none hover-primary">
                <span className="visually-hidden">Instagram</span>
                <FaInstagram  color="white" size={20}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    </>
  );
};
export default Footer;
