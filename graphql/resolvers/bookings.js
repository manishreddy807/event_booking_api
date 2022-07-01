const Booking = require('../../model/Bookings');
const Event = require('../../model/Event');

const {
    transformBooking,
    transfromEvent,
    transfromBooking
} = require('./merge');


module.exports = {
    bookings: async (args, req) => {
        try {
            if(!req.isAuth){
                throw new Error('Unauthenticated request');
            }
            const bookings = await Booking.find({
                user: req.userID
            }).sort({
                createdAt: -1
            });
            return bookings.map(booking => {
                return transfromBooking(booking);
            })
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    },
    bookEvent: async (args, req) => {
        try {
            if(!req.isAuth){
                throw new Error('Unauthenticated request');
            }
            let bookedEvent = await Booking.findOne({
                event: args.eventID,
                user: req.userID
            });
            if(bookedEvent){
                throw new Error('You are already booked this event')
            }
            let ownedEvent = await Event.findOne({
                _id: args.eventID,
                user: req.userID
            });
            const result = await bookedEvent.save();
            return transfromBooking(result);
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    },
    cancelBooking: async (args, req) => {
        try{
            if(!req.isAuth){
                throw new Error('Unauthenticated request')
            }
            const booking = await (await Booking.findById(args.bookingID)).populate('event');
            const event = transfromEvent(booking.event);
            await Booking.deleteOne({
                _id: args.bookingID
            });
            return event;
        }catch(e){
            console.log(error)
            throw new Error(error);
        }
    }
}
