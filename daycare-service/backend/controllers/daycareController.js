const dataService = require('../services/dataService');


exports.listChildren = (req, res) => {
const children = dataService.getChildren();
res.json(children);
};


exports.createChild = (req, res) => {
const child = dataService.addChild(req.body);
res.status(201).json(child);
};


exports.updateChild = (req, res) => {
const id = req.params.id;
const updated = dataService.updateChild(id, req.body);
if (!updated) return res.status(404).json({ error: 'Child not found' });
res.json(updated);
};


exports.deleteChild = (req, res) => {
const id = req.params.id;
const removed = dataService.deleteChild(id);
if (!removed) return res.status(404).json({ error: 'Child not found' });
res.json({ success: true });
};