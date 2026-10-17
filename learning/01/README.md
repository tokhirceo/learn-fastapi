# FastAPI — 01. Kirish va birinchi API

> FastAPI'ni noldan o‘rganish. Har bir kodni tushunish, amalda bajarish va keyinchalik haqiqiy backend loyihalarini yaratish.

## Mundarija

1. [FastAPI nima?](#1-fastapi-nima)
2. [FastAPI nima uchun kerak?](#2-fastapi-nima-uchun-kerak)
3. [API nima?](#3-api-nima)
4. [HTTP va JSON asoslari](#4-http-va-json-asoslari)
5. [FastAPI'ni o‘rnatish](#5-fastapini-ornatish)
6. [Birinchi FastAPI loyihasi](#6-birinchi-fastapi-loyihasi)
7. [Kodning har bir qatori](#7-kodning-har-bir-qatori)
8. [Dekorator nima?](#8-dekorator-nima)
9. [GET so‘rovi nima?](#9-get-sorovi-nima)
10. [Serverni ishga tushirish](#10-serverni-ishga-tushirish)
11. [Swagger UI va API hujjatlari](#11-swagger-ui-va-api-hujjatlari)
12. [Amaliy mashqlar](#12-amaliy-mashqlar)
13. [Nimalarni o‘rgandik?](#13-nimalarni-organdik)

---

## 1. FastAPI nima?

**FastAPI — Python dasturlash tilida API yaratish uchun mo‘ljallangan zamonaviy web framework.**

FastAPI yordamida server yaratish, mijozlardan keladigan HTTP so‘rovlarini qabul qilish, ma'lumotlarni tekshirish va javoblarni qaytarish mumkin.

Masalan, quyidagi texnologiyalar bilan ishlaydigan loyihalar yaratishimiz mumkin:

- Telegram botlar uchun backend.
- Kino saytlari uchun API.
- Mobil ilovalar uchun server.
- Foydalanuvchilarni ro‘yxatdan o‘tkazish va tizimga kiritish.
- SQLite yoki boshqa ma'lumotlar bazasi bilan ishlaydigan xizmatlar.
- Boshqa dasturlarga ma'lumot taqdim etuvchi web xizmatlar.

FastAPI Python tilida yoziladi. Shuning uchun Python asoslarini bilish uni o‘rganishni ancha osonlashtiradi.

### FastAPI va oddiy Python o‘rtasidagi farq

Oddiy Python dasturi hisob-kitob qilishi, fayllarni qayta ishlashi yoki terminalda ishlashi mumkin.

FastAPI esa Python kodini HTTP orqali murojaat qilish mumkin bo‘lgan web xizmatga aylantirishga yordam beradi.

Masalan, oddiy Python:

```python
def add(a, b):
    return a + b


print(add(5, 3))
```

Natija:

```text
8
```

FastAPI orqali esa shu hisob-kitobni serverga so‘rov yuborish orqali bajarishimiz mumkin.

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/add")
def add():
    return {"result": 5 + 3}
```

`/add` manziliga GET so‘rovi yuborilganda server quyidagi JSON javobini qaytaradi:

```json
{
  "result": 8
}
```

Bu misolda hali foydalanuvchidan sonlarni qabul qilmayapmiz. Hozircha asosiy maqsad — oddiy Python funksiyasi bilan HTTP orqali ishlaydigan API orasidagi farqni tushunish.

---

## 2. FastAPI nima uchun kerak?

Tasavvur qilaylik, biz kino sayti yaratmoqchimiz.

Saytda quyidagi imkoniyatlar bo‘lishi kerak:

- Barcha kinolarni ko‘rish.
- Bitta kino haqida ma'lumot olish.
- Yangi kino qo‘shish.
- Kinoni tahrirlash.
- Kinoni o‘chirish.
- Foydalanuvchini ro‘yxatdan o‘tkazish.
- Foydalanuvchining hisob ma'lumotlarini saqlash.

Bunday vazifalarni bajarish uchun server kerak bo‘ladi.

FastAPI yordamida serverning API qismini yaratamiz. Keyinchalik unga ma'lumotlar bazasi, autentifikatsiya va boshqa imkoniyatlarni qo‘shishimiz mumkin.

### Misol: kino API'si

| HTTP metodi | Manzil | Vazifasi |
|---|---|---|
| `GET` | `/movies` | Kinolar ro‘yxatini olish |
| `GET` | `/movies/1` | Birinchi kino ma'lumotlarini olish |
| `POST` | `/movies` | Yangi kino yaratish |
| `PUT` | `/movies/1` | Kino ma'lumotlarini to‘liq yangilash |
| `PATCH` | `/movies/1` | Kino ma'lumotlarining bir qismini yangilash |
| `DELETE` | `/movies/1` | Kinoni o‘chirish |

Bu jadval API loyihalarida uchraydigan odatiy usulni ko‘rsatadi. Hozircha bu manzillarni yaratmadik.

---

## 3. API nima?

**API — Application Programming Interface**, ya'ni dasturlar o‘zaro muloqot qilishi uchun belgilangan interfeys.

Sodda misol:

Tasavvur qilaylik, mobil ilovamiz foydalanuvchiga kinolar ro‘yxatini ko‘rsatishi kerak.

Mobil ilovaning o‘zida barcha kinolar saqlanmagan. U serverga so‘rov yuboradi:

```text
Mobil ilova → API → Server
```

Server so‘rovni qayta ishlaydi va natijani qaytaradi:

```text
Mobil ilova ← JSON javobi ← Server
```

Masalan:

```json
{
  "id": 1,
  "title": "The Matrix",
  "year": 1999
}
```

Mobil ilova shu javobni olib, ekranda kino nomi va yilini ko‘rsatishi mumkin.

### API nimalarni bajaradi?

1. So‘rovni qabul qiladi.
2. So‘rovdagi ma'lumotlarni tekshiradi.
3. Kerakli amallarni bajaradi.
4. Zarur bo‘lsa, ma'lumotlar bazasiga murojaat qiladi.
5. Natijani mijozga qaytaradi.

API har doim ma'lumotlar bazasi bilan ishlashi shart emas. Birinchi darsimizdagi API hech qanday ma'lumotlar bazasidan foydalanmaydi.

---

## 4. HTTP va JSON asoslari

### 4.1. HTTP nima?

HTTP — mijoz va server o‘rtasida ma'lumot almashish uchun ishlatiladigan protokol.

Mijoz brauzer, mobil ilova yoki boshqa dastur bo‘lishi mumkin.

Masalan, brauzerda quyidagi manzilni ochamiz:

```text
http://127.0.0.1:8000/
```

Brauzer serverga HTTP so‘rovi yuboradi. FastAPI esa so‘rovni qabul qilib, javob qaytaradi.

### 4.2. HTTP metodlari

Eng ko‘p ishlatiladigan HTTP metodlari:

- `GET` — ma'lumot olish.
- `POST` — ma'lumot yuborish yoki yangi resurs yaratish.
- `PUT` — resursni to‘liq yangilash.
- `PATCH` — resursning bir qismini yangilash.
- `DELETE` — resursni o‘chirish.

Hozir birinchi API'ni yaratishda `GET` metodidan foydalanamiz.

### 4.3. JSON nima?

JSON — ma'lumotlarni matn ko‘rinishida ifodalash formati.

Misol:

```json
{
  "name": "Tokhir",
  "age": 21,
  "learning_fastapi": true
}
```

JSON ichida obyektlar, massivlar, satrlar, sonlar, mantiqiy qiymatlar va `null` ishlatilishi mumkin.

FastAPI Python'dagi lug‘at (`dict`) kabi ma'lumotlarni JSON javobiga aylantira oladi.

Python:

```python
return {
    "message": "Salom, jigar!",
    "success": True
}
```

HTTP orqali olinadigan javob:

```json
{
  "message": "Salom, jigar!",
  "success": true
}
```

E'tibor bering: Python'dagi `True` JSON'da `true` ko‘rinishida yoziladi.

---

## 5. FastAPI'ni o‘rnatish

Ushbu qo‘llanmada Windows va PowerShell ishlatiladi.

### 5.1. Python o‘rnatilganini tekshirish

Terminalni ochib, quyidagi buyruqni bajaramiz:

```powershell
python --version
```

Python versiyasi ko‘rsatilishi kerak. Masalan:

```text
Python 3.12.0
```

Bu faqat namuna. O‘zingizda boshqa mos versiya chiqishi mumkin.

Agar `python` buyrug‘i ishlamasa, Python o‘rnatilishini va PATH sozlamalarini tekshirish kerak.

### 5.2. Loyiha papkasini yaratish

```powershell
mkdir fastapi-learning
cd fastapi-learning
```

Birinchi buyruq yangi papka yaratadi. Ikkinchi buyruq esa shu papkaga kiradi.

### 5.3. Virtual muhit yaratish

```powershell
python -m venv .venv
```

Virtual muhit loyihamizning Python paketlarini boshqa loyihalardan ajratib turadi.

Masalan, bir loyihada FastAPI'ning bir versiyasi, boshqa loyihada esa boshqa versiyasi ishlatilishi mumkin.

Virtual muhitni faollashtiramiz:

```powershell
.\.venv\Scripts\Activate.ps1
```

Faollashgandan keyin terminal boshida odatda `(.venv)` belgisi paydo bo‘ladi.

Agar PowerShell skriptni ishga tushirishga ruxsat bermasa, xatolikni tekshirish kerak. Shoshilib tizim xavfsizligi sozlamalarini o‘zgartirmang.

### 5.4. FastAPI'ni o‘rnatish

```powershell
python -m pip install "fastapi[standard]"
```

Bu buyruq FastAPI'ni va standart o‘rnatish tarkibiga kiradigan kerakli vositalarni o‘rnatadi. Ular orasida ishlab chiqish serverini ishga tushirish uchun ishlatiladigan `fastapi` CLI ham bor.

O‘rnatilgan paketlarni tekshirish:

```powershell
python -m pip show fastapi
```

---

## 6. Birinchi FastAPI loyihasi

Loyiha papkasi ichida `main.py` nomli fayl yaratamiz.

Fayl tuzilishi:

```text
fastapi-learning/
├── .venv/
└── main.py
```

`main.py` fayliga quyidagi kodni yozamiz:

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Salom, jigar!"}
```

Mana shu kod bizning birinchi ishlaydigan FastAPI ilovamiz bo‘ladi.

Hozircha loyihamiz juda kichik. Unda faqat bitta manzil — `/` mavjud.

---

## 7. Kodning har bir qatori

Endi kodni qatorma-qator tushunamiz.

### 7.1. FastAPI'ni import qilish

```python
from fastapi import FastAPI
```

`from` va `import` Python'da boshqa modul yoki paketdan kerakli obyektni olish uchun ishlatiladi.

Bu yerda:

- `fastapi` — biz o‘rnatgan paket.
- `FastAPI` — ilova yaratish uchun ishlatiladigan klass.

Agar bu qator bo‘lmasa, quyidagi kodda `FastAPI` nomidan foydalana olmaymiz:

```python
app = FastAPI()
```

### 7.2. Ilova obyektini yaratish

```python
app = FastAPI()
```

Bu qator `FastAPI` klassidan yangi obyekt yaratib, uni `app` nomli o‘zgaruvchiga biriktiradi.

Bu yerda:

- `app` — o‘zimiz tanlagan o‘zgaruvchi nomi.
- `FastAPI()` — ilova obyektini yaratish.
- `=` — hosil bo‘lgan qiymatni o‘zgaruvchiga biriktirish.

`app` nomi majburiy emas, lekin FastAPI loyihalarida keng tarqalgan odatiy nom.

Biz keyingi qatorlarda shu obyekt orqali API manzillarini belgilaymiz.

### 7.3. Dekorator

```python
@app.get("/")
```

Bu qator kodning eng muhim qismlaridan biri.

U FastAPI'ga quyidagini bildiradi:

> Agar `/` manziliga HTTP GET so‘rovi kelsa, unga quyida belgilangan funksiya orqali javob ber.

Bu yerda `@app.get("/")` — Python dekoratoridan foydalanish.

Dekorator tushunchasini keyingi bo‘limda batafsil ko‘rib chiqamiz.

### 7.4. Funksiya yaratish

```python
def home():
    return {"message": "Salom, jigar!"}
```

`def` Python'da funksiya yaratish uchun ishlatiladi.

- `home` — funksiyaning nomi.
- `()` — parametrlar joylashadigan qism. Hozir parametr yo‘q.
- `:` — funksiya tanasi boshlanishini bildiradi.
- Ichkariga surilgan qatorlar — funksiya tanasi.

Funksiya ichidagi:

```python
return {"message": "Salom, jigar!"}
```

qatori Python lug‘atini qaytaradi.

FastAPI ushbu lug‘atni odatda JSON javobiga aylantiradi va mijozga yuboradi.

**Muhim:** `home()` funksiyasi kod yozilishi bilan darhol ishga tushmaydi. Unga tegishli HTTP so‘rovi kelganda FastAPI uni chaqiradi.

---

## 8. Dekorator nima?

Python'da dekorator — funksiya yoki metodga qo‘shimcha xatti-harakat bog‘lash uchun ishlatiladigan mexanizm.

Dekoratorlar `@` belgisi bilan yoziladi.

Oddiy misol:

```python
def greet():
    return "Salom!"


print(greet())
```

Natija:

```text
Salom!
```

Bu yerda `greet()` funksiyasi bevosita chaqirilmoqda.

FastAPI'da esa dekorator yordamida funksiyani HTTP manziliga bog‘lashimiz mumkin:

```python
@app.get("/")
def home():
    return {"message": "Salom!"}
```

Bu kodda `@app.get("/")` dekoratori `home` funksiyasini FastAPI ilovasida `/` manzili uchun GET yo‘nalishi sifatida ro‘yxatdan o‘tkazadi.

### Dekorator qanday yoziladi?

Python'da quyidagi kodni ko‘rib chiqamiz:

```python
def my_decorator(func):
    def wrapper():
        print("Funksiya boshlanishidan oldin")
        result = func()
        print("Funksiya tugaganidan keyin")
        return result

    return wrapper


@my_decorator
def say_hello():
    print("Salom!")


say_hello()
```

Natija:

```text
Funksiya boshlanishidan oldin
Salom!
Funksiya tugaganidan keyin
```

Bu misolda `@my_decorator` quyidagi yozuvning qisqa ko‘rinishidir:

```python
say_hello = my_decorator(say_hello)
```

`my_decorator` funksiyasi asl funksiyani qabul qiladi va uning o‘rniga `wrapper` funksiyasini qaytaradi.

Shu sababli `say_hello()` chaqirilganda qo‘shimcha amallar ham bajariladi.

### FastAPI dekoratori bilan bog‘liqligi

```python
@app.get("/")
def home():
    return {"message": "Salom!"}
```

Bu yerda FastAPI o‘zining dekorator mexanizmidan foydalanib, `home` funksiyasini kerakli HTTP yo‘nalishiga bog‘laydi.

FastAPI dekoratori oddiy `my_decorator` misolidan ko‘ra murakkabroq ishlaydi: u marshrutni ilova tizimida ro‘yxatdan o‘tkazadi, so‘rovlar qanday qayta ishlanishini belgilashga yordam beradi va API hujjatlarini yaratishda ham qatnashadi.

---

## 9. GET so‘rovi nima?

`GET` — serverdan ma'lumot olish uchun ishlatiladigan HTTP metodi.

Bizning kodimizda:

```python
@app.get("/")
def home():
    return {"message": "Salom, jigar!"}
```

`@app.get("/")` ikkita muhim ma'lumotni birlashtiradi:

- `get` — HTTP metodi.
- `"/"` — URL yo‘lining ildiz manzili.

Masalan:

```text
GET http://127.0.0.1:8000/
```

Server quyidagi javobni qaytaradi:

```json
{
  "message": "Salom, jigar!"
}
```

### URL qismlari

```text
http://127.0.0.1:8000/
```

| Qism | Ma'nosi |
|---|---|
| `http://` | HTTP protokoli |
| `127.0.0.1` | Mahalliy kompyuter manzili |
| `8000` | Server tinglayotgan port |
| `/` | URL yo‘li |

`127.0.0.1` mahalliy kompyuteringizni bildiradi. Shu sababli bu manzilni boshqa qurilmadan bevosita ochib bo‘lmaydi.

---

## 10. Serverni ishga tushirish

`main.py` faylini saqlaganimizdan so‘ng terminalni loyiha papkasida ochamiz.

Virtual muhit faollashtirilgan bo‘lishi kerak.

Quyidagi buyruqni bajaramiz:

```powershell
fastapi dev main.py
```

FastAPI CLI ishlab chiqish serverini ishga tushiradi.

Terminalda server manzili ko‘rsatiladi. Odatda u quyidagicha bo‘ladi:

```text
http://127.0.0.1:8000
```

Endi brauzerda shu manzilni ochamiz:

```text
http://127.0.0.1:8000/
```

Kutiladigan javob:

```json
{
  "message": "Salom, jigar!"
}
```

### Serverni to‘xtatish

Terminalga qaytamiz va `Ctrl + C` tugmalarini bosamiz.

Bu ishlab turgan ishlab chiqish serverini to‘xtatadi.

### Kodni o‘zgartirib ko‘rish

Quyidagi qatorni:

```python
return {"message": "Salom, jigar!"}
```

shunday o‘zgartiramiz:

```python
return {"message": "Men FastAPI o‘rganyapman!"}
```

`fastapi dev` odatda kod o‘zgarishlarini kuzatib, ishlab chiqish serverini qayta yuklaydi. Brauzerni yangilab, yangi javobni ko‘rishimiz mumkin.

---

## 11. Swagger UI va API hujjatlari

FastAPI'ning qulay imkoniyatlaridan biri — API hujjatlarini avtomatik yaratishi.

Server ishlab turgan paytda quyidagi manzilni ochamiz:

```text
http://127.0.0.1:8000/docs
```

Bu **Swagger UI** sahifasidir.

U orqali:

- API yo‘nalishlarini ko‘rish;
- HTTP metodlarini ko‘rish;
- so‘rov yuborib sinash;
- javoblarni ko‘rish;
- keyinchalik so‘rov parametrlari va tanadagi ma'lumotlarni tekshirish mumkin.

Bizning birinchi loyihamizda `GET /` yo‘nalishi ko‘rinadi.

Uni ochib, **Try it out** va **Execute** tugmalari orqali so‘rov yuborib ko‘rish mumkin.

FastAPI odatda OpenAPI spetsifikatsiyasi asosida hujjat yaratadi. JSON formatidagi OpenAPI hujjatini quyidagi manzilda ko‘rish mumkin:

```text
http://127.0.0.1:8000/openapi.json
```

---

## 12. Amaliy mashqlar

Endi kodni shunchaki ko‘chirmaymiz. O‘zimiz o‘zgartirib ko‘ramiz.

### Mashq 1. Xabarni o‘zgartirish

Quyidagi kodni o‘zgartiring:

```python
@app.get("/")
def home():
    return {"message": "Salom, jigar!"}
```

Javobda o‘zingiz tanlagan xabar chiqsin.

### Mashq 2. Yangi yo‘nalish yaratish

`main.py` fayliga yangi yo‘nalish qo‘shing:

```python
@app.get("/about")
def about():
    return {
        "project": "FastAPI Learning",
        "lesson": 1
    }
```

Brauzerda quyidagi manzilni oching:

```text
http://127.0.0.1:8000/about
```

Kutiladigan javob:

```json
{
  "project": "FastAPI Learning",
  "lesson": 1
}
```

### Mashq 3. JSON javobini o‘zgartirish

Quyidagi javobni yarating:

```json
{
  "name": "FastAPI",
  "language": "Python",
  "is_learning": true
}
```

Buning uchun Python lug‘atidan foydalaning:

```python
@app.get("/info")
def info():
    return {
        "name": "FastAPI",
        "language": "Python",
        "is_learning": True
    }
```

Eslatma: Python'da `True`, JSON'da esa `true` ishlatiladi.

### Mashq 4. Kodni tushuntirish

Quyidagi savollarga o‘z so‘zlaringiz bilan javob berishga harakat qiling:

1. `app = FastAPI()` nima qiladi?
2. `@app.get("/")` nima uchun kerak?
3. `def home():` nimani anglatadi?
4. `return` nima qiladi?
5. `GET` va `POST` o‘rtasida qanday farq bor?
6. `127.0.0.1:8000` nimani anglatadi?
7. Swagger UI nima uchun kerak?

---

## 13. Nimalarni o‘rgandik?

Birinchi dars yakunida quyidagi tushunchalar bilan tanishdik:

- **FastAPI** — Python yordamida API yaratish framework'i.
- **API** — dasturlar o‘zaro muloqot qilishi uchun interfeys.
- **HTTP** — mijoz va server o‘rtasidagi aloqa protokoli.
- **GET** — ma'lumot olish uchun ishlatiladigan HTTP metodi.
- **JSON** — ma'lumot almashish formati.
- **`FastAPI()`** — ilova obyektini yaratadi.
- **Dekorator** — funksiya yoki metodga qo‘shimcha xatti-harakat bog‘lash mexanizmi.
- **`@app.get("/")`** — funksiyani `/` manzilining GET yo‘nalishiga bog‘laydi.
- **`return`** — funksiyadan qiymat qaytaradi.
- **Uvicorn** — ASGI server; FastAPI ilovasini ishga tushirishda ishlatiladi.
- **Swagger UI** — API'ni brauzer orqali ko‘rish va sinash vositasi.

### Keyingi dars

**02-dars: Path Parameters, Query Parameters va HTTP so‘rovlarini tushunish**

Keyingi darsda quyidagilarni o‘rganamiz:

- `/movies/1` kabi manzillardan parametr olish;
- `/movies?year=1999` kabi query parametrlaridan foydalanish;
- funksiya parametrlarini FastAPI bilan ishlatish;
- turli URL manzillaridan kelgan so‘rovlarga javob qaytarish.

---

## Foydali havolalar

- [FastAPI rasmiy hujjatlari](https://fastapi.tiangolo.com/)
- [FastAPI — Birinchi qadamlar](https://fastapi.tiangolo.com/tutorial/first-steps/)
- [Python — Funksiyalar](https://docs.python.org/3/tutorial/controlflow.html#defining-functions)
- [Python — Dekoratorlar](https://docs.python.org/3/glossary.html#term-decorator)
- [OpenAPI spetsifikatsiyasi](https://www.openapis.org/)

---

**Asosiy qoida:** kodni faqat ko‘chirmang. Har bir qator nima sababdan yozilganini tushuning, uni o‘zgartirib ko‘ring va natijani o‘zingiz tekshiring.

*Muallif: Tokhirbek — FastAPI'ni noldan o‘rganish loyihasi.*
