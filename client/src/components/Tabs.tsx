type TabProps = {
  label: string;
  onClick: () => void;
  active: boolean;
};

function Tab({ label, onClick, active }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`${active ? 'border-b-2 border-blue-500' : ''} px-4 py-2 mx-1 font-bold focus:outline-none`}
    >
      {label}
    </button>
  );
}

type TabsProps = {
  selectedTab: string;
  setActiveTab: (tab: string) => void;
};

export default function Tabs({ selectedTab, setActiveTab }: TabsProps) {
  const changeTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex justify-center items-center my-4">
      <Tab
        label="Event"
        onClick={() => changeTab('Event')}
        active={selectedTab === 'Event'}
      />
      <Tab
        label="Participants"
        onClick={() => changeTab('Participants')}
        active={selectedTab === 'Participants'}
      />
      <Tab
        label="Email"
        onClick={() => changeTab('Email')}
        active={selectedTab === 'Email'}
      />
    </div>
  );
}
