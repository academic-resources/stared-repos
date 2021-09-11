import { Router } from 'express'

import { welcome } from '../controllers'

const router = Router()

router.get('/welcome', welcome)

module.exports = router
