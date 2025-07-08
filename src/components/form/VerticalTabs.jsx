import React from "react";

const Tab = ({ title, onClick, active }) => {
  return (
    <div
      className={`cursor-pointer py-2 px-4 text-white rounded-md ${
        active ? "bg-primary" : "bg-secondary-100 hover:bg-secondary-800"
      }`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

const VerticalTabs = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="flex flex-col gap-2">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          title={tab.title}
          onClick={() => onTabClick(tab.id)}
          active={activeTab === tab.id}
        />
      ))}
    </div>
  );
};

export default VerticalTabs;