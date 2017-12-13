const express = require('express');
const getDb = require('../database/bootstrap.database');

const projectFeatureRouter = express.Router();

projectFeatureRouter.post('/:projectid/create/feature', (req, res) => {
    const projectid = req.params.projectid
    const { featureData } = req.body;
    const db = getDb();
    db.create_project_feature([ projectid, featureData] )
        .then(feature => res.send(feature))
        .catch(err => res.status(500).send(err));
});

// get all
projectFeatureRouter.get('/:projectid/features', (req, res) => {
    const projectid = req.params.projectid;
    const db = getDb();
    db.find_project_features([ projectid ])
        .then(features => res.send(features))
        .catch(err => res.status(500).send(err));
});

// get one
projectFeatureRouter.get('/:projectid/feature/:featureid', (req, res) => {
    const projectid = req.params.projectid;
    const featureid = req.params.featureid;
    const db = getDb();
    db.find_project_feature([ featureid ])
        .then(feature => res.send(feature))
        .catch(err => res.status(500).send(err))
});

projectFeatureRouter.put('/:projectid/update/feature/:featureid', (req, res) => {
    const projectid = req.params.projectid;
    const featureid = req.params.featureid;
    const { featureData } = req.body;
    const db = getDb();
    db.update_project_feature([ projectid, featureid, featureData] )
        .then(promise => res.send())
        .catch(err => res.status(500).send(err))
});

projectFeatureRouter.delete('/:projectid/delete/feature/:featureid', (req, res) => {
    const projectid = req.params.projectid;
    const featureid = req.params.featureid;
    const db = getDb();
    db.delete_project_feature([ featureid ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err))
});

module.exports = projectFeatureRouter;
