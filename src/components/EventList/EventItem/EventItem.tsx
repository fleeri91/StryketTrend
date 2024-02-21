import { BadgeDelta } from '@tremor/react';

import { GamesRoot } from 'types/Games';

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
  game?: GamesRoot;
  onClick?: () => void;
}

const EventItem = ({
  startTime,
  teams,
  percentage,
  odds,
  game,
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
                  game?.percentage[game.percentage.length - 1].home
                    ? getPercentageDeltaType(
                        Number(
                          game?.percentage[game.percentage.length - 1].home
                        ),
                        Number(percentage.home)
                      )
                    : 'unchanged'
                }
                tooltip={
                  game &&
                  `${game?.percentage[game.percentage.length - 1].home} %`
                }
              >{`${percentage.home}%`}</BadgeDelta>
            </span>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  game?.percentage[game.percentage.length - 1].draw
                    ? getPercentageDeltaType(
                        Number(
                          game?.percentage[game.percentage.length - 1].draw
                        ),
                        Number(percentage.draw)
                      )
                    : 'unchanged'
                }
                tooltip={
                  game &&
                  `${game?.percentage[game.percentage.length - 1].draw} %`
                }
              >{`${percentage.draw}%`}</BadgeDelta>
            </span>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  game?.percentage[game.percentage.length - 1].away
                    ? getPercentageDeltaType(
                        Number(
                          game?.percentage[game.percentage.length - 1].away
                        ),
                        Number(percentage.away)
                      )
                    : 'unchanged'
                }
                tooltip={
                  game &&
                  `${game?.percentage[game.percentage.length - 1].away} %`
                }
              >{`${percentage.away}%`}</BadgeDelta>
            </span>
          </div>
          <div className='grid grid-cols-3 gap-4 mb'>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  game?.odds[game.percentage.length - 1].home
                    ? getOddsDeltaType(
                        parseFloat(
                          game?.odds[game.percentage.length - 1].home.replace(
                            ',',
                            '.'
                          )
                        ),
                        parseFloat(odds.home.replace(',', '.'))
                      )
                    : 'unchanged'
                }
                tooltip={game && game?.odds[game.percentage.length - 1].home}
              >{`${odds.home}`}</BadgeDelta>
            </span>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  game?.odds[game.percentage.length - 1].draw
                    ? getOddsDeltaType(
                        parseFloat(
                          game?.odds[game.percentage.length - 1].draw.replace(
                            ',',
                            '.'
                          )
                        ),
                        parseFloat(odds.draw.replace(',', '.'))
                      )
                    : 'unchanged'
                }
                tooltip={game && game?.odds[game.percentage.length - 1].draw}
              >{`${odds.draw}`}</BadgeDelta>
            </span>
            <span className=''>
              <BadgeDelta
                className='w-full justify-start'
                deltaType={
                  game?.odds[game.percentage.length - 1].away
                    ? getOddsDeltaType(
                        parseFloat(
                          game?.odds[game.percentage.length - 1].away.replace(
                            ',',
                            '.'
                          )
                        ),
                        parseFloat(odds.away.replace(',', '.'))
                      )
                    : 'unchanged'
                }
                tooltip={game && game?.odds[game.percentage.length - 1].away}
              >{`${odds.away}`}</BadgeDelta>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
