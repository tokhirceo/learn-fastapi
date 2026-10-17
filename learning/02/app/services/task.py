from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from models.task import Task
from repositories import task as task_repository
from schemas.task import TaskCreate, TaskUpdate

def get_all_tasks(db: Session) -> list[Task]:
    return task_repository.get_all(db)

def get_task(db: Session, task_id: int) -> Task:
    task = task_repository.get_by_id(db, task_id)

    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vazifa topilmadi",
        )

    return task


def create_task(db: Session, task_data: TaskCreate) -> Task:
    return task_repository.create(db, task_data)

def update_task(
    db:Session,
    task_id: int,
    task_data: TaskUpdate,
) -> Task:
    task =  get_task(db, task_id=task_id)
    return task_repository.update(db, task=task, task_data=task_data)
    

def delete_task(db:Session, task_id:int ) -> None:
    task = get_task(db, task_id=task_id)
    task_repository.delete(db, task)