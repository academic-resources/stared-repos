import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const SecondPage = (props) =>
  console.log(props) || (
    <Layout>
      <h1>Jane Doe</h1>
      <p>
        Bacon ipsum dolor amet picanha landjaeger frankfurter pork chop,
        prosciutto cow hamburger corned beef bresaola shankle tenderloin turkey
        kevin tail swine. Jerky salami cupim ribeye beef flank pork loin
        tenderloin leberkas turkey ham sausage kevin hamburger meatball. Alcatra
        kielbasa bresaola t-bone cow strip steak. Pastrami prosciutto strip
        steak hamburger boudin.
      </p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )

export default SecondPage
