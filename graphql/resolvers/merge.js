const Event = require('../../model/Event');
const User = require('../../model/User');
const {dateToString} = require('../../helpers/date');

const transfromBooking = booking => {
    return{
        ...booking._doc,
        user: creator.bind(this, booking.user),
        event: singleEvent.bind(this, booking.event),
        createdAt: dateToString(booking.createdAt),
        updatedAt: dateToString(booking.updatedAt)
    }
}

const transformEvent = event => {
    return{
        ...event._doc,
        creator: creator.bind(this, event.creator),
        date: dateToString(event.date),
    }
}

const events = async eventIDs =>     {
    try {
        const events = await Event.find({
            _id: {
                $in : eventIDs
            }
        });
        return events.map(event => {
            return transformEvent(event)
        });
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
} 

const singleEvent = async eventID => {
    try {
        const event = await Event.findById(eventID);
        return transformEvent(event)
    } catch (error) {
          console.log(error)
            throw new Error(error);
    }
}



const creator = async userID => {
    try {
        const user = await User.findById(userID);
        return{
            ...user._doc,
            password: null,
            createdEvents: events.bind(this, user.createdEvents)
        }
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

exports.transformEvent = transformEvent;
exports.transfromBooking = transfromBooking;