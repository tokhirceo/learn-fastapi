# TaskFlow — FastAPI Tasks API

FastAPI, SQLAlchemy va SQLite yordamida yaratilgan vazifalarni boshqarish API loyihasi. Loyiha davomida REST API yaratish, ma'lumotlar bazasi bilan ishlash, qatlamli arxitektura, Pydantic validatsiyasi, CRUD amallari va PowerShell orqali HTTP so‘rovlarini yuborish o‘rganiladi.

Loyihaning keyingi bosqichida Vanilla JavaScript va Tailwind CSS yordamida bitta `index.html` faylidan iborat Single Page Application (SPA) frontend yaratish rejalashtirilgan.

## Mundarija

- [Loyiha maqsadi](#loyiha-maqsadi)
- [Texnologiyalar](#texnologiyalar)
- [Loyiha tuzilishi](#loyiha-tuzilishi)
- [Arxitektura](#arxitektura)
- [O‘rnatish va ishga tushirish](#ornatish-va-ishga-tushirish)
- [Konfiguratsiya](#konfiguratsiya)
- [Ma'lumotlar bazasi](#malumotlar-bazasi)
- [Model va schema](#model-va-schema)
- [API endpointlari](#api-endpointlari)
- [PowerShell orqali API bilan ishlash](#powershell-orqali-api-bilan-ishlash)
- [CRUD tushunchasi](#crud-tushunchasi)
- [Bugun o‘rganilgan Python va FastAPI tushunchalari](#bugun-organilgan-python-va-fastapi-tushunchalari)
- [Xatolar va ularning yechimlari](#xatolar-va-ularning-yechimlari)
- [Keyingi bosqich: SPA frontend](#keyingi-bosqich-spa-frontend)
- [O‘rganish uchun mashqlar](#organish-uchun-mashqlar)

## Loyiha maqsadi

Ushbu loyihada foydalanuvchi vazifalar bilan quyidagi amallarni bajara oladigan backend yaratiladi:

- Barcha vazifalarni ko‘rish.
- Bitta vazifani ID orqali topish.
- Yangi vazifa yaratish.
- Mavjud vazifani tahrirlash.
- Vazifani bajarilgan deb belgilash.
- Vazifani o‘chirish.

Har bir vazifa quyidagi ma'lumotlardan tashkil topadi:

| Maydon | Turi | Vazifasi |
|---|---|---|
| `id` | Integer | Vazifaning noyob identifikatori |
| `title` | String | Vazifa nomi |
| `description` | Text yoki null | Vazifa tavsifi |
| `is_completed` | Boolean | Vazifa bajarilgan yoki bajarilmaganligi |

Masalan:

```json
{
  "id": 1,
  "title": "FastAPI o‘rganish",
  "description": "Birinchi API loyiham",
  "is_completed": false
}
```

## Texnologiyalar

| Texnologiya | Vazifasi |
|---|---|
| Python | Asosiy dasturlash tili |
| FastAPI | HTTP API va endpointlar yaratish |
| Uvicorn | ASGI server orqali ilovani ishga tushirish |
| SQLAlchemy | Python obyektlari orqali SQL bazasi bilan ishlash |
| SQLite | Ma'lumotlarni faylda saqlash |
| Pydantic | Ma'lumotlarni tekshirish va validatsiya qilish |
| Pydantic Settings | `.env` va konfiguratsiyani boshqarish |
| PowerShell | HTTP so‘rovlarini yuborish va API'ni sinash |
| Vanilla JavaScript | Rejalashtirilgan frontend logikasi |
| Tailwind CSS | Rejalashtirilgan frontend dizayni |

## Loyiha tuzilishi

```text
02/
└── app/
    ├── .env
    ├── main.py
    ├── config.py
    ├── database.py
    ├── create_tables.py
    ├── index.html              # SPA bosqichida yaratiladi
    │
    ├── models/
    │   └── task.py
    │
    ├── schemas/
    │   └── task.py
    │
    ├── repositories/
    │   └── task.py
    │
    ├── services/
    │   └── task.py
    │
    ├── routers/
    │   └── task.py
    │
    └── tasks.db                # SQLite fayli yaratilishi mumkin
```

Virtual muhit loyiha ichida alohida joylashgan:

```text
learn-fastapi/
└── venv/
```

`index.html` hozircha SPA bosqichida yaratiladigan fayl sifatida ko‘rsatilgan. SQLite faylining aniq joylashuvi ilova qaysi ishchi katalogdan ishga tushirilishiga bog‘liq.

## Arxitektura

Loyiha kodni mas'uliyatlar bo‘yicha ajratishga asoslangan.

```text
Client / Browser / PowerShell
             |
             v
       FastAPI Router
             |
             v
          Service
             |
             v
         Repository
             |
             v
      SQLAlchemy Session
             |
             v
         SQLite DB
```

### 1. `main.py` — ilovaning kirish nuqtasi

FastAPI ilovasini yaratadi va kerakli routerlarni ro‘yxatdan o‘tkazadi.

Asosiy vazifalari:

- `FastAPI()` orqali ilova yaratish.
- Konfiguratsiyadan foydalanish.
- Task routerini ulash.
- Bosh sahifa endpointini taqdim etish.
- Ilovani Uvicorn orqali ishga tushirish imkonini berish.

### 2. `config.py` — konfiguratsiya

Ilovaning nomi, debug rejimi va database manzili kabi sozlamalarni boshqaradi.

### 3. `database.py` — database ulanishi

SQLAlchemy engine, session factory, deklarativ `Base` va database session dependency'sini belgilaydi.

### 4. `models/task.py` — database modeli

`Task` klassi SQLAlchemy orqali `tasks` jadvalini ifodalaydi.

### 5. `schemas/task.py` — ma'lumotlar sxemalari

API qabul qiladigan va qaytaradigan ma'lumotlar shaklini belgilaydi.

### 6. `repositories/task.py` — database amallari

Ma'lumotlarni olish, yaratish, yangilash va o‘chirish bilan shug‘ullanadi.

### 7. `services/task.py` — biznes logika

Vazifalar bilan bog‘liq qoidalarni boshqaradi. Masalan, mavjud bo‘lmagan vazifa so‘ralsa, `404 Not Found` xatosini chiqaradi.

### 8. `routers/task.py` — HTTP endpointlar

HTTP so‘rovlarini qabul qiladi, kerakli service funksiyasini chaqiradi va natijani mijozga qaytaradi.

**Muhim tamoyil:** router HTTP bilan, service biznes qoidalari bilan, repository esa ma'lumotlar bazasi bilan ishlaydi. Bu mas'uliyatlarni ajratish kodni tushunish va test qilishni osonlashtiradi.

## O‘rnatish va ishga tushirish

### 1. Virtual muhitni faollashtirish

Windows PowerShell orqali loyiha papkasiga o‘t:

```powershell
cd D:\Github\learn-fastapi
.\venv\Scripts\Activate.ps1
```

Virtual muhit faol bo‘lganda terminal boshida `(venv)` yozuvi ko‘rinadi.

### 2. Kerakli kutubxonalarni o‘rnatish

Agar ular hali o‘rnatilmagan bo‘lsa:

```powershell
python -m pip install fastapi "uvicorn[standard]" sqlalchemy pydantic-settings
```

### 3. Ilovani ishga tushirish

Hozirgi importlar `app` papkasidagi ishchi katalogga moslangan. Shuning uchun quyidagi usuldan foydalan:

```powershell
cd D:\Github\learn-fastapi\learning\02\app
python -m uvicorn main:app --reload
```

`--reload` kod o‘zgarganda ishlab turgan serverni avtomatik qayta yuklash uchun xizmat qiladi. Bu ishlab chiqish vaqtida qulay; production server uchun mo‘ljallanmagan.

Server odatda quyidagi manzilda ishlaydi:

- Ilova: http://127.0.0.1:8000/
- Swagger API hujjatlari: http://127.0.0.1:8000/docs
- OpenAPI sxemasi: http://127.0.0.1:8000/openapi.json

`main.py` hali `index.html` bilan integratsiya qilinmagan bo‘lsa, bosh sahifada SPA ko‘rinmasligi mumkin. API hujjatlari esa ilova to‘g‘ri ishga tushgan bo‘lsa ochiladi.

## Konfiguratsiya

`app/.env` fayli quyidagi kabi bo‘lishi mumkin:

```dotenv
APP_NAME=Simple TASK API
DEBUG=True
DATABASE_URL=sqlite:///./tasks.db
```

`config.py`:

```python
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "Simple TASK API"
    DEBUG: bool = True
    DATABASE_URL: str = "sqlite:///./tasks.db"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
```

Bu yerda:

- `BaseSettings` — konfiguratsiya qiymatlarini muhit o‘zgaruvchilaridan olishga yordam beradi.
- `APP_NAME` — ilovaning nomi.
- `DEBUG` — debug rejimini boshqaradi.
- `DATABASE_URL` — database ulanish manzili.
- `env_file=".env"` — `.env` faylidan sozlamalarni o‘qishni belgilaydi.
- `extra="ignore"` — tanilmagan qo‘shimcha sozlamalarni e'tiborsiz qoldiradi.

**Eslatma:** `sqlite:///./tasks.db` nisbiy yo‘l hisoblanadi. SQLite fayli odatda jarayonning ishchi katalogiga nisbatan aniqlanadi. Shu sababli serverni boshqa katalogdan ishga tushirish database faylining boshqa joyda yaratilishiga olib kelishi mumkin.

## Ma'lumotlar bazasi

`database.py`:

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from config import settings


engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False},
)


SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
```

### Asosiy tushunchalar

- `create_engine()` — database bilan ishlash uchun engine yaratadi.
- `sessionmaker()` — database session obyektlarini yaratish uchun factory hosil qiladi.
- `SessionLocal` — database amallarida ishlatiladigan session factory.
- `DeclarativeBase` — SQLAlchemy modellarining bazaviy klassi.
- `get_db()` — so‘rov uchun session beradi va ish tugagach uni yopadi.
- `yield` — dependency'dan sessionni endpointga uzatadi.
- `finally` — bajarilish qanday yakunlanishidan qat'i nazar sessionni yopishga yordam beradi.
- `check_same_thread=False` — SQLite ulanishining thread bo‘yicha cheklovini yumshatadi; bu SQLite'ni barcha concurrent yuklamalar uchun cheksiz xavfsiz qilib qo‘ymaydi.

### Jadvallarni yaratish

`create_tables.py`:

```python
from database import Base, engine
from models.task import Task

Base.metadata.create_all(bind=engine)

print("Jadvallar muvaffaqiyatli yaratildi!")
```

Bu fayl ishga tushirilganda:

1. `Task` modeli import qilinadi.
2. Model `Base.metadata` tarkibida ro‘yxatdan o‘tadi.
3. `create_all()` mavjud bo‘lmagan jadvallarni yaratadi.

`create_all()` mavjud jadvallarni avtomatik ravishda to‘liq migratsiya qilmaydi. Kelajakda model strukturasi o‘zgarsa, migratsiya vositasidan foydalanish talab qilinishi mumkin.

## Model va schema

### SQLAlchemy modeli

`models/task.py`:

```python
from sqlalchemy import Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    is_completed: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )
```

- `__tablename__` — database jadvali nomini belgilaydi.
- `Mapped[int]` — ustun qiymatining Python tipini bildiradi.
- `mapped_column()` — database ustunining xususiyatlarini belgilaydi.
- `primary_key=True` — `id` ustunini asosiy kalit qiladi.
- `nullable=False` — ustunda `NULL` bo‘lishiga ruxsat bermaydi.
- `String(200)` — matn ustuniga 200 belgilik cheklov belgilaydi.
- `Text` — uzunroq tavsif uchun ishlatiladi.
- `default=False` — yangi vazifa bajarilmagan holatdan boshlanishini belgilaydi.

### Pydantic sxemalari

`schemas/task.py`:

```python
from pydantic import BaseModel, ConfigDict, Field


class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str | None = None


class TaskUpdate(BaseModel):
    title: str | None = Field(
        default=None,
        min_length=1,
        max_length=200,
    )
    description: str | None = None
    is_completed: bool | None = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None
    is_completed: bool

    model_config = ConfigDict(from_attributes=True)
```

Uchta schema turli vazifalarni bajaradi:

- `TaskCreate` — yangi vazifa yaratishda qabul qilinadigan ma'lumotlar.
- `TaskUpdate` — mavjud vazifani qisman yangilashda qabul qilinadigan ma'lumotlar.
- `TaskResponse` — API mijozga qaytaradigan ma'lumotlar.

`Field(min_length=1, max_length=200)` nom uchun uzunlik cheklovlarini belgilaydi. Faqat bo‘sh joydan iborat nomni taqiqlash kerak bo‘lsa, qo‘shimcha validatsiya ham talab qilinadi.

`ConfigDict(from_attributes=True)` SQLAlchemy obyektidan Pydantic javob sxemasini yaratishga imkon beradi.

## API endpointlari

| HTTP metodi | Endpoint | Vazifasi |
|---|---|---|
| GET | `/tasks/` | Barcha vazifalarni olish |
| GET | `/tasks/{task_id}` | ID orqali bitta vazifani olish |
| POST | `/tasks/` | Yangi vazifa yaratish |
| PATCH | `/tasks/{task_id}` | Vazifani qisman yangilash |
| DELETE | `/tasks/{task_id}` | Vazifani o‘chirish |

### `GET /tasks/`

Barcha vazifalarni qaytaradi.

```http
GET /tasks/
```

Javob:

```json
[
  {
    "id": 1,
    "title": "FastAPI o‘rganish",
    "description": "Birinchi API loyiham",
    "is_completed": false
  }
]
```

Ro‘yxat bo‘sh bo‘lsa, odatda bo‘sh massiv `[]` qaytadi.

### `GET /tasks/{task_id}`

Bitta vazifani ID bo‘yicha topadi.

```http
GET /tasks/1
```

Agar vazifa mavjud bo‘lmasa, service qatlamida `404 Not Found` xatosi qaytarilishi kerak.

### `POST /tasks/`

Yangi vazifa yaratadi.

```http
POST /tasks/
Content-Type: application/json
```

So‘rov tanasi:

```json
{
  "title": "FastAPI o‘rganish",
  "description": "Birinchi API loyiham"
}
```

Muvaffaqiyatli yaratilganda `201 Created` holat kodi va yaratilgan vazifa qaytarilishi kutiladi.

### `PATCH /tasks/{task_id}`

Mavjud vazifaning faqat kerakli maydonlarini yangilaydi.

Masalan, vazifani bajarilgan deb belgilash:

```http
PATCH /tasks/1
Content-Type: application/json
```

```json
{
  "is_completed": true
}
```

Yoki nomni o‘zgartirish:

```json
{
  "title": "FastAPI va SQLAlchemy o‘rganish"
}
```

### `DELETE /tasks/{task_id}`

Vazifani o‘chiradi.

```http
DELETE /tasks/1
```

Agar endpoint `204 No Content` qaytarsa, muvaffaqiyatli o‘chirish javobida JSON tanasi bo‘lmaydi.

## PowerShell orqali API bilan ishlash

Server ishlab turgan paytda boshqa PowerShell oynasini ochib, quyidagi buyruqlarni bajarish mumkin.

### 1. Barcha vazifalarni olish

```powershell
Invoke-RestMethod `
    -Uri "http://127.0.0.1:8000/tasks/" `
    -Method Get
```

### 2. Yangi vazifa yaratish

```powershell
$body = @{
    title = "FastAPI o‘rganish"
    description = "PowerShell orqali API bilan ishlash"
} | ConvertTo-Json

Invoke-RestMethod `
    -Uri "http://127.0.0.1:8000/tasks/" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

Javobda yaratilgan vazifaning `id` qiymati ko‘rsatiladi. Keyingi amallarda aynan shu ID'dan foydalanish kerak.

### 3. Bitta vazifani olish

Quyidagi misolda `2` — vazifaning ID raqami:

```powershell
Invoke-RestMethod `
    -Uri "http://127.0.0.1:8000/tasks/2" `
    -Method Get
```

### 4. Vazifani bajarilgan deb belgilash

```powershell
$body = @{
    is_completed = $true
} | ConvertTo-Json

Invoke-RestMethod `
    -Uri "http://127.0.0.1:8000/tasks/2" `
    -Method Patch `
    -ContentType "application/json" `
    -Body $body
```

Bajarilmagan holatga qaytarish uchun `$true` o‘rniga `$false` ishlatiladi.

### 5. Vazifani tahrirlash

```powershell
$body = @{
    title = "Yangilangan vazifa"
} | ConvertTo-Json

Invoke-RestMethod `
    -Uri "http://127.0.0.1:8000/tasks/2" `
    -Method Patch `
    -ContentType "application/json" `
    -Body $body
```

### 6. Vazifani o‘chirish

```powershell
Invoke-RestMethod `
    -Uri "http://127.0.0.1:8000/tasks/2" `
    -Method Delete
```

`204 No Content` holatida PowerShell ekranga hech qanday ma'lumot chiqarmasligi mumkin. Bu xato degani emas.

O‘chirilgan vazifani qayta olishga urinish odatda `404 Not Found` natijasini beradi.

## CRUD tushunchasi

CRUD — ma'lumotlar bilan bajariladigan to‘rtta asosiy amal.

| Amal | Ma'nosi | HTTP metodi |
|---|---|---|
| Create | Yaratish | POST |
| Read | O‘qish | GET |
| Update | Yangilash | PATCH |
| Delete | O‘chirish | DELETE |

Ushbu loyihada CRUD amallari HTTP endpointlari orqali ishlaydi.

Masalan, foydalanuvchi frontenddagi yangi vazifa formasini yuboradi. JavaScript `POST` so‘rovi yuboradi, router service'ni chaqiradi, service repository'ga murojaat qiladi va repository vazifani database'ga yozadi.

## Bugun o‘rganilgan Python va FastAPI tushunchalari

### `import`

Boshqa moduldan kerakli klass yoki funksiyani olib keladi.

```python
from database import Base
from models.task import Task
```

Birinchi qatorda `Base`, ikkinchisida `Task` import qilinadi.

### Type hints

Funksiya parametri yoki qaytadigan qiymatning kutilgan turini ko‘rsatadi.

```python
def get_by_id(db: Session, task_id: int) -> Task | None:
    return db.get(Task, task_id)
```

- `db: Session` — SQLAlchemy session kutiladi.
- `task_id: int` — ID butun son bo‘lishi kerak.
- `Task | None` — vazifa topilsa `Task`, topilmasa `None` qaytishi mumkin.

### `def`

Funksiya yaratish uchun ishlatiladi.

```python
def get_all(db: Session) -> list[Task]:
    statement = select(Task).order_by(Task.id)
    return list(db.scalars(statement).all())
```

### `return`

Funksiya natijasini chaqirgan joyiga qaytaradi.

### `if`

Shartni tekshiradi.

```python
if task is None:
    raise HTTPException(
        status_code=404,
        detail="Vazifa topilmadi",
    )
```

### `try`, `finally` va `yield`

`get_db()` funksiyasida `yield` sessionni endpointga beradi, `finally` esa so‘rov tugagach sessionni yopadi.

### `db.add()`, `db.commit()` va `db.refresh()`

Repository'dagi yozish amallarida ishlatiladi:

- `db.add(task)` — obyektni sessionga qo‘shadi.
- `db.commit()` — tranzaksiyani tasdiqlaydi.
- `db.refresh(task)` — obyekt qiymatlarini database'dan yangilaydi.

### `setattr()`

Obyektning atributini nomi orqali o‘zgartiradi.

```python
setattr(task, field, value)
```

Bu usul `PATCH` so‘rovida kelgan maydonlarni dinamik yangilash uchun ishlatiladi.

### `model_dump()`

Pydantic modelini Python lug‘atiga aylantiradi.

```python
update_data = task_data.model_dump(exclude_unset=True)
```

`exclude_unset=True` so‘rovda umuman yuborilmagan maydonlarni natijadan chiqaradi. Shu sababli faqat `is_completed` yuborilsa, qolgan maydonlarni keraksiz ravishda o‘zgartirishga urinish bo‘lmaydi.

### `Depends()`

FastAPI dependency injection mexanizmi orqali kerakli obyekt yoki resursni endpointga uzatadi.

```python
def get_tasks(db: Session = Depends(get_db)):
    return task_service.get_all_tasks(db)
```

FastAPI `get_db()` dependency'sini chaqirib, sessionni `db` parametriga beradi.

### `response_model`

API javobining shaklini belgilaydi.

```python
@router.get("/", response_model=list[TaskResponse])
```

Bu endpoint vazifalar ro‘yxatini `TaskResponse` sxemasi asosida qaytarishini bildiradi.

## Xatolar va ularning yechimlari

Bugungi ish davomida bir nechta muhim xato turlarini ko‘rdik.

### 1. `ModuleNotFoundError: No module named 'app'`

**Sabab:** joriy katalog `app` papkasining o‘zi bo‘lganda `from app.config import settings` importi ishlamagan.

**Yechim:** joriy import uslubiga mos ravishda:

```python
from config import settings
```

Import uslubi loyiha qayerdan ishga tushirilayotganiga bog‘liq. Keyinchalik paket sifatida ishga tushirish uchun importlarni bir xil uslubga keltirish mumkin.

### 2. `TypeError` — `connect_Args`

**Sabab:** SQLAlchemy parametr nomi noto‘g‘ri yozilgan.

Noto‘g‘ri:

```python
connect_Args={"check_same_thread": False}
```

To‘g‘ri:

```python
connect_args={"check_same_thread": False}
```

Python'da katta-kichik harflar muhim.

### 3. `default` parametrining noto‘g‘ri yozilishi

Noto‘g‘ri:

```python
defalut=False
```

To‘g‘ri:

```python
default=False
```

Nomlangan argumentlar aynan kutubxona talab qilgan nomda yozilishi kerak.

### 4. `AttributeError` — `sclaars`

**Sabab:** SQLAlchemy session metodining nomi xato yozilgan.

Noto‘g‘ri:

```python
db.sclaars(statement)
```

To‘g‘ri:

```python
db.scalars(statement)
```

Xatolikdagi `Did you mean: 'scalars'?` tavsiyasi kerakli metodni topishga yordam bergan.

### 5. `ResponseValidationError` — `desciption`

**Sabab:** javob sxemasida maydon nomi noto‘g‘ri yozilgan.

Noto‘g‘ri:

```python
desciption: str | None
```

To‘g‘ri:

```python
description: str | None
```

FastAPI javobni `response_model` bilan tekshiradi. Schema va SQLAlchemy modelidagi maydon nomlari mos bo‘lishi kerak.

### 6. `TypeError: get_task() missing 1 required positional argument: 'int'`

**Sabab:** `get_task()` funksiyasi ta'rifi yoki chaqiruvida parametrlar noto‘g‘ri ko‘rsatilgan.

To‘g‘ri ko‘rinish:

```python
def get_task(db: Session, task_id: int) -> Task:
    ...
```

`task_id: int` — bitta parametr va uning tip ko‘rsatmasi. `int` alohida parametr sifatida yozilmasligi kerak.

### 7. `TypeError` — `model_dump(include=True)`

**Sabab:** `include` argumenti `True` kabi Boolean qiymatni emas, maydonlar to‘plami yoki lug‘atini kutadi.

Noto‘g‘ri:

```python
update_data = task_data.model_dump(include=True)
```

To‘g‘ri:

```python
update_data = task_data.model_dump(exclude_unset=True)
```

Bu yechim `PATCH` so‘rovlarida faqat yuborilgan maydonlarni yangilashga yordam beradi.

### Xatolarni tuzatish usuli

1. Traceback'ning oxiridagi xato turini top.
2. Qaysi loyiha fayli va qaysi qator ko‘rsatilganini aniqlagin.
3. Xatoni chiqargan funksiyani tekshir.
4. Argumentlar, maydon nomlari va importlarni solishtir.
5. Kichik o‘zgarish kiritib, so‘rovni qayta yubor.
6. Faqat bitta endpoint emas, tegishli boshqa endpointlarni ham tekshir.

## Keyingi bosqich: SPA frontend

Backend ishlashi tasdiqlangandan keyin unga bitta `index.html` fayli orqali frontend qo‘shish rejalashtirilgan.

### Frontend texnologiyalari

- HTML5.
- Vanilla JavaScript.
- Tailwind CSS CDN.
- `fetch()` orqali HTTP so‘rovlari.

React, Vue, npm yoki frontend build tizimi talab qilinmaydi.

### Rejalashtirilgan funksiyalar

- Zamonaviy dashboard.
- Jami, bajarilgan va bajarilmagan vazifalar statistikasi.
- Yangi vazifa yaratish formasi.
- Vazifani tahrirlash.
- Vazifani bajarilgan deb belgilash.
- O‘chirishni tasdiqlash oynasi.
- Qidiruv, filtr va saralash.
- Loading, xato va bo‘sh ro‘yxat holatlari.
- Mobil va desktop ekranlarga mos dizayn.

### Frontend va backend o‘rtasidagi aloqa

```text
index.html
    |
    | fetch("/tasks/")
    v
FastAPI Router
    |
    v
Service
    |
    v
Repository
    |
    v
SQLite
```

Frontend va backend bir xil origin orqali ishlasa, odatda CORS sozlamalarini qo‘shish talab qilinmaydi.

### `main.py` orqali HTML sahifani taqdim etish

Agar `main.py` va `index.html` bir papkada bo‘lsa, fayl yo‘lini ishchi katalogga bog‘lab qo‘ymaslik uchun `pathlib` ishlatish mumkin:

```python
from pathlib import Path

from fastapi.responses import FileResponse


BASE_DIR = Path(__file__).resolve().parent


@app.get("/", include_in_schema=False)
def home():
    return FileResponse(BASE_DIR / "index.html")
```

Bu kod mavjud `app` va routerlarni yaratish qismiga mos joyda qo‘shilishi kerak. Agar `GET /` endpointi allaqachon mavjud bo‘lsa, uni takroran ro‘yxatdan o‘tkazmaslik lozim.

## O‘rganish uchun mashqlar

Quyidagi mashqlar mavzularni mustahkamlash uchun mo‘ljallangan.

### Boshlang‘ich

- [ ] `GET /tasks/` qanday ishlashini tushuntirish.
- [ ] `POST /tasks/` orqali uchta vazifa yaratish.
- [ ] Har bir vazifani ID orqali olish.
- [ ] `is_completed` qiymatini `true` va `false` ga o‘zgartirish.
- [ ] Bitta vazifani o‘chirib, `404` javobini tekshirish.

### O‘rta

- [ ] Repository va service o‘rtasidagi farqni tushuntirish.
- [ ] `TaskCreate`, `TaskUpdate` va `TaskResponse` vazifalarini izohlash.
- [ ] `Depends(get_db)` nima qilayotganini tushuntirish.
- [ ] `exclude_unset=True` ishlatilish sababini misol bilan ko‘rsatish.
- [ ] Bo‘sh yoki 200 belgidan uzun nom yuborib validatsiyani tekshirish.
- [ ] `create_tables.py` va `Base.metadata.create_all()` vazifasini tushuntirish.

### Amaliy loyiha

- [ ] `index.html` faylini yaratish.
- [ ] FastAPI orqali bosh sahifani ko‘rsatish.
- [ ] `fetch()` bilan vazifalarni yuklash.
- [ ] Forma orqali yangi vazifa yaratish.
- [ ] Vazifani qisman yangilash.
- [ ] O‘chirishni tasdiqlash oynasini yaratish.
- [ ] Qidiruv va filtr qo‘shish.
- [ ] Mobil qurilmalar uchun responsive dizayn yaratish.

## Loyiha holati

Ushbu loyiha FastAPI bilan ishlashni bosqichma-bosqich o‘rganish uchun ishlab chiqilmoqda.

Backend qatlamlari, SQLAlchemy modeli, Pydantic sxemalari, repository, service, router va CRUD endpointlari o‘rganildi. PowerShell orqali haqiqiy HTTP so‘rovlari yuborilib, bir nechta kod xatolari aniqlanib tuzatildi.

SPA frontend esa keyingi bosqich bo‘lib, u mavjud backend bilan integratsiya qilinishi kerak.

**Asosiy maqsad:** FastAPI, ma'lumotlar bazasi, REST API va Vanilla JavaScript frontend birgalikda qanday ishlashini tushunish hamda shu bilimlar asosida to‘liq ishlaydigan vazifalar boshqaruv ilovasini yaratish.