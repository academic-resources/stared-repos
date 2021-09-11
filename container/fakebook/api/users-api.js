const express = require('express');
const router = express.Router();

router.delete('/logout', (req, res) => {
	delete req.session.user;
	res.json({message: "Logout Succesful!"})
});

module.exports = router;




