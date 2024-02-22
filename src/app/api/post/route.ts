import { NextRequest, NextResponse } from 'next/server';
import axios, { HttpStatusCode } from 'axios';
import connectDB from 'src/app/_lib/connectDB';

import EventsSchema from '@schemas/EventsSchema';
import GamesSchema from '@schemas/GamesSchema';

import { GamesRoot } from 'types/Games';
import { Event } from 'types/Stryktipset';

export async function GET() {
  try {
    await connectDB();
    const response = await axios.get(
      `https://api.www.svenskaspel.se/external/1/draw/stryktipset/draws?accesskey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data = response.data;

    if (data) {
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

          const homeParticipant = participants.find((p) => p.type === 'home');
          const awayParticipant = participants.find((p) => p.type === 'away');

          if (homeParticipant && awayParticipant) {
            return {
              eventNumber: eventNumber,
              teams: {
                home: homeParticipant.name,
                away: awayParticipant.name,
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
          } else {
            throw new Error('Home or away participant not found');
          }
        }
      );

      const timestamp = new Date();

      // Create a new EventData instance
      const eventData = new EventsSchema({
        timestamp: timestamp,
        events: events,
      });
      await eventData.save();

      for (const event of events) {
        let oddsHome = '';
        let oddsDraw = '';
        let oddsAway = '';

        if (typeof event.odds.home === 'string') {
          oddsHome = event.odds.home.replace(',', '.');
          oddsDraw = event.odds.draw.replace(',', '.');
          oddsAway = event.odds.away.replace(',', '.');
        }

        // Find existing document or create a new one
        let existingData = await GamesSchema.findOne({
          'teams.home': event.teams.home,
          'teams.away': event.teams.away,
        });

        if (existingData) {
          // Check if the percentage array length is greater than or equal to 13
          if (existingData.percentage.length >= 13) {
            // Remove the oldest percentage entry
            existingData.percentage.shift();
          }
          // Append new percentage data to the percentage array
          existingData.percentage.push({
            timestamp: new Date(), // Set the timestamp to the current date
            home: event.percentage.home,
            draw: event.percentage.draw,
            away: event.percentage.away,
          });

          // Check if the odds array length is greater than or equal to 13
          if (existingData.odds.length >= 13) {
            // Remove the oldest odds entry
            existingData.odds.shift();
          }
          // Append new odds data to the odds array
          existingData.odds.push({
            timestamp: new Date(), // Set the timestamp to the current date
            home: oddsHome || event.odds.home,
            draw: oddsDraw || event.odds.draw,
            away: oddsAway || event.odds.away,
          });
        } else {
          // Create a new GamesSchema instance
          existingData = new GamesSchema({
            teams: event.teams,
            percentage: [
              {
                timestamp: new Date(), // Set the timestamp to the current date
                home: event.percentage.home,
                draw: event.percentage.draw,
                away: event.percentage.away,
              },
            ],
            odds: [
              {
                timestamp: new Date(), // Set the timestamp to the current date
                home: oddsHome || event.odds.home,
                draw: oddsDraw || event.odds.draw,
                away: oddsAway || event.odds.away,
              },
            ],
          });
        }
        // Save the document to the database
        await existingData.save();
      }

      console.log('Data saved successfully!');
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
