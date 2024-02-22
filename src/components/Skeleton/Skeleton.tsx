/** Library import */
import { Children, Fragment, HTMLAttributes, cloneElement } from 'react';
import clsx from 'clsx';

import { SkeletonItemProps } from './SkeletonItem/SkeletonItem';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** */
  rows: number;
}

const Skeleton = ({
  rows,
  children,
  className,
  ...htmlAttributes
}: SkeletonProps): JSX.Element | null => {
  const renderChildren = (children: any) => {
    if (!children) return null; // Add a check for undefined or null children

    const clonedChildren = Children.map(children, (child, index) => {
      const props: SkeletonItemProps =
        child && child.props ? { id: index, ...child.props } : {};
      if (child) {
        return <>{cloneElement(child, { ...props, key: index })}</>;
      } else return false;
    });

    const multipliedChildren: JSX.Element[] = [];
    for (let i = 0; i < rows; i++) {
      const rowClones = clonedChildren.map((child: any, index: number) => {
        const key = `${index}-${i}`;
        return cloneElement(child, { ...child.props, key });
      });
      multipliedChildren.push(...rowClones);
    }
    return multipliedChildren;
  };

  return (
    <div className={clsx('space-y-2', className)} {...htmlAttributes}>
      {renderChildren(children)}
    </div>
  );
};

export default Skeleton;
