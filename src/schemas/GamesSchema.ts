// Import required packages
import { model, models, Schema } from 'mongoose';

// Define the schema for the eventData object
const gamesSchema = new Schema({
  teams: {
    home: String,
    away: String,
  },
  percentage: [
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
});

const GamesSchema = models.games || model('games', gamesSchema);
export default GamesSchema;
