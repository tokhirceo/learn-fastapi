from sqlalchemy import select
from sqlalchemy.orm import Session

from models.task import Task
from schemas.task import TaskCreate, TaskUpdate

def get_all(db:Session) -> list[Task]:
    statement = select(Task).order_by(Task.id)
    return list(db.scalars(statement).all())

def get_by_id(db: Session, task_id: int) -> Task | None:
    return db.get(Task, task_id)


def create(db: Session, task_data: TaskCreate) -> Task:
    task = Task(**task_data.model_dump())

    db.add(task)
    db.commit()
    db.refresh(task)

    return task

def update(
    db: Session,
    task: Task,
    task_data: TaskUpdate,
) -> Task:
    update_data = task_data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(task, field, value)

    db.commit()
    db.refresh(task)

    return task

def delete(db:Session, task: Task) -> None:
    db.delete(task)
    db.commit()
