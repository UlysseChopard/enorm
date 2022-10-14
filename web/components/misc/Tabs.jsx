import { useState } from "react";

const Tab = ({ onClick, label }) => {
  return (
    <>
      <button
        className="w-32 p-2 font-normal border drop-shadow rounded mr-px bg-red-200 hover:drop-shadow-md focus:border-sky-800 focus:border-2 "
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
};

const Tabs = ({ tabs }) => {
  const [view, setView] = useState(tabs[0].view);
  return (
    <div className="flex flex-col">
      <div className="flex font-bold justify-start">
        {tabs.map((tab) => (
          <Tab
            key={tab.label}
            label={tab.label}
            onClick={() => setView(tab.view)}
          />
        ))}
      </div>
      {view}
    </div>
  );
};

export default Tabs;
