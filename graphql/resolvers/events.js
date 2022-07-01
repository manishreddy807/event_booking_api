const Event = require('../../model/Event')
const User = require('../../model/User')

const {transfromEvent, transformEvent} = require('./merge')

module.exports = {
    events: async() => {
        try {
            const events = await Event.find().sort({
                createdAt: -1
            });
            return events.map(event => {
                return transformEvent(event);
            })
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    },
    createEvent: async (args, req) => {
        try {
            if(!req.isAuth){
                throw new Error('Unauthenticated request')
            }
            const {
                eventInput: {
                    title,
                    description,
                    price,
                    date
                },
            } = args;
            let event = new Event({
                title: title,
                description : description,
                price: price,
                date : new Date(date),
                creator: req.userID
            });
            let createdEvent;
            event = await event.save();
            createdEvent = transformEvent(event);
            let user = await User.findById(req.userID);
            if(!user){
                throw new Error('User not found')
            }
            user.createdEvents.push(event);
            await user.save();
            return createdEvent;
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }
}