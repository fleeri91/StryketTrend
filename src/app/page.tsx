'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { EventItem, EventList } from '@components/EventList';
import Container from '@components/Container';
import Modal from '@components/Modal';
import { LineChart } from '@tremor/react';

import { useGetStryktipsetQuery } from '@store/api/stryktipset';
import { useGetEventsQuery, useGetGamesQuery } from '@store/api/events';

import { setGames } from '@store/slices/base.slice';
import EventInfo from '@components/EventInfo';
import { GamesRoot } from 'types/Games';
import { RootState } from '@store/store';

const App = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [selectedGame, setSelectedGame] = useState<GamesRoot | null>(null);

  const games = useSelector((state: RootState) => state.base.games);

  const apiUrl = process.env.NEXT_PUBLIC_API_KEY;

  const { data: stryktipsetData } = useGetStryktipsetQuery(apiUrl || '', {
    pollingInterval: 1000 * 60 * 5,
  });

  const { data: gamesData } = useGetGamesQuery(
    void { pollingInterval: 1000 * 60 * 5 }
  );

  const handleRowClick = async (game?: GamesRoot) => {
    game && setSelectedGame(game);
  };

  useEffect(() => {
    if (stryktipsetData) {
      setLastUpdated(dayjs().format('HH:mm'));
    }
  }, [stryktipsetData]);

  useEffect(() => {
    gamesData && dispatch(setGames(gamesData));
  }, [gamesData, dispatch]);

  return (
    <Container>
      {stryktipsetData && (
        <EventInfo
          gameType={stryktipsetData.draws[0].productName}
          startTime={stryktipsetData.draws[0].closeTime}
        />
      )}
      <EventList lastUpdate={lastUpdated}>
        {stryktipsetData &&
          stryktipsetData.draws[0].events.map((event, index) => (
            <EventItem
              key={index}
              startTime={dayjs(event.sportEventStart).format('HH:mm')}
              game={games[index]}
              teams={{
                home: event.participants[0].name,
                away: event.participants[1].name,
              }}
              percentage={{
                home: event.distribution.home,
                draw: event.distribution.draw,
                away: event.distribution.away,
              }}
              odds={{
                home: event.odds.home,
                draw: event.odds.draw,
                away: event.odds.away,
              }}
              onClick={() =>
                handleRowClick(games?.[index]).then(() => setIsOpen(true))
              }
            />
          ))}
      </EventList>
      {selectedGame && (
        <Modal
          title={`${selectedGame.teams.home} - ${selectedGame.teams.away}`}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <span className='font-bold'>Spelprocent</span>
          <LineChart
            className='h-52 mb-8'
            data={selectedGame.percentage}
            index='timestamp'
            categories={['home', 'draw', 'away']}
            colors={['indigo', 'rose', 'emerald']}
            yAxisWidth={60}
          />
          <span className='font-bold'>Odds</span>
          <LineChart
            className='h-52'
            data={selectedGame.odds}
            index='timestamp'
            categories={['home', 'draw', 'away']}
            colors={['indigo', 'rose', 'emerald']}
            yAxisWidth={60}
          />
        </Modal>
      )}
    </Container>
  );
};

export default App;
