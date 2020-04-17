const express = require('express');
const apiRouter = express.Router();


    console.log('entered api');
    let Todo = require('../models/todo.model');
    let Event = require('../models/Event');

	apiRouter.get('/', function(req, res) {
		Event.find(function(err, events) {
			if (err) {
		        console.log(err);
			} else {
				res.json(events);
			}
		 });
	  });

	apiRouter.get('/:id', function(req, res) {
		let id = req.params.id;
		Event.findById(id, function(err, event) {
			res.json(event);
		});
	});

	apiRouter.post('/delete/:id', function(req, res) {
		Event.findByIdAndDelete({ _id: req.params.id }, function(err) {
			if (err)
			res.status(404).send("data is not found");
		else
			res.json('Event deleted!');
		});
	});

	apiRouter.route('/add').post(function(req, res) {
		let event = new Event(req.body);
		event.save()
			.then(event => {
				res.status(200).json({'event': 'event added successfully'});
			})
			.catch(err => {
				res.status(400).send('adding new event failed');
			});
	});

	apiRouter.post('/update/:id', function(req, res) {
		Event.findById(req.params.id, function(err, event) {
        	if (!event)
				res.status(404).send("data is not found");
			else
				event.title = req.body.title;
				event.description = req.body.description;
				event.time_spent = req.body.time_spent;
				event.collaborators = req.body.collaborators;
				event.difficulty = req.body.difficulty;
				event.category = req.body.category;
				event.completed = req.body.completed;
				event.date = req.body.date;
				event.save().then(event => {
                    res.json('Event updated!');
                })
				.catch(err => {
					res.status(400).send("Update not possible");
				});
		});
	});
module.exports = apiRouter;