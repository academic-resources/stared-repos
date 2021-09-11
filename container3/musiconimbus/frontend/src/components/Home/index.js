import "./Home.css";
import { ReactComponent as Logo } from "../images/musiconimbus2.svg"
import githubLogo from './GitHub-Mark-120px-plus.png'
import linkedinLogo from './LI-In-Bug_Blue.png'


export default function Home() {
  return (
    <>
    <div className="main">
      <h1>Make music.</h1>
      <h1>Share it with the world.</h1>
      <p className="tagline">MusicoNimbus is a place for classical musicians to upload, share, and listen to great music.</p>
      <Logo className="logo"/>
      <p className="disclaimer">The music on this website is made available under fair use for educational/demonstration purposes only. <br></br>It is not available for sale or reuse.</p>
    </div>
    <div className="footer">
      <div className="about">
        <img src="https://soundpost-app.s3.us-east-2.amazonaws.com/matt-1.jpg" alt="Matt Kufchak" className="footer__img"></img>
        <div className="about__info">
          <p>Designed and developed by Matt Kufchak</p>
          <p>Copyright © 2021</p>
        </div>
      </div>
      <a target="_blank" rel="noreferrer" href="https://github.com/cellomatt">
        <div className="github">
        <img src={githubLogo} alt="GitHub logo" className="footer__img"></img>
          <div className="github__info">
            <p>Find me on GitHub</p>
          </div>
        </div>
      </a>
      <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/mattkufchak/">
        <div className="linkedin">
        <img src={linkedinLogo} alt="LinkedIn logo" className="footer__img"></img>
          <div className="linkedin__info">
            <p>Connect with me on LinkedIn</p>
          </div>
        </div>
      </a>
    </div>
    </>
  );
}
