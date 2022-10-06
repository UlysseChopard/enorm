const Main = ({ children, bgColor }) => {
  return (
    <main
      className={`flex w-full flex-1 flex-col items-center justify-center text-center ${bgColor}`}
    >
      {children}
    </main>
  );
};

export default Main;
