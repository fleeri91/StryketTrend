// Import required packages
import { model, models, Schema } from 'mongoose';

// Define the schema for the eventData object
const eventSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  events: [
    {
      eventNumber: Number,
      teams: {
        home: String,
        away: String,
      },
      percentage: {
        home: String,
        draw: String,
        away: String,
      },
      odds: {
        home: String,
        draw: String,
        away: String,
      },
    },
  ],
});

const EventsModel = models.events || model('events', eventSchema);
export default EventsModel;
