import './FooterStyles.css';

const Footer = () => {
  return (
    <div id="contactUs">
      <div className="footer">
        <div >
          <div>
            <h1 className="text-2xl mt-1">ClassicReborn</h1>
            <p>Give New Life to Old Goods.</p>
          </div>
          <div></div>
        </div>
        <div>
          <h4>Useful Links</h4>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/#shop">Shop</a>
          <a href="/profile">Add Product</a>
        </div>
        <div>
          <h4>Follow Us</h4>
          <a
            href="https://www.linkedin.com/in/vitthal-gupta-4b82b7266/"
            target="_blank" rel="noopener noreferrer"
          >
            <i className="ri-linkedin-fill text-xl"> Linkedin</i>
          </a>
          <a href="https://github.com/VitthalGupta007" target="_blank">
            <i className="ri-github-fill text-xl"> GitHub</i>
          </a>
        </div>
        <div>
          <h4>Contact Us</h4>
          <i className="ri-map-pin-line">
            <span>
              {' '}
              Nit kurukshetra, <br />
              kurukshetra, Haryana 136119
            </span>
          </i>
          <a href="mailto:vitthalgupta007@gmail.com">
            <i className="ri-mail-line text-xl mr-1">
              {' '}
              vitthalgupta007@gmail.com
            </i>
          </a>
          <i className="ri-phone-line text-xl mr-1"> +91 87089-85673</i>
        </div>
      </div>
      <div className="subFooter">
        <div className="copyright">
          <p>
            Copyright © <span>{new Date().getFullYear()}</span> Vitthal Gupta.
            All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
