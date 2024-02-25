// Import required packages
import { model, models, Schema } from 'mongoose';

const eventSchema = new Schema({
  events: [
    {
      eventNumber: Number,
      teams: {
        home: String,
        away: String,
      },
      distribution: [
        {
          timestamp: {
            type: Date,
            default: Date.now,
          },
          home: String,
          draw: String,
          away: String,
        },
      ],
      odds: [
        {
          timestamp: {
            type: Date,
            default: Date.now,
          },
          home: String,
          draw: String,
          away: String,
        },
      ],
    },
  ],
});

const EventsSchema = models.events || model('events', eventSchema);
export default EventsSchema;
