import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

type HnProps = PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>>;

export const H1 = ({ children, className, ...props }: HnProps) => {
  return (
    <h1 {...props} className={`scroll-m-20 text-4xl font-bold lg:text-5xl tracking-wider ${className}`}>
      {children}
    </h1>
  );
};

export const H2 = ({ children, className, ...props }: HnProps) => {
  return (
    <h2 {...props} className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-normal first:mt-0 ${className}`}>
      {children}
    </h2>
  );
};

export const H3 = ({ children, className, ...props }: HnProps) => {
  return (
    <h2 {...props} className={`scroll-m-20 text-2xl font-semibold tracking-normal ${className}`}>
      {children}
    </h2>
  );
};

export const H4 = ({ children, className, ...props }: HnProps) => {
  return (
    <h2 {...props} className={`scroll-m-20 text-xl font-semibold tracking-normal ${className}`}>
      {children}
    </h2>
  );
};

export const P = ({ children, className, ...props }: HnProps) => {
  return (
    <p {...props} className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>
      {children}
    </p>
  );
};

export const Lead = ({ children, className, ...props }: HnProps) => {
  return (
    <p {...props} className={`text-xl text-muted-foreground ${className}`}>
      {children}
    </p>
  );
};

export const Large = ({ children, className, ...props }: HnProps) => {
  return (
    <div {...props} className={`text-lg font-semibold ${className}`}>
      {children}
    </div>
  );
};

export const Small = ({ children, className, ...props }: HnProps) => {
  return (
    <small {...props} className={`text-sm font-medium leading-none ${className}`}>
      {children}
    </small>
  );
};

export const Muted = ({ children, className, ...props }: HnProps) => {
  return (
    <p {...props} className={`text-sm text-muted-foreground ${className}`}>
      {children}
    </p>
  );
};
