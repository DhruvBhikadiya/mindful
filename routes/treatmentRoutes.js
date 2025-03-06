const express = require('express');
const router = express.Router();
const TreatmentsController = require('../controllers/treatmentController');
const { auth } = require('../middlewares/auth.js');

router.post('/createTreatment', TreatmentsController.createTreatment);
router.get('/getAllTreatmentsByPage',auth, TreatmentsController.getAllTreatmentsByPage);
router.get('/getAllTreatments',auth, TreatmentsController.getAllTreatments);
router.put('/updateTreatment/:id',auth, TreatmentsController.updateTreatment);
router.delete('/deleteTreatment/:id',auth, TreatmentsController.deleteTreatment);

module.exports = router;
