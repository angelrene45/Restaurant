from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.utils.image import generate_qr_board

router = APIRouter()


@router.get("/", response_model=List[schemas.Board])
def read_boards(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve boards
    """
    boards = crud.board.get_multi(db, skip=skip, limit=limit)
    return boards


@router.get("/{board_id}", response_model=schemas.Board)
def read_board_by_id(
    board_id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get a specific board by id.
    """
    board = crud.board.get(db, id=board_id)
    if not board:
        raise HTTPException(
            status_code=400, detail="The board doesn't exists"
        )
    return board


@router.post("/", response_model=schemas.Board)
def create_board(
    *,
    db: Session = Depends(deps.get_db),
    board_in: schemas.BoardCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new board system by admin.
    """
    board = crud.board.get_by_name(db, name=board_in.name)
    if board:
        raise HTTPException(
            status_code=400,
            detail="The board name already exists in the system",
        )
    layout = crud.layout.get(db, id=board_in.layout_id)
    if not layout:
        raise HTTPException(
            status_code=400,
            detail="The Layout does not exist in the system",
        )
    board = crud.board.create(db, obj_in=board_in)
    # Generate Qr with id
    qr = generate_qr_board(id=board.id)
    board_in.qr = qr
    # update qr image url
    board = crud.board.update(db, db_obj=board, obj_in=board_in)
    return board


@router.post("/multi/", response_model=List[schemas.Board])
def create_board_multiple(
    *,
    db: Session = Depends(deps.get_db),
    board_in_list: List[schemas.BoardCreate],
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create multiples boards.
    """
    list_created = []
    for board_in in board_in_list:
        board = crud.board.get_by_name(db, name=board_in.name)
        if board:
            raise HTTPException(
                status_code=400,
                detail="The board name already exists in the system",
            )
        layout = crud.layout.get(db, id=board_in.layout_id)
        if not layout:
            raise HTTPException(
                status_code=400,
                detail="The Layout does not exist in the system",
            )
        board = crud.board.create(db, obj_in=board_in)
        # Generate Qr with id
        qr = generate_qr_board(id=board.id)
        board_in.qr = qr
        # update qr image url
        board = crud.board.update(db, db_obj=board, obj_in=board_in)
        list_created.append(board)
    return list_created


@router.put("/{board_id}", response_model=schemas.Board)
def update_board(
    *,
    db: Session = Depends(deps.get_db),
    board_id: int,
    board_in: schemas.BoardUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update a board.
    """
    board = crud.board.get_by_name(db, name=board_in.name)
    if board:
        raise HTTPException(
            status_code=400,
            detail="The board name already exists in the system",
        )
    board = crud.board.get(db, id=board_id)
    if not board:
        raise HTTPException(
            status_code=400, detail="The Board doesn't exist"
        )
    layout = crud.layout.get(db, id=board_in.layout_id)
    if not layout:
        raise HTTPException(
            status_code=400,
            detail="The Layout does not exist in the system",
        )
    board_updated = crud.board.update(db, db_obj=board, obj_in=board_in)
    return board_updated


@router.put("/multi/", response_model=List[schemas.Board])
def update_board_multiple(
    *,
    db: Session = Depends(deps.get_db),
    board_in_list: List[schemas.BoardUpdate],
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update multiples boards.
    """
    # remove boards that aren't in the list 
    crud.board.delete_not_in_list(db, board_in_list=board_in_list)

    # update boards
    list_updated = []
    for board_in in board_in_list:
        board = crud.board.get_by_name(db, name=board_in.name)
        if board:
            raise HTTPException(
                status_code=400,
                detail=f"The board name already exists in the system id error: {board_in.id}",
            )
        board = crud.board.get(db, id=board_in.id)
        if not board:
            raise HTTPException(
                status_code=400, detail=f"The Board {board_in.id} doesn't exist"
            )
        layout = crud.layout.get(db, id=board_in.layout_id)
        if not layout:
            raise HTTPException(
                status_code=400,
                detail=f"The Layout does not exist in the system {board_in.layout_id}",
            )
        board_updated = crud.board.update(db, db_obj=board, obj_in=board_in)
        list_updated.append(board_updated)
    return list_updated