'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { RiHistoryLine } from '@remixicon/react';

import { EventItem, EventList } from '@components/EventList';
import Container from '@components/Container';
import Modal from '@components/Modal';
import { Flex, Icon, LineChart } from '@tremor/react';

import { useGetStryktipsetQuery } from '@store/api/stryktipset';
import { useGetEventsQuery, useGetGamesQuery } from '@store/api/events';

import { setGames } from '@store/slices/base.slice';
import EventInfo from '@components/EventInfo';
import { GamesRoot } from 'types/Games';
import { RootState } from '@store/store';
import { HistoryList, HistoryItem } from '@components/HistoryList';
import { EventsRoot } from 'types/Events';
import axios from 'axios';
import { StryktipsetRoot } from 'types/Stryktipset';

const App = () => {
  const dispatch = useDispatch();

  const [isGraphOpen, setIsGraphOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const [selectedEvent, setSelectedEvent] = useState<EventsRoot | null>(null);
  const [selectedGame, setSelectedGame] = useState<GamesRoot | null>(null);

  const [stryktipsetData, setStryktipsetData] =
    useState<StryktipsetRoot | null>(null);

  // const games = useSelector((state: RootState) => state.base.games);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/stryktipset', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('fetch data', data);
      setStryktipsetData(data); // Save fetched data to state
      setLastUpdated(dayjs().format('HH:mm')); // Update lastUpdated time
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData function

    // Cleanup function if needed
    return () => {
      // Cleanup code if needed
    };
  }, []);

  const { data: gamesData } = useGetGamesQuery(
    void { pollingInterval: 1000 * 60 * 5 }
  );

  const handleRowClick = async (game?: GamesRoot) => {
    game && setSelectedGame(game);
  };

  useEffect(() => {
    gamesData && dispatch(setGames(gamesData));
  }, [gamesData, dispatch]);

  return (
    <Container>
      {stryktipsetData && (
        <>
          <EventInfo
            gameType={stryktipsetData.draws[0].productName}
            startTime={stryktipsetData.draws[0].closeTime}
          />
          <Flex className='mb-2'>
            <span>{`Senast uppdaterd ${lastUpdated}`}</span>
            <Icon
              icon={RiHistoryLine}
              variant='solid'
              color='slate'
              tooltip='Historik'
              className='cursor-pointer'
              onClick={() => setIsHistoryOpen(true)}
            />
          </Flex>
        </>
      )}
      {gamesData && (
        <EventList>
          {stryktipsetData &&
            stryktipsetData.draws[0].events.map((event, index) => (
              <EventItem
                key={index}
                startTime={dayjs(event.sportEventStart).format('HH:mm')}
                game={gamesData[index]}
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
                  handleRowClick(gamesData?.[index]).then(() =>
                    setIsGraphOpen(true)
                  )
                }
              />
            ))}
        </EventList>
      )}
      {selectedGame && (
        <Modal
          title={`${selectedGame.teams.home} - ${selectedGame.teams.away}`}
          isOpen={isGraphOpen}
          onClose={() => setIsGraphOpen(false)}
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
      <Modal
        title='Data historik'
        isOpen={isHistoryOpen}
        width='sm'
        onClose={() => setIsHistoryOpen(false)}
      >
        <HistoryList>
          {/*eventsData &&
            eventsData.map((event: EventsRoot, index: number) => (
              <HistoryItem
                key={index}
                time={event.timestamp}
                onClick={() => setSelectedEvent(event)}
              />
            ))*/}
          <></>
        </HistoryList>
      </Modal>
    </Container>
  );
};

export default App;
