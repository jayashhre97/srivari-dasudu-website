/** Shared Kamyamu homam pricing (INR) */
export const KAMYAMU_PRICE_WITHOUT_SAMAGRI = 15000;
export const KAMYAMU_PRICE_WITH_SAMAGRI = 20000;

export const KAMYAMU_PAYMENT = {
  upiId: 'srivaridasudu@sbi',
  merchantName: 'Sri Vari Dasudu Adyatmika Kuteer',
  bank: {
    accountName: 'Sri Vari Dasudu Adyatmika Kuteer',
    bankName: 'State Bank of India',
    accountNumber: '12345678901',
    ifsc: 'SBIN0001234',
    branch: 'Visakhapatnam Main Branch'
  },
  /** Set VITE_RAZORPAY_KEY_ID in .env to enable live Razorpay Checkout */
  razorpayKeyEnv: 'VITE_RAZORPAY_KEY_ID'
};

export function getKamyamuAmount(samagriMode) {
  return samagriMode === 'with'
    ? KAMYAMU_PRICE_WITH_SAMAGRI
    : KAMYAMU_PRICE_WITHOUT_SAMAGRI;
}

export function formatInr(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

export function buildUpiPayLink({ amount, note }) {
  const params = new URLSearchParams({
    pa: KAMYAMU_PAYMENT.upiId,
    pn: KAMYAMU_PAYMENT.merchantName,
    am: String(amount),
    cu: 'INR',
    tn: note || 'Kamyamu Homam Booking'
  });
  return `upi://pay?${params.toString()}`;
}
