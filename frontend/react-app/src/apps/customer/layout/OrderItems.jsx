

export const OrderItems = ({ items = [], readMode = false }) => {

  return (
    <ul>
      {/* Foods items */}
      {items.map((item, index) => (
        <li key={index} className="relative py-2">
          <div className="flex items-center mb-1">
              <div className="absolute left-0 h-full w-0.5 bg-slate-200 self-start ml-2.5 -translate-x-1/2 translate-y-3" aria-hidden="true"></div>
              <div className="absolute left-0 rounded-full bg-indigo-500" aria-hidden="true">
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 20 20">
                      <path d="M14.4 8.4L13 7l-4 4-2-2-1.4 1.4L9 13.8z" />
                  </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 pl-9">{item.name} - {item.variant}</h3>
          </div>
          <div className="pl-9">Unit: {item.unit}</div>
          <div className="pl-9">Quantity: {item.quantity}</div>
          <div className="pl-9">Price: ${item.price}</div>
      </li>
      ))}
    </ul>
  );
}