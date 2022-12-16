import { TableItem } from './TableItem';


export const Table = ({
  namePlural = "",
  skipColumns = [],
  dataPage = [],
  dataCountDB = 0,
  setOpen,
  setItemSelected
}) => {

  // get columns name from first position on dataPage
  const columnsNames = dataPage.length > 0 ? Object.keys(dataPage[0]) : []

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">All {namePlural}<span className="text-slate-400 font-medium"> {dataCountDB}</span></h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                {
                  columnsNames.map(itemName => {
                    // check if user skip this column name and ignore
                    if (!skipColumns.includes(itemName))
                      return (
                        <th
                          key={itemName}
                          className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">
                            {itemName}
                          </div>
                        </th>
                      )
                  })
                }

                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-right">Action</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {
                dataPage.map(item => {
                  return (
                    <TableItem
                      key={item.id}
                      item={item}
                      skipColumns={skipColumns}
                      setOpen={setOpen}
                      setItemSelected={setItemSelected}
                    />
                  )
                })
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}
