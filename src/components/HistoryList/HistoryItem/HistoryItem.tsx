interface HistoryItemProps {
  onClick?: () => void;
}

const HistoryItem = ({ onClick }: HistoryItemProps): JSX.Element => (
  <li
    onClick={onClick}
    className='cursor-pointer text-center border font-bold rounded-md p-4 hover:bg-white hover:text-slate-950 transition-all'
  >
    Torsdag 12:00
  </li>
);

export default HistoryItem;
