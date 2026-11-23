export const HAVANAM_MAX_SLOTS = 25;
const STORAGE_KEY = 'srivari_havanam_slots_v1';

function currentMonthKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { month: currentMonthKey(), bookings: {} };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { month: currentMonthKey(), bookings: {} };
    }
    // Reset counts when the calendar month changes
    if (parsed.month !== currentMonthKey()) {
      return { month: currentMonthKey(), bookings: {} };
    }
    return {
      month: parsed.month,
      bookings: parsed.bookings && typeof parsed.bookings === 'object' ? parsed.bookings : {}
    };
  } catch {
    return { month: currentMonthKey(), bookings: {} };
  }
}

function writeStore(store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Ignore quota / private-mode failures
  }
}

export function getHavanamBookedCount(havanamId) {
  if (!havanamId) return 0;
  const store = readStore();
  const count = Number(store.bookings[havanamId] || 0);
  return Number.isFinite(count) ? Math.max(0, Math.min(HAVANAM_MAX_SLOTS, count)) : 0;
}

export function getHavanamSlotInfo(havanamId) {
  const booked = getHavanamBookedCount(havanamId);
  const remaining = Math.max(0, HAVANAM_MAX_SLOTS - booked);
  return {
    max: HAVANAM_MAX_SLOTS,
    booked,
    remaining,
    isFull: remaining <= 0
  };
}

export function bookHavanamSlot(havanamId) {
  if (!havanamId) return getHavanamSlotInfo(havanamId);
  const store = readStore();
  const current = Number(store.bookings[havanamId] || 0);
  if (current >= HAVANAM_MAX_SLOTS) {
    return getHavanamSlotInfo(havanamId);
  }
  store.bookings[havanamId] = current + 1;
  writeStore(store);
  return getHavanamSlotInfo(havanamId);
}
