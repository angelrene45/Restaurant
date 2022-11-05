
import React from "react";

function TableItem(props) {
  
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
            {props.categories.reduce((ac, c) => [...ac, <li key={c.name}>{c.name}</li>], [])}
          </ul>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div  className={ 'text-left font-medium' + props.is_active? 'text-emerald-500':'text-rose-500'}>
          {props.is_active ? 'true': 'false'}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">
          <ul>
            {props.variants.reduce((ac, c) => [...ac, <li key={c.name}>{c.name}</li>], [])}
          </ul>
        </div>
      </td>

      
    </tr>
  );
}

export default TableItem;
