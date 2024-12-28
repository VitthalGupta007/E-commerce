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
          <a href="https://www.instagram.com/_.witch3r/" target="_blank">
            <i className="ri-instagram-line text-xl"> Instagram</i>
          </a>
          <a
            href="https://www.linkedin.com/in/praveen-shankar-ba289a212/"
            target="_blank"
          >
            <i className="ri-linkedin-fill text-xl"> Linkedin</i>
          </a>
          <a href="https://github.com/Shankar-001" target="_blank">
            <i className="ri-github-fill text-xl"> GitHub</i>
          </a>
        </div>
        <div>
          <h4>Contact Us</h4>
          <i className="ri-map-pin-line">
            <span>
              {' '}
              IIIT Ranchi, <br />
              Science & Technology Campus <br /> Ranchi, Jharkhand 834004
            </span>
          </i>
          <a href="mailto:praveen01.ugec20@iiitranchi.ac.in">
            <i className="ri-mail-line text-xl mr-1">
              {' '}
              praveen01.ugec20@iiitranchi.ac.in
            </i>
          </a>
          <i className="ri-phone-line text-xl mr-1"> +91-725 048 9572</i>
        </div>
      </div>
      <div className="subFooter">
        <div className="copyright">
          <p>
            Copyright © <span>{new Date().getFullYear()}</span> Praveen Shankar.
            All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
