import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";


function TableItem(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteItem = (id) => {
    dispatch(props.delete(id));
  };

  return (
    <tr key={props.id}>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.description}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.discount}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">
          <ul>
            {props.categories.reduce(
              (ac, c) => [...ac, <li key={c.name}>{c.name}</li>],
              []
            )}
          </ul>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div
          className={
            "text-left font-medium" + props.is_active
              ? "text-emerald-500"
              : "text-rose-500"
          }
        >
          {props.is_active ? "true" : "false"}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">
          <ul>
            {props.variants.reduce(
              (ac, c) => [...ac, <li key={c.name}>{c.name}</li>],
              []
            )}
          </ul>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">
          <button
            className="btn border-slate-200 hover:border-slate-300 mr-2"
            onClick={() => deleteItem(props.id)}
          >
            <svg
              className="w-4 h-4 fill-current text-rose-500 shrink-0"
              viewBox="0 0 16 16"
            >
              <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
            </svg>
          </button>
          <button
            className="btn border-slate-200 hover:border-slate-300"
            type="button"
            onClick={() => navigate(`/admin/food/create_food/${props.id}`)}

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

export default TableItem;
