import { FC } from 'react';
import { FallingLines, ThreeDots } from 'react-loader-spinner';

interface LoadingSpinnerProps {
  type?: 'falling-lines' | 'three-dots';
  color?: string;
  size?: string;
  className?: string;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  type = 'three-dots',
  color = '#7777FF',
  size = '80',
  className = '',
}) => {
  const commonProps = {
    visible: true,
    color,
    ariaLabel: `${type}-loading`,
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      {type === 'falling-lines' ? (
        <FallingLines {...commonProps} width={size} />
      ) : (
        <ThreeDots
          {...commonProps}
          height={size}
          width={size}
          radius={9}
        />
      )}
    </div>
  );
};

export default LoadingSpinner;