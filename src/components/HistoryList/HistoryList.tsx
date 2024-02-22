interface HistoryListProps {
  children: React.ReactNode;
}

const HistoryList = ({ children }: HistoryListProps): JSX.Element => (
  <div className='my-8'>
    <ul className='space-y-4'>{children}</ul>
  </div>
);

export default HistoryList;
