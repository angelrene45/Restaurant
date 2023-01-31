import { useState } from "react";


export const KitchenPanel = () => {

  const [drinksTab, setDrinksTab] = useState(true);

  return (
    <div className="grow">

      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Kitchen</h2>

        {/* General */}
        <section>
          <h3 className="text-xl leading-snug text-slate-800 font-bold mb-1">General</h3>
          <ul>
            <li className="flex justify-between items-center py-3 border-b border-slate-200">
              {/* Left */}
              <div>
                <div className="text-slate-800 font-semibold">Enable Drinks Tab</div>
                <div className="text-sm">This option enables the drinks tab on the kitchen page and the status of the screens will be used to finalize an order</div>
              </div>
              {/* Right */}
              <div className="flex items-center ml-4">
                <div className="text-sm text-slate-400 italic mr-2">{drinksTab ? 'On' : 'Off'}</div>
                <div className="form-switch">
                  <input type="checkbox" id="drinksTab" className="sr-only" checked={drinksTab} onChange={() => setDrinksTab(!drinksTab)} />
                  <label className="bg-slate-400" htmlFor="drinksTab">
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Enable smart sync</span>
                  </label>
                </div>
              </div>
            </li>
          
          </ul>
        </section>
      </div>

      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200">
          <div className="flex self-end">
            {/* <button className="btn border-slate-200 hover:border-slate-300 text-slate-600">Cancel</button> */}
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Save Changes</button>
          </div>
        </div>
      </footer>
    </div>
  )
}

