const { Router } = require('express');
const UserService = require('../services/UserService');
const User = require('../models/User');
const HabitService = require('../services/HabitService');

module.exports = Router()
    .post('/', async (req, res, next) => {
        //which habitService do we use? should be 7 total options...
        const user = await User.findByPhoneNumber(req.body.From);
        if (!user) {
            await UserService.create(req.body);
        } else if (!user.userPhotoURL) {
            await UserService.addSelfie(req.body);
        } else if (req.body.Body === 'new habit') {
            await HabitService.create(req.body);
        }
        res.end();
    });

    //should also be 7 total UserService and HabitService functions
