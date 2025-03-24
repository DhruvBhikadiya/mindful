const Treatments = require('../models/treatmentModel');

exports.createTreatment = async (req, res) => {
  try {
    const result = await Treatments.create(req.body);
    res.status(201).json({ message: 'Treatment created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Treatment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllTreatments = async (req, res) => {
  try {
    const results = await Treatments.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Treatments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllTreatmentsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Treatments.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Treatments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTreatmentDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await Treatments.getById(id);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Treatments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateTreatment = async (req, res) => {
  const id = req.params.id;
  try {
    await Treatments.update(id, req.body);
    res.status(200).json({ message: 'Treatment updated' });
  } catch (err) {
    console.error('Error updating Treatment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteTreatment = async (req, res) => {
  const id = req.params.id;
  try {
    await Treatments.delete(id,req.userDetails);
    res.status(200).json({ message: 'Treatment deleted' });
  } catch (err) {
    console.error('Error deleting Treatment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
