import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import redTable from "../../../../images/round-table-red.png";
import {
  getBoards,
  postBoards,
  updateBoards,
} from "../../../../store/slices/boards";
import BoardModal from "./BoardModal";

const FormTables = () => {
  const inputName = useRef();
  const inputCapacity = useRef();
  const divTables = useRef();
  const [tables, setTables] = useState([]);
  const [toggle1, setToggle1] = useState(true);
  const [currentTable, setCurrentTable] = useState(undefined);
  const [isDragging, setisDragging] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [assigned, setAssigned] = useState(true);
  const [openModal, setOpenModal] = useState(false)
  const [itemSelected, setItemSelected] = useState({})
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.board.allBoards);

  useEffect(() => {
    const context = document.getElementById("canvas");
    dispatch(getBoards());
  }, []);

  useEffect(() => {
    if (assigned || tables.length <= 0) {
      setTables(boards);
    }
    setAssigned(false);
  }, [boards]);

  useEffect(() => {
    setTables(boards);
  }, [boards]);

  const handleCreateTable = (name) => {
    const newTable = {
      name: inputName.current.value,
      layout_id: 1,
      capacity: inputCapacity.current.value ? parseInt(inputCapacity.current.value) : 0,
      can_smoke: toggle1,
      position: {
        x: divTables.current.getBoundingClientRect().width / 2,
        y: divTables.current.getBoundingClientRect().height / 2,
        width: 50,
        height: 50,
        percentageX: 0,
        percentageY: 0,
      },
      qr: "",
    };
    setTables([newTable, ...tables]);
  };

  const is_mouse_in_table = (x, y, table) => {
    let table_left = table.position.x;
    let table_right = parseInt(table.position.width) + table.position.x;
    let table_top = table.position.y;
    let table_bottom = parseInt(table.position.height) + table.position.y;
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

      let position = {
        x: mouseX - currentTable.position.width / 2,
        y: mouseY,
        percentageX,
        percentageY,
        width: currentTable.position.width,
        height: currentTable.position.height,
      };

      let currentTableArr = {
        name: currentTable.name,
        layout_id: currentTable.layout_id,
        capacity: currentTable.capacity,
        can_smoke: currentTable.can_smoke,
        position,
        qr: currentTable.qr,
        ...(currentTable.id) && {id: currentTable.id}
      };

      let newTablesArray = tables.map((table) =>
        table.name === currentTable.name ? currentTableArr : table
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

  const handleSaveTables = (e) => {
    e.preventDefault();
    console.log(tables)
    dispatch(postBoards(JSON.stringify(tables)));
    
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
        return;
      }
      
      let position = {
        x: currentTable.position.x,
        y: currentTable.position.y,
        percentageX: currentTable.position.percentageX,
        percentageY: currentTable.position.percentageY,
        width: currentTable.position.width + 5,
        height: currentTable.position.height + 5,
      };

      let currentTableArr = {
        name: currentTable.name,
        layout_id: currentTable.layout_id,
        capacity: currentTable.capacity,
        can_smoke: currentTable.can_smoke,
        position,
        qr: currentTable.qr,
        ...(currentTable.id) && {id: currentTable.id}
      };
      setCurrentTable(currentTableArr);
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
      let position = {
        x: currentTable.position.x,
        y: currentTable.position.y,
        percentageX: currentTable.position.percentageX,
        percentageY: currentTable.position.percentageY,
        width: currentTable.position.width - 5,
        height: currentTable.position.height - 5,
      };

      let currentTableArr = {
        name: currentTable.name,
        layout_id: currentTable.layout_id,
        capacity: currentTable.capacity,
        can_smoke: currentTable.can_smoke,
        position,
        qr: currentTable.qr,
        ...(currentTable.id) && {id: currentTable.id}
      };
      setCurrentTable(currentTableArr);
      let newTablesArray = tables.map((table) =>
        table === currentTable ? currentTableArr : table
      );
      setTables(newTablesArray);
    }
    return;
  };

  const handleClickAddItem = () => {
    // clear category selected and avoid modal update
    setItemSelected(currentTable)
    // open modal
    setOpenModal(true)
  };

  const handleDeleteItem = () => {
    let newTablesArray = tables.filter((table) =>
      table.name !== currentTable.name
    );
    setTables(newTablesArray);
  };

  return (
    <div className="overflow-x-auto">

      <BoardModal
        open={openModal} 
        setOpen={setOpenModal} 
        itemSelected={itemSelected}
        currentTable={currentTable}
        setCurrentTable={setCurrentTable}
        dispatchSaveTables={handleSaveTables}
        tables={tables}
      />
        
      <div
        className="flex mx-auto text-center mt-4 mb-4"
        style={{ height: "800px", width: "1500px" }}
      >

        {/* Form boards */}
        <div style={{ width: "15%" }} className="mr-4">

          {/* Input name */}
          <div className="flex flex-col justify-start items-start">

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

          {/* Input capacity */}
          <div className="flex flex-col mt-3 justify-start items-start">

            <label className="block text-sm font-medium mb-1" htmlFor="default">
              Capacity
            </label>

            <input
              id="name"
              className="form-input w-full"
              type="number"
              required
              ref={inputCapacity}
            />

          </div>

          {/* Is active div */}
          <div className="flex flex-col mt-3 justify-start items-start">

            <label className="text-sm font-medium mb-1 " htmlFor="country">
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

          {/* div buttons create and save */}
          <div className="grid grid-cols-6 mt-3">

            {/* button create */}
            <div className="col-end-7 col-span-1 flex flex-row-reverse">

              <button
                className="btn-lg bg-emerald-500 hover:bg-emerald-600 text-white -order-1"
                type="submit"
                onClick={handleCreateTable}
              >
                Create
              </button>

            </div>

            {/* button save */}
            <div className="col-end-7 col-span-1 flex flex-row-reverse mt-3">
              <button
                className="btn-lg bg-emerald-500 hover:bg-emerald-600 text-white -order-1"
                type="submit"
                onClick={handleSaveTables}
              >
                Save
              </button>
            </div>

          </div>

        </div>

        {/* div mapping tables */}
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

          {/* Button increase size */}
          <button
            className="btn border-slate-200 hover:border-slate-300"
            onClick={increaseSizeHandler}
          >
            +
          </button>

          {/* Button reduce size */}
          <button
            className="btn border-slate-200 hover:border-slate-300 mr-5"
            onClick={reduceSizeHandler}
          >
            -
          </button>

          {/* Button edit board */}
          <button
            className="btn border-slate-200 hover:border-slate-300"
            onClick={handleClickAddItem}
          >
            <svg
              className="w-4 h-4 fill-current text-slate-500 shrink-0"
              viewBox="0 0 16 16"
            >
              <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
            </svg>
          </button>

          {/* Button delete board */}
          <button
            className="btn border-slate-200 hover:border-slate-300"
            onClick={handleDeleteItem}
          >
            <svg
              className="w-4 h-4 fill-current text-rose-500 shrink-0"
              viewBox="0 0 16 16"
            >
              <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
            </svg>
          </button>

        </div>

      </div>
    </div>
  );
};

export default FormTables;
