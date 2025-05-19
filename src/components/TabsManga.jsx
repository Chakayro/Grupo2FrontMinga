import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TabsManga = ({ tabs }) => (
  <Tab.Group>
    <Tab.List className="flex gap-2 mt-4">
      {tabs.map((tab) => (
        <Tab
          key={tab.label}
          className={({ selected }) =>
            classNames(
              "flex-1 font-bold py-2 rounded-full shadow transition",
              selected
                ? "bg-orange-400 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            )
          }
        >
          {tab.label}
        </Tab>
      ))}
    </Tab.List>
    <Tab.Panels>
      {tabs.map((tab, idx) => (
        <Tab.Panel key={idx}>
          {tab.content}
        </Tab.Panel>
      ))}
    </Tab.Panels>
  </Tab.Group>
);

export default TabsManga;