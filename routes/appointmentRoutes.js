const express = require('express');
const router = express.Router();
const AppointmentsController = require('../controllers/appointmentController');
const { auth } = require('../middlewares/auth.js');

router.post('/createAppointment', AppointmentsController.createAppointment);
router.get('/getAllAppointmentsByPage', AppointmentsController.getAllAppointmentsByPage);
router.get('/getPendingAppointmentsByPage', AppointmentsController.getPendingAppointmentsByPage);
router.get('/getCompleteAppointmentsByPage', AppointmentsController.getCompleteAppointmentsByPage);
router.get('/getAllAppointments', AppointmentsController.getAllAppointments);
router.get('/getAppointmentById/:id', AppointmentsController.getAppointmentById);
router.get('/getAppointmentByTreatment/:id', AppointmentsController.getAppointmentByTreatment);
router.get('/getAppointmentByDate/:id', AppointmentsController.getAppointmentByDate);
router.get('/getAppointmentByUser/:id', AppointmentsController.getAppointmentByUser);
router.put('/updateAppointment/:id',auth, AppointmentsController.updateAppointment);
router.delete('/deleteAppointment/:id',auth, AppointmentsController.deleteAppointment);

module.exports = router;