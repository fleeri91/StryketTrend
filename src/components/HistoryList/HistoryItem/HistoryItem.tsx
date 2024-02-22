import dayjs from 'dayjs';
import sv from 'dayjs/locale/sv';

interface HistoryItemProps {
  time?: string;
  onClick?: () => void;
}

const HistoryItem = ({ time, onClick }: HistoryItemProps): JSX.Element => (
  <li
    onClick={onClick}
    className='cursor-pointer text-center border font-bold rounded-md p-4 hover:bg-white hover:text-slate-950 transition-all'
  >
    {dayjs(time).locale(sv).format('dddd hh:mm')}
  </li>
);

export default HistoryItem;
