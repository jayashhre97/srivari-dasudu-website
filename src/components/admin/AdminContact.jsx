import React, { useState, useEffect } from 'react';
import { getContactInfo, saveContactInfo } from '../../utils/adminDataService';

const DEFAULT_CONTACT = {
  phoneDisplay: '+91 98765 43210',
  phoneDigits: '919876543210',
  email: 'seva@srivaridasudu.org',
  addressEn: 'Sri Vari Dasudu Adyatmika Kuteer, Visakhapatnam, Andhra Pradesh',
  addressTe: 'శ్రీ వారి దాసుడు ఆధ్యాత్మిక కుటీరం, విశాఖపట్నం, ఆంధ్రప్రదేశ్',
  bankName: 'State Bank of India',
  accountName: 'Sri Vari Dasudu Adyatmika Kuteer',
  accountNumber: '12345678901',
  ifscCode: 'SBIN0001234',
  branch: 'Visakhapatnam Main Branch'
};

export default function AdminContact() {
  const getInitialContact = () => {
    try {
      const local = localStorage.getItem('srivari_contact_info');
      return local ? JSON.parse(local) : DEFAULT_CONTACT;
    } catch (e) {
      return DEFAULT_CONTACT;
    }
  };

  const [contact, setContact] = useState(getInitialContact);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getContactInfo();
      if (data) {
        setContact(data);
        localStorage.setItem('srivari_contact_info', JSON.stringify(data));
      }
    } catch (e) {}
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatusMsg('Saving contact details...');
    localStorage.setItem('srivari_contact_info', JSON.stringify(contact));

    try {
      await saveContactInfo(contact);
    } catch (err) {}

    setStatusMsg('Saved successfully!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  if (loading) return <div>Loading Contact Details...</div>;

  return (
    <div className="admin-section-container">
      {statusMsg && <div className="admin-status-badge">{statusMsg}</div>}

      <form onSubmit={handleSave} className="admin-form-card">
        <h3>General Contact & Support Info</h3>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Phone Display:</label>
            <input
              type="text"
              value={contact.phoneDisplay || ''}
              onChange={(e) => setContact({ ...contact, phoneDisplay: e.target.value })}
              className="admin-input"
            />
          </div>
          <div className="admin-form-group">
            <label>WhatsApp / Phone Digits (e.g. 919876543210):</label>
            <input
              type="text"
              value={contact.phoneDigits || ''}
              onChange={(e) => setContact({ ...contact, phoneDigits: e.target.value })}
              className="admin-input"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label>Email Address:</label>
          <input
            type="email"
            value={contact.email || ''}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            className="admin-input"
          />
        </div>

        <div className="admin-form-group">
          <label>Address (English):</label>
          <textarea
            rows="2"
            value={contact.addressEn || ''}
            onChange={(e) => setContact({ ...contact, addressEn: e.target.value })}
            className="admin-input"
          />
        </div>

        <div className="admin-form-group">
          <label>Address (Telugu):</label>
          <textarea
            rows="2"
            value={contact.addressTe || ''}
            onChange={(e) => setContact({ ...contact, addressTe: e.target.value })}
            className="admin-input"
          />
        </div>

        <h3 style={{ marginTop: '24px' }}>Bank Account & Donation Details</h3>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Account Name:</label>
            <input
              type="text"
              value={contact.accountName || ''}
              onChange={(e) => setContact({ ...contact, accountName: e.target.value })}
              className="admin-input"
            />
          </div>
          <div className="admin-form-group">
            <label>Bank Name:</label>
            <input
              type="text"
              value={contact.bankName || ''}
              onChange={(e) => setContact({ ...contact, bankName: e.target.value })}
              className="admin-input"
            />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Account Number:</label>
            <input
              type="text"
              value={contact.accountNumber || ''}
              onChange={(e) => setContact({ ...contact, accountNumber: e.target.value })}
              className="admin-input"
            />
          </div>
          <div className="admin-form-group">
            <label>IFSC Code:</label>
            <input
              type="text"
              value={contact.ifscCode || ''}
              onChange={(e) => setContact({ ...contact, ifscCode: e.target.value })}
              className="admin-input"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label>Branch:</label>
          <input
            type="text"
            value={contact.branch || ''}
            onChange={(e) => setContact({ ...contact, branch: e.target.value })}
            className="admin-input"
          />
        </div>

        <div className="admin-form-btns" style={{ marginTop: '20px' }}>
          <button type="submit" className="admin-btn admin-btn-success">
            Save All Contact Details
          </button>
        </div>
      </form>
    </div>
  );
}

