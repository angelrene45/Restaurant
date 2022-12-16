import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import redTable from "../../../../images/round-table-red.png";
import { getBoards } from "../../../../store/slices/boards";
import { createFood, getFood, updateFood } from "../../../../store/slices/food";

const FormTables = () => {
  const inputName = useRef();
  const divTables = useRef();
  const [tables, setTables] = useState([]);
  const [toggle1, setToggle1] = useState(true);
  const [currentTable, setCurrentTable] = useState(undefined);
  const [isDragging, setisDragging] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const context = document.getElementById("canvas");
    dispatch(getBoards());
    const boards = useSelector((state) => state.board.allBoards);
    
  }, []);

  const handleCreateTable = (name) => {
    const newTable = {
      name: inputName.current.value,
      layout_id: 0,
      capacity: 0,
      can_smoke: toggle1,
      position: {
        x: divTables.current.getBoundingClientRect().width / 2,
        y: divTables.current.getBoundingClientRect().height / 2,
        width: 50,
        height: 50,
        percentageX: 0,
        percentageY: 0,
      },
    };
    setTables([newTable, ...tables]);
  };

  const is_mouse_in_table = (x, y, table) => {
    let table_left = table.position.x;
    let table_right = table.position.width + table.position.x;
    let table_top = table.position.y;
    let table_bottom = table.position.height + table.position.y;
    if (
      x > table_left &&
      x < table_right &&
      y > table_top &&
      y < table_bottom
    ) {
      return true;
    }

    return false;
  };

  const MouseDownHandler = (e) => {
    e.preventDefault();

    let clickX =
      parseInt(e.clientX) -
      parseInt(divTables.current.getBoundingClientRect().left);
    let clickY =
      parseInt(e.clientY) -
      parseInt(divTables.current.getBoundingClientRect().top);
    for (let table of tables) {
      if (is_mouse_in_table(clickX, clickY, table)) {
        setCurrentTable(table);
        setisDragging(true);
        return;
      }
    }
  };

  const mouseMoveHandler = (e) => {
    isOutHandler(e);
    if (!isDragging) {
      return;
    } else {
      console.log("move");
      e.preventDefault();
      let clientYDifTop =
        parseInt(e.clientY) -
        parseInt(divTables.current.getBoundingClientRect().top);
      let previousMouseY =
        parseInt(divTables.current.getBoundingClientRect().height) -
          clientYDifTop <=
        currentTable.position.height + 24
          ? clientYDifTop - currentTable.position.height - 24
          : clientYDifTop;
      setMouseX(
        parseInt(e.clientX) -
          parseInt(divTables.current.getBoundingClientRect().left)
      );
      setMouseY(previousMouseY);

      let { percentageX, percentageY } = pixelsToPercentageHandler(
        mouseX,
        mouseY
      );

      let currentTableArr = currentTable;
      currentTableArr.position.x = mouseX - currentTable.position.width / 2;
      currentTableArr.position.y = mouseY;
      (currentTableArr.position.percentageX = percentageX),
        (currentTableArr.position.percentageY = percentageY);

      let newTablesArray = tables.map((table) =>
        table === currentTable ? currentTableArr : table
      );
      setTables(newTablesArray);
    }
  };

  const mouseUpHandler = (e) => {
    if (!isDragging) {
      return;
    }
    e.preventDefault();
    setisDragging(false);
  };

  const mouseOutHandler = (e) => {
    if (!isDragging) {
      return;
    }
    e.preventDefault();
    setisDragging(false);
  };

  const handleGetDivsTables = () => {
    const divTables = document.getElementsByClassName("tables-position");
    console.log(tables);
  };

  const isOutHandler = (e) => {
    if (currentTable) {
      const totalMouseImageX =
        parseInt(e.clientX) -
        parseInt(divTables.current.getBoundingClientRect().left) +
        currentTable.position.width / 2;
      const totalMouseImageY =
        parseInt(e.clientY) -
        parseInt(divTables.current.getBoundingClientRect().top) +
        currentTable.position.height +
        24;

      if (divTables.current.getBoundingClientRect().width <= totalMouseImageX) {
        setisDragging(false);
        setCurrentTable(undefined);
      }
      if (
        parseInt(e.clientX) -
          parseInt(divTables.current.getBoundingClientRect().left) -
          currentTable.position.width / 2 <=
        0
      ) {
        setisDragging(false);
        setCurrentTable(undefined);
      }
      if (
        divTables.current.getBoundingClientRect().height <= totalMouseImageY
      ) {
        setisDragging(false);
        setCurrentTable(undefined);
      }
    }
  };

  const pixelsToPercentageHandler = (x, y) => {
    const percentageX =
      (x * 100) / divTables.current.getBoundingClientRect().width;
    const percentageY =
      (y * 100) / divTables.current.getBoundingClientRect().height;
    return { percentageX, percentageY };
  };

  const increaseSizeHandler = () => {
    if (currentTable) {
      if (currentTable.position.width >= 100) {
        console.log(currentTable);
        return;
      }
      let currentTableArr = currentTable;
      currentTableArr.position.width += 5;
      currentTableArr.position.height += 5;
      let newTablesArray = tables.map((table) =>
        table === currentTable ? currentTableArr : table
      );
      setTables(newTablesArray);
    }
    return;
  };

  const reduceSizeHandler = () => {
    if (currentTable) {
      if (currentTable.position.width <= 50) {
        return;
      }
      let currentTableArr = currentTable;
      currentTableArr.position.width -= 5;
      currentTableArr.position.height -= 5;
      let newTablesArray = tables.map((table) =>
        table === currentTable ? currentTableArr : table
      );
      setTables(newTablesArray);
    }
    return;
  };

  return (
    <div className="overflow-x-auto">
      <div
        className="flex mx-auto text-center mt-4 mb-4"
        style={{ height: "800px", width: "1500px" }}
      >
        <div style={{ width: "15%" }} className="mr-4">
          {/* Input name */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="default">
              Name
            </label>
            <input
              id="name"
              className="form-input w-full"
              type="text"
              required
              ref={inputName}
            />
          </div>
          {/* Is active */}
          <div className="flex flex-col mt-3">
            <label className="block text-sm font-medium mb-1" htmlFor="country">
              Can smoke
            </label>
            <div className="form-switch">
              <input
                type="checkbox"
                id="switch-1"
                className="sr-only"
                checked={toggle1}
                onChange={() => setToggle1(!toggle1)}
              />
              <label className="bg-slate-400" htmlFor="switch-1">
                <span className="bg-white shadow-sm" aria-hidden="true"></span>
                <span className="sr-only">Switch label</span>
              </label>
            </div>
            <div className="text-sm text-slate-400 italic ml-2">
              {toggle1 ? "True" : "false"}
            </div>
          </div>
          <div className="grid grid-cols-6 mt-3">
            <div className="col-end-7 col-span-1 flex flex-row-reverse">
              <button
                className="btn-lg bg-emerald-500 hover:bg-emerald-600 text-white -order-1"
                type="submit"
                onClick={handleCreateTable}
              >
                Create
              </button>
            </div>
            <div className="col-end-7 col-span-1 flex flex-row-reverse mt-3">
              <button
                className="btn-lg bg-emerald-500 hover:bg-emerald-600 text-white -order-1"
                type="submit"
                onClick={handleGetDivsTables}
              >
                Save 
              </button>
            </div>
          </div>
        </div>

        <div
          style={{ height: "100%", width: "85%", position: "relative" }}
          className="bg-gray-300 shadow-2xl rounded-lg"
          id="canvas"
          onMouseDown={(e) => MouseDownHandler(e)}
          onMouseUp={(e) => mouseUpHandler(e)}
          onMouseLeave={(e) => mouseOutHandler(e)}
          onMouseMove={(e) => mouseMoveHandler(e)}
          ref={divTables}
        >
          {tables.map((table) => (
            <div
              key={table.name}
              className="tables-position"
              style={{
                position: "absolute",
                top: `${table.position.y}px`,
                left: `${table.position.x}px`,
              }}
            >
              <img
                src={redTable}
                style={{
                  width: `${table.position.width}px`,
                  height: `${table.position.height}px`,
                }}
              ></img>
              {currentTable ? (
                <span
                  className={
                    currentTable.name === table.name ? "font-black" : ""
                  }
                >
                  {table.name}
                </span>
              ) : (
                <span>{table.name}</span>
              )}
            </div>
          ))}

          <button
            className="btn border-slate-200 hover:border-slate-300"
            onClick={increaseSizeHandler}
          >
            +
          </button>
          <button
            className="btn border-slate-200 hover:border-slate-300"
            onClick={reduceSizeHandler}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormTables;
