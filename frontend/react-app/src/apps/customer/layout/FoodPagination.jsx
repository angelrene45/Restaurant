import React, { useEffect, useState } from 'react';

export const FoodPagination = ({events, page, length}) => {

  const { prevPageListener, nextPageListener } = events

  const classEnableButton = "btn bg-white border-slate-200 hover:border-slate-300 text-indigo-500"
  const classDisableButton = "btn bg-white border-slate-200 text-slate-300 cursor-not-allowed disabled"
  
  const [prevButton, setPrevButton] = useState({className: classDisableButton, disabled: true})
  const [nextButton, setNextButton] = useState({className: classEnableButton, disabled: false})

  useEffect(() => {
    // action when page is modified
    if (page == 0) {
      setPrevButton({className: classDisableButton, disabled: true})
      setNextButton({className: classEnableButton, disabled: false})
    }
    else if (page > 0){
      setPrevButton({className: classEnableButton, disabled: false})
      setNextButton({className: classEnableButton, disabled: false})
    }
    if (length === 0 && page > 0){
      setNextButton({className: classDisableButton, disabled: true})
    }
  }, [page]);


  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <button className={prevButton.className} onClick={prevPageListener} disabled={prevButton.disabled}>&lt;- Previous</button>
          </li>
          <li className="ml-3 first:ml-0">
            <button className={nextButton.className} onClick={nextPageListener} disabled={nextButton.disabled}>Next -&gt;</button>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 text-center sm:text-left">
        Page <span className="font-medium text-slate-600">{page+1}</span>
      </div>
    </div>
  );
}
