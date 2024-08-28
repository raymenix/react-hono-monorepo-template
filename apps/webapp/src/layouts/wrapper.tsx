const WrapperLayout = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return <div className={`flex flex-col min-h-100vh w-full overflow-x-hidden ${className}`}>{children}</div>;
};

export default WrapperLayout;
