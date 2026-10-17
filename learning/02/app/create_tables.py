from database import Base, engine
from models.task import Task

Base.metadata.create_all(bind=engine)

print("Jadvallar muvaffaqiyatli yaratildi!")