import { HTMLAttributes } from 'react';
import clsx from 'clsx';

export interface SkeletonItemProps extends HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  spacingBottom?: number;
}

const SkeletonItem = ({
  width,
  height,
  spacingBottom,
  className,
  style,
  ...htmlAttributes
}: SkeletonItemProps): JSX.Element | null => {
  return (
    <div
      className={clsx(
        'bg-gray-300',
        'animate-pulse', // Animate pulse for shimmer effect
        'rounded-md', // Rounded corners
        className
      )}
      style={{
        width: width ? `${width}px` : '100%', // Width in pixels
        height: height ? `${height}px` : '16px', // Height in pixels
        marginBottom: spacingBottom ? `${spacingBottom}px` : '0px', // Spacing bottom in pixels
        ...style,
      }}
      {...htmlAttributes}
    />
  );
};

export default SkeletonItem;
