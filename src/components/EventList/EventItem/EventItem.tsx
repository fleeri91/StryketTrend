import { BadgeDelta } from '@tremor/react';

import { Event } from 'types/Events';

interface EventItemProps {
  startTime: string;
  teams: {
    home: string;
    away: string;
  };
  distribution: {
    home: string;
    draw: string;
    away: string;
  };
  odds: {
    home: string;
    draw: string;
    away: string;
  };
  event?: Event;
  onClick?: () => void;
}

const EventItem = ({
  startTime,
  teams,
  distribution,
  odds,
  event,
  onClick,
}: EventItemProps): JSX.Element => {
  const getDistributionDeltaType = (a: number, b: number): string => {
    const distributionChange = ((b - a) / a) * 100;

    switch (true) {
      case distributionChange >= 2:
        return 'increase';
      case distributionChange >= 1:
        return 'moderateIncrease';
      case distributionChange <= -2:
        return 'decrease';
      case distributionChange <= -1:
        return 'moderateDecrease';
      case distributionChange == 0:
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
                  event?.distribution[event.distribution.length - 1].home
                    ? getDistributionDeltaType(
                        Number(
                          event?.distribution[event.distribution.length - 1]
                            .home
                        ),
                        Number(distribution.home)
                      )
                    : 'unchanged'
                }
                tooltip={
                  event &&
                  `${event?.distribution[event.distribution.length - 1].home} %`
                }
              >{`${distribution.home}%`}</BadgeDelta>
            </span>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  event?.distribution[event.distribution.length - 1].draw
                    ? getDistributionDeltaType(
                        Number(
                          event?.distribution[event.distribution.length - 1]
                            .draw
                        ),
                        Number(distribution.draw)
                      )
                    : 'unchanged'
                }
                tooltip={
                  event &&
                  `${event?.distribution[event.distribution.length - 1].draw} %`
                }
              >{`${distribution.draw}%`}</BadgeDelta>
            </span>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  event?.distribution[event.distribution.length - 1].away
                    ? getDistributionDeltaType(
                        Number(
                          event?.distribution[event.distribution.length - 1]
                            .away
                        ),
                        Number(distribution.away)
                      )
                    : 'unchanged'
                }
                tooltip={
                  event &&
                  `${event?.distribution[event.distribution.length - 1].away} %`
                }
              >{`${distribution.away}%`}</BadgeDelta>
            </span>
          </div>
          <div className='grid grid-cols-3 gap-4 mb'>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  event?.odds[event.odds.length - 1].home
                    ? getOddsDeltaType(
                        parseFloat(
                          event?.odds[event.odds.length - 1].home.replace(
                            ',',
                            '.'
                          )
                        ),
                        parseFloat(odds.home.replace(',', '.'))
                      )
                    : 'unchanged'
                }
                tooltip={event && event?.odds[event.odds.length - 1].home}
              >{`${odds.home}`}</BadgeDelta>
            </span>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  event?.odds[event.odds.length - 1].draw
                    ? getOddsDeltaType(
                        parseFloat(
                          event?.odds[event.odds.length - 1].draw.replace(
                            ',',
                            '.'
                          )
                        ),
                        parseFloat(odds.draw.replace(',', '.'))
                      )
                    : 'unchanged'
                }
                tooltip={event && event?.odds[event.odds.length - 1].draw}
              >{`${odds.draw}`}</BadgeDelta>
            </span>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  event?.odds[event.odds.length - 1].away
                    ? getOddsDeltaType(
                        parseFloat(
                          event?.odds[event.odds.length - 1].away.replace(
                            ',',
                            '.'
                          )
                        ),
                        parseFloat(odds.away.replace(',', '.'))
                      )
                    : 'unchanged'
                }
                tooltip={event && event?.odds[event.odds.length - 1].away}
              >{`${odds.away}`}</BadgeDelta>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
