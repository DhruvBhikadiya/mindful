const Prescriptions = require('../models/prescriptionModel');

exports.createPrescription = async (req, res) => {
  try {
    const result = await Prescriptions.create(req.body);
    res.status(201).json({ message: 'Prescription created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Prescription:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllPrescriptions = async (req, res) => {
  try {
    const results = await Prescriptions.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Prescriptions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllPrescriptionsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Prescriptions.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Prescriptions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getByappointmentId = async (req, res) => {
    const id = req.params.id;
    try {
      const results = await Prescriptions.getByappointmentId(id);
      res.status(200).json(results);
    } catch (err) {
      console.error('Error fetching Prescriptions:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  
exports.updatePrescription = async (req, res) => {
  const id = req.params.id;
  try {
    await Prescriptions.update(id, req.body);
    res.status(200).json({ message: 'Prescription updated' });
  } catch (err) {
    console.error('Error updating Prescription:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deletePrescription = async (req, res) => {
  const id = req.params.id;
  try {
    await Prescriptions.delete(id,req.userDetails);
    res.status(200).json({ message: 'Prescription deleted' });
  } catch (err) {
    console.error('Error deleting Prescription:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
