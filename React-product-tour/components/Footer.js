import Tour from './Tour';
const Footer = () => {
    const mystyle = {
        "position": "absolute",
        "bottom": "0",
        "width": "100%",
        "backgroundColor": "#333",
        "color":"#fff",
    };
    return (
      <footer style={mystyle} className="page-footer font-small bg-blue pt-1 ">
        <div className="container text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase font-weight-bold ">Contact Us</h5>
              <p>You can contact us on 234-8028-2393-96</p>
            </div>
            <div className="col-md-6 mb-md-0 mb-3">
              <h5 className="text-uppercase font-weight-bold tour-policy">
                Return Policy
              </h5>
              <p>We accept returns after 14 days max</p>
            </div>

            <div className="col-md-6 mb-md-0 mb-3">
              <h5 className="text-uppercase font-weight-bold">JAMstack Cart</h5>
              <p className="tour-contact">
                Built with 💕 by{" "}
                <a href="https://twitter.com/beveloper">beveloper</a>
              </p>
              <p>
                Image Credit{" "}
                <a href="https://www.instagram.com/mr_woniowei/">Mr Woniowei</a>
              </p>
            </div>
          </div>
        </div>
        <div className="footer-copyright text-center py-3">
          © 2020 Copyright:
          <span> JAMstack Cart</span>
        </div>
        
      </footer>
    );
  };
  export default Footer;