const express = require('express');
const router = express.Router();
const PrescriptionsController = require('../controllers/prescriptionController');
const { auth } = require('../middlewares/auth.js');

router.post('/createPrescription', PrescriptionsController.createPrescription);
router.get('/getAllPrescriptionsByPage',auth, PrescriptionsController.getAllPrescriptionsByPage);
router.get('/getAllPrescriptions',auth, PrescriptionsController.getAllPrescriptions);
router.get('/getPrescriptionByappointmentId/:id', PrescriptionsController.getByappointmentId);
router.put('/updatePrescription/:id',auth, PrescriptionsController.updatePrescription);
router.delete('/deletePrescription/:id',auth, PrescriptionsController.deletePrescription);

module.exports = router;
