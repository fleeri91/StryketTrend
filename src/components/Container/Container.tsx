import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps): JSX.Element => (
  <div className={clsx("max-w-2xl mx-auto px-4", className)}>{children}</div>
);

export default Container;
