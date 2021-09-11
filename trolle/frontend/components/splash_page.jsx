import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginAsHarry } from '../actions/session_actions'
import SplashCarousel from './splash_carousel'

const mstp = state => ({})

const mdtp = dispatch => ({
  loginAsHarry: () => dispatch(loginAsHarry())
})

const splash = ({ loginAsHarry }) => (
  <div id="splash">
    <section className="splash-1">
      <Link to="/login">
        <h1>Log in to Trolle</h1>
      </Link>
      <Link to="/signup">
        <p>or create an account</p>
      </Link>
      <button onClick={loginAsHarry}>Or log in as a Demo User</button>
    </section>
    <section className="splash-2">
      <div className="copy">
        <h1>Trolle lets you work more collaboratively and get more done.</h1>
        <h2>
          Trolle’s boards, lists, and cards enable you to organize and
          prioritize your projects in a fun, flexible, and rewarding way.
        </h2>
        <Link to="/signup">
          <div className="btn signup-btn">Sign Up - It's Free!</div>
        </Link>
      </div>
      <img src={window.splash_image_1} />
    </section>
    <section className="splash-3">
      <div className="copy">
        <h1>Work with any team.</h1>
        <h2>
          Whether it’s for work, a side project or even the next family
          vacation, Trolle helps your team stay organized.
        </h2>
        <Link to="/signup">
          <div className="btn signup-btn">Start doing →</div>
        </Link>
      </div>
      <img src={window.splash_image_2} />
    </section>
    <section className="splash-4">
      <img src={window.splash_image_3} />
      <div className="copy">
        <h1>Information at a glance</h1>
        <h2>
          Dive into the details by adding comments, attachments, due dates, and
          more directly to Trolle cards. Collaborate on projects from beginning
          to end.
        </h2>
      </div>
    </section>
    <section className="splash-5">
      <div className="copy">
        <h1>See how it works</h1>
        <h2>
          Go from idea to action in seconds with Trolle’s intuitively simple
          boards, lists, and cards.
        </h2>
      </div>
      <SplashCarousel />
    </section>
    <section className="splash-10">
      <div className="copy">
        <h1>Start Planning Today</h1>
        <h2>
          Sign up and become one of the millions of people around the world
          using Trolle to get more done.
        </h2>
        <Link to="/signup">Get Started - It's Free!</Link>
      </div>
    </section>
  </div>
)

export default connect(
  mstp,
  mdtp
)(splash)
