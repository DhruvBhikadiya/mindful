const Policys = require('../models/policyModel');

exports.createPolicy = async (req, res) => {
    try {
        const result = await Policys.create(req.body);
        res.status(201).json({ message: 'Policy created', id: result.insertId });
    } catch (err) {
        console.error('Error creating Policy:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllPolicys = async (req, res) => {
    try {
        const results = await Policys.getAll();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Policys:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updatePolicy = async (req, res) => {
    const id = req.params.id;
    try {
        await Policys.update(id, req.body,req.userDetails);
        res.status(200).json({ message: 'Policy updated' });
    } catch (err) {
        console.error('Error updating Policy:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deletePolicy = async (req, res) => {
    const id = req.params.id;
    try {
        await Policys.delete(id);
        res.status(200).json({ message: 'Policy deleted' });
    } catch (err) {
        console.error('Error deleting Policy:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};