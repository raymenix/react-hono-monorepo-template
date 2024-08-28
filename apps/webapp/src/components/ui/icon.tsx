import React from 'react';

interface IconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  icon: `i-mdi-${string}`;
}

const Icon = ({ icon, className, ...props }: IconProps) => {
  return <i {...props} className={`${className ?? ''} ${icon}`} />;
};

export default Icon;
