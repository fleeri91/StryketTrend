import { NextApiResponse } from 'next';
import connectDB from 'src/app/_lib/connectDB';
import EventsSchema from '@schemas/EventsSchema';
import { Event } from 'types/Stryktipset';

export default async function handler(_req: any, res: NextApiResponse) {
  try {
    await connectDB();

    const response = await fetch(
      `https://api.www.svenskaspel.se/external/1/draw/europatipset/draws?accesskey=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data from external API');
    }

    const data = await response.json();

    if (
      !data ||
      !data.draws ||
      data.draws.length === 0 ||
      !data.draws[0].events ||
      data.draws[0].events.length === 0
    ) {
      throw new Error('Invalid or empty data received from external API');
    }

    const events = data.draws[0].events.map(
      (eventData: Event, index: number) => {
        const { participants, distribution, odds, eventNumber } = eventData;

        let oddsHome = '';
        let oddsDraw = '';
        let oddsAway = '';

        if (typeof odds.home === 'string') {
          oddsHome = odds.home.replace(',', '.');
          oddsDraw = odds.draw.replace(',', '.');
          oddsAway = odds.away.replace(',', '.');
        }

        return {
          eventNumber: eventNumber,
          teams: {
            home: participants.find((p) => p.type === 'home').name,
            away: participants.find((p) => p.type === 'away').name,
          },
          percentage: {
            home: distribution.home,
            draw: distribution.draw,
            away: distribution.away,
          },
          odds: {
            home: oddsHome || odds.home,
            draw: oddsDraw || odds.draw,
            away: oddsAway || odds.away,
          },
        };
      }
    );

    for (const event of events) {
      let existingEvent = await EventsSchema.findOne({
        'teams.home': event.teams.home,
        'teams.away': event.teams.away,
      });

      if (existingEvent) {
        if (existingEvent.percentage.length >= 13) {
          existingEvent.percentage.shift();
        }

        existingEvent.percentage.push({
          timestamp: new Date(),
          home: event.percentage.home,
          draw: event.percentage.draw,
          away: event.percentage.away,
        });

        if (existingEvent.odds.length >= 13) {
          existingEvent.odds.shift();
        }
        existingEvent.odds.push({
          timestamp: new Date(),
          home: event.odds.home,
          draw: event.odds.draw,
          away: event.odds.away,
        });
      } else {
        existingEvent = new EventsSchema({
          teams: event.teams,
          percentage: [
            {
              timestamp: new Date(),
              home: event.percentage.home,
              draw: event.percentage.draw,
              away: event.percentage.away,
            },
          ],
          odds: [
            {
              timestamp: new Date(),
              home: event.odds.home,
              draw: event.odds.draw,
              away: event.odds.away,
            },
          ],
        });
      }
      await existingEvent.save();
    }
    console.log('Data saved successfully!');
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error fetching or saving data:', error.message);
    res.status(500).json({ error: error.message });
  }
}
