const Appointments = require('../models/appointmentModel');

exports.createAppointment = async (req, res) => {
  try {
    const result = await Appointments.create(req.body);
    res.status(201).json({ message: 'Appointment created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Appointment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const results = await Appointments.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Appointments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllAppointmentsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Appointments.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Appointments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPendingAppointmentsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Appointments.getPendingByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Appointments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCompleteAppointmentsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Appointments.getCompletedByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Appointments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getAppointmentById = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await Appointments.getById(id);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Appointments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAppointmentByTreatment = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await Appointments.getByTreatment(id);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Appointments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAppointmentByDate = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await Appointments.getByDate(id);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Appointments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAppointmentByUser = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await Appointments.getByUserId(id);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Appointments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.updateAppointment = async (req, res) => {
  const id = req.params.id;
  try {
    await Appointments.update(id, req.body);
    res.status(200).json({ message: 'Appointment updated' });
  } catch (err) {
    console.error('Error updating Appointment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteAppointment = async (req, res) => {
  const id = req.params.id;
  try {
    await Appointments.delete(id,req.userDetails);
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (err) {
    console.error('Error deleting Appointment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
