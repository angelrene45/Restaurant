import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import moment from 'moment';


const statusColor = (status) => {
  switch (status) {
    case 'true':
      return 'inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-emerald-100 text-emerald-600';
    case 'false':
      return 'inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-amber-100 text-amber-600';
    default:
      return 'inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-slate-100 text-slate-500';
  }
};


export const TableItem = ({ item = {}, skipColumns = [], setOpen, setItemSelected }) => {
  const { id } = item

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteItem = (id) => {
    dispatch(props.delete(id));
  };

  const handleUpdate = () => {
    // set id selected
    setItemSelected(item)
    // open modal update
    setOpen(true)
  }

  return (
    <tr key={id}>
      {/* Items Values */}

      {
        Object.keys(item).map((key, index) => {
          // check if user skip this column name and ignore
          if (!skipColumns.includes(key))
            return (
              <td
                key={key}
                className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
              >
                <div className="text-left">
                  { // boolean if user is active
                    key == "is_active" ?
                      <span className={statusColor(item[key].toString())}>
                        {item[key].toString()}
                      </span>
                    : key == "color" ?
                      <div className={`w-1/6 ${item[key]}`}>
                        &nbsp;
                      </div>
                    // date with moment.js 
                    : key == "last_login" && item[key] ?
                      moment(item[key]).fromNow()
                    // boolean
                    : typeof item[key] == "boolean" ?
                      item[key].toString()
                    // Normal Value
                    :
                      item[key]
                  }
                </div>
              </td>
            )
        })
      }

      {/* Actions Icons */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-right">

          {/* Button Delete */}
          {/* <button
            className="btn border-slate-200 hover:border-slate-300 mr-2"
            onClick={() => deleteItem(id)}
          >
            <svg
              className="w-4 h-4 fill-current text-rose-500 shrink-0"
              viewBox="0 0 16 16"
            >
              <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
            </svg>
          </button> */}

          {/* Button Update */}
          <button
            className="btn border-slate-200 hover:border-slate-300"
            type="button"
            onClick={handleUpdate}

          >
            <svg
              className="w-4 h-4 fill-current text-slate-500 shrink-0"
              viewBox="0 0 16 16"
            >
              <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
