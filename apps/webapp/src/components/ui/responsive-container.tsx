const ResponsiveContainer = ({ children, className = '' }: { className?: string; children: React.ReactNode }) => {
  return (
    <>
      <div className={`lg:w-[auto] xl:w-[1024px] xl:self-center ${className}`}>{children}</div>
    </>
  );
};

export default ResponsiveContainer;
