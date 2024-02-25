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

  const getIndexToRender = (array: any[]): number => {
    if (array.length === 1) {
      return array.length - 1;
    }
    return array.length - 2;
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
        <div className='flex flex-col'>
          <div className='grid grid-cols-3 gap-4 mb-1'>
            <span>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  event?.distribution[getIndexToRender(event.distribution)].home
                    ? getDistributionDeltaType(
                        Number(
                          event?.distribution[
                            getIndexToRender(event.distribution)
                          ].home
                        ),
                        Number(distribution.home)
                      )
                    : 'unchanged'
                }
                tooltip={
                  event &&
                  `${
                    event?.distribution[getIndexToRender(event.distribution)]
                      .home
                  } %`
                }
              >{`${distribution.home}%`}</BadgeDelta>
            </span>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  event?.distribution[getIndexToRender(event.distribution)].draw
                    ? getDistributionDeltaType(
                        Number(
                          event?.distribution[
                            getIndexToRender(event.distribution)
                          ].draw
                        ),
                        Number(distribution.draw)
                      )
                    : 'unchanged'
                }
                tooltip={
                  event &&
                  `${
                    event?.distribution[getIndexToRender(event.distribution)]
                      .draw
                  } %`
                }
              >{`${distribution.draw}%`}</BadgeDelta>
            </span>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  event?.distribution[getIndexToRender(event.distribution)].away
                    ? getDistributionDeltaType(
                        Number(
                          event?.distribution[
                            getIndexToRender(event.distribution)
                          ].away
                        ),
                        Number(distribution.away)
                      )
                    : 'unchanged'
                }
                tooltip={
                  event &&
                  `${
                    event?.distribution[getIndexToRender(event.distribution)]
                      .away
                  } %`
                }
              >{`${distribution.away}%`}</BadgeDelta>
            </span>
          </div>
          <div className='grid grid-cols-3 gap-4 mb'>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  event?.odds[getIndexToRender(event.odds)].home
                    ? getOddsDeltaType(
                        parseFloat(
                          event?.odds[
                            getIndexToRender(event.odds)
                          ].home.replace(',', '.')
                        ),
                        parseFloat(odds.home.replace(',', '.'))
                      )
                    : 'unchanged'
                }
                tooltip={
                  event && event?.odds[getIndexToRender(event.odds)].home
                }
              >{`${odds.home}`}</BadgeDelta>
            </span>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  event?.odds[getIndexToRender(event.odds)].draw
                    ? getOddsDeltaType(
                        parseFloat(
                          event?.odds[
                            getIndexToRender(event.odds)
                          ].draw.replace(',', '.')
                        ),
                        parseFloat(odds.draw.replace(',', '.'))
                      )
                    : 'unchanged'
                }
                tooltip={
                  event && event?.odds[getIndexToRender(event.odds)].draw
                }
              >{`${odds.draw}`}</BadgeDelta>
            </span>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  event?.odds[getIndexToRender(event.odds)].away
                    ? getOddsDeltaType(
                        parseFloat(
                          event?.odds[
                            getIndexToRender(event.odds)
                          ].away.replace(',', '.')
                        ),
                        parseFloat(odds.away.replace(',', '.'))
                      )
                    : 'unchanged'
                }
                tooltip={
                  event && event?.odds[getIndexToRender(event.odds)].away
                }
              >{`${odds.away}`}</BadgeDelta>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
