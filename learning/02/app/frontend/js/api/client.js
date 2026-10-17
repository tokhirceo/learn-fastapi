function errorMessage(status, data) {
  if (status === 404) return "Vazifa topilmadi. U allaqachon o‘chirilgan bo‘lishi mumkin.";
  if (status === 422) return "Kiritilgan ma’lumotlar noto‘g‘ri. Maydonlarni tekshirib, qayta urinib ko‘ring.";
  if (status >= 500) return "Serverda xatolik yuz berdi. Birozdan so‘ng qayta urinib ko‘ring.";
  if (data && typeof data.detail === "string") return data.detail;
  return "Kutilmagan xatolik yuz berdi. Qayta urinib ko‘ring.";
}

export async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(path, { headers: { "Content-Type": "application/json" }, ...options });
  } catch (e) {
    console.error("Tarmoq xatosi:", e);
    throw new Error("Serverga ulanib bo‘lmadi. Internet va server holatini tekshiring.");
  }
  if (res.status === 204) return null;
  let data = null;
  try { data = await res.json(); } catch (_) { /* bo‘sh yoki JSON bo‘lmagan javob */ }
  if (!res.ok) {
    console.error("API xatosi:", res.status, data);
    throw new Error(errorMessage(res.status, data));
  }
  return data;
}
