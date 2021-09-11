import React from 'react';

import { Typography } from '@material-ui/core'

const Help = () => {
  return (
    <div>
      <Typography >Click on a Beat Pad to create a sequence with a provided library of sounds.</Typography>
      <Typography>To add a note, drag a note from a chosen library and click play.</Typography>
      <Typography>When satisfied, click submit.</Typography>

      <Typography>Clicking on the same Pad again will play the created sequence.</Typography>
      <Typography>After giving the project a name, click Save to library to save your project.</Typography>
    </div>
  )
}

export default Help
