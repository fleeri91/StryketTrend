interface EventListProps {
  children: React.ReactNode;
}

const EventList = ({ children }: EventListProps): JSX.Element => (
  <div>
    <ul>{children}</ul>
  </div>
);

export default EventList;
