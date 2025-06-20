const express = require('express');
const router = express.Router();
const PolicysController = require('../controllers/policyController');
const { auth } = require('../middlewares/auth.js');

router.post('/createPolicy',auth, PolicysController.createPolicy);
router.get('/getPolicy', PolicysController.getAllPolicys);
router.put('/updatePolicy/:id',auth, PolicysController.updatePolicy);
router.delete('/deletePolicy/:id',auth, PolicysController.deletePolicy);

module.exports = router;