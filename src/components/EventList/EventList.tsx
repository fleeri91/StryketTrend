interface EventListProps {
  children: React.ReactNode;
  lastUpdate: string | number;
}

const EventList = ({ children, lastUpdate }: EventListProps): JSX.Element => (
  <div className='p-4'>
    <p>{`Senast uppdaterad: ${lastUpdate}`}</p>
    <ul>{children}</ul>
  </div>
);

export default EventList;
