import { useState } from "react";

import { iconSystem } from "../../../../utils/iconSystem";
import { AccountPanel } from "./AccountPanel";
import { KitchenPanel } from "./KitchenPanel";

const OptionSideBar = [
  {
    title: 'Business Account',
    icon: iconSystem.account,
    component: AccountPanel
  },
  {
    title: 'Kitchen',
    icon: iconSystem.kitchen,
    component: KitchenPanel
  }
]


export const SettingsAdminSidebar = () => {

  const [selectedTabPage, setSelectedTabPage] = useState(OptionSideBar[0])

  const SideBarItem = ({ option = {} }) => {

    return (
      <li
        className="mr-0.5 md:mr-0 md:mb-0.5 cursor-pointer"
        onClick={() => setSelectedTabPage(option)}
      >
        <span className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${selectedTabPage.title === option.title && 'bg-indigo-50'}`}>
          <svg className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${selectedTabPage.title === option.title && 'text-indigo-400'}`} viewBox="0 0 16 16">
            {option.icon}
          </svg>
          <span className={`text-sm font-medium ${selectedTabPage.title === option.title && 'text-indigo-500'}`}>{option.title}</span>
        </span>
      </li>
    )
  }

  return (

    <>
      {/* SideBar */}
      <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-slate-200 min-w-60 md:space-y-3">
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase mb-3">Business settings</div>
          <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
            {
              OptionSideBar.map((option, i) => (
                <SideBarItem key={i} option={option} />
              ))
            }
          </ul>
        </div>
      </div>

      {/* Content */}
      {
        <selectedTabPage.component />
      }

    </>
  );
}