const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')


// const Contact = require('../models/Contact')
const contactController = require('../controllers/contact')

// Get -----------------------------------------------
router.get('/', contactController.getAllContactController)

router.get('/:id', contactController.getSingleContactController)

// Post -----------------------------------------
router.post('/', authenticate, contactController.postNewContactController)

// Put -----------------------------------------
router.put('/:id', authenticate, contactController.editContactController);

// Delete -----------------------------------------
router.delete('/:id', authenticate, contactController.deleteContactController)

module.exports = router  