import { BadgeDelta } from '@tremor/react';

import { Event } from '../../../types/Events';

interface EventItemProps {
  startTime: string;
  teams: {
    home: string;
    away: string;
  };
  percentage: {
    home: string;
    draw: string;
    away: string;
  };
  odds: {
    home: string;
    draw: string;
    away: string;
  };
  lastEvent?: Event;
  onClick?: () => void;
}

const EventItem = ({
  startTime,
  teams,
  percentage,
  odds,
  lastEvent,
  onClick,
}: EventItemProps): JSX.Element => {
  const getPercentageDeltaType = (a: number, b: number): string => {
    const percentageChange = ((b - a) / a) * 100;

    switch (true) {
      case percentageChange >= 2:
        return 'increase';
      case percentageChange >= 1:
        return 'moderateIncrease';
      case percentageChange <= -2:
        return 'decrease';
      case percentageChange <= -1:
        return 'moderateDecrease';
      case percentageChange == 0:
        return 'unchanged';
      default:
        return 'unchanged';
    }
  };

  const getOddsDeltaType = (a: number, b: number): string => {
    const oddsChange = ((b - a) / a) * 100;

    switch (true) {
      case oddsChange >= 0.25:
        return 'increase';
      case oddsChange > 0:
        return 'moderateIncrease';
      case oddsChange <= -0.25:
        return 'decrease';
      case oddsChange < 0:
        return 'moderateDecrease';
      case oddsChange == 0:
        return 'unchanged';
      default:
        return 'unchanged';
    }
  };

  return (
    <li
      onClick={onClick}
      className='border-b dark:border-slate-700 border-slate-200 p-2 cursor-pointer transition-all dark:hover:bg-slate-700 hover:bg-slate-50 hover:scale-105'
    >
      <div className='grid md:grid-cols-event-item gap-4'>
        <div className='flex items-center'>{startTime}</div>
        <div className='flex flex-col items-start justify-center'>
          <span>{`${teams.home}`}</span>
          <span>{`${teams.away}`}</span>
        </div>
        <div className=''>
          <div className='grid grid-cols-3 gap-4 mb-1'>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  lastEvent?.percentage.home
                    ? getPercentageDeltaType(
                        Number(lastEvent?.percentage.home),
                        Number(percentage.home)
                      )
                    : 'unchanged'
                }
                tooltip={lastEvent && `${lastEvent.percentage.home} %`}
              >{`${percentage.home}%`}</BadgeDelta>
            </span>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  lastEvent?.percentage.draw
                    ? getPercentageDeltaType(
                        Number(lastEvent?.percentage.draw),
                        Number(percentage.draw)
                      )
                    : 'unchanged'
                }
                tooltip={lastEvent && `${lastEvent.percentage.draw} %`}
              >{`${percentage.draw}%`}</BadgeDelta>
            </span>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  lastEvent?.percentage.away
                    ? getPercentageDeltaType(
                        Number(lastEvent?.percentage.away),
                        Number(percentage.away)
                      )
                    : 'unchanged'
                }
                tooltip={lastEvent && `${lastEvent.percentage.away} %`}
              >{`${percentage.away}%`}</BadgeDelta>
            </span>
          </div>
          <div className='grid grid-cols-3 gap-4 mb'>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  lastEvent?.odds.home
                    ? getOddsDeltaType(
                        parseFloat(lastEvent?.odds.home.replace(',', '.')),
                        parseFloat(odds.home.replace(',', '.'))
                      )
                    : 'unchanged'
                }
                tooltip={lastEvent && lastEvent.odds.home}
              >{`${odds.home}`}</BadgeDelta>
            </span>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  lastEvent?.odds.draw
                    ? getOddsDeltaType(
                        parseFloat(lastEvent?.odds.draw.replace(',', '.')),
                        parseFloat(odds.draw.replace(',', '.'))
                      )
                    : 'unchanged'
                }
                tooltip={lastEvent && lastEvent.odds.draw}
              >{`${odds.draw}`}</BadgeDelta>
            </span>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  lastEvent?.odds.away
                    ? getOddsDeltaType(
                        parseFloat(lastEvent?.odds.away.replace(',', '.')),
                        parseFloat(odds.away.replace(',', '.'))
                      )
                    : 'unchanged'
                }
                tooltip={lastEvent && lastEvent.odds.away}
              >{`${odds.away}`}</BadgeDelta>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
