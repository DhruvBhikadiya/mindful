const express = require('express');
const router = express.Router();
const TreatmentsController = require('../controllers/treatmentController');
const { auth } = require('../middlewares/auth.js');

router.post('/createTreatment', TreatmentsController.createTreatment);
router.get('/getAllTreatmentsByPage', TreatmentsController.getAllTreatmentsByPage);
router.get('/getAllTreatments', TreatmentsController.getAllTreatments);
router.get('/getTreatmentDetail/:id', TreatmentsController.getTreatmentDetail);
router.put('/updateTreatment/:id',auth, TreatmentsController.updateTreatment);
router.put('/updateTreatmentForm/:id',auth, TreatmentsController.updateTreatmentForm);
router.delete('/deleteTreatment/:id',auth, TreatmentsController.deleteTreatment);

module.exports = router;
