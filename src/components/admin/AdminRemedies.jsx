import React, { useState, useEffect } from 'react';
import { REMEDIES_DATA, REMEDY_CATEGORIES } from '../../data/remediesData';
import { getRemedies, saveRemedy, deleteRemedy } from '../../utils/adminDataService';

export default function AdminRemedies() {
  const [categories, setCategories] = useState(REMEDY_CATEGORIES);

  const getInitialRemedies = () => {
    try {
      const local = localStorage.getItem('srivari_remedies');
      return local ? JSON.parse(local) : REMEDIES_DATA;
    } catch (e) {
      return REMEDIES_DATA;
    }
  };

  const [remedies, setRemedies] = useState(getInitialRemedies);
  const [loading, setLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState('financial');
  const [editingRemedy, setEditingRemedy] = useState(null);
  const [editingItem, setEditingItem] = useState(null); // specific item inside category
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getRemedies();
      if (data && data.length > 0) {
        setRemedies(data);
        localStorage.setItem('srivari_remedies', JSON.stringify(data));
      }
    } catch (e) {}
  };

  const currentCategoryData = remedies.find((r) => r.id === selectedCat || r.category === selectedCat);

  const handleSaveCategoryDetails = async (e) => {
    e.preventDefault();
    setStatusMsg('Saving category...');
    const updated = remedies.map((r) => (r.id === editingRemedy.id ? editingRemedy : r));
    setRemedies(updated);
    localStorage.setItem('srivari_remedies', JSON.stringify(updated));

    try {
      await saveRemedy(editingRemedy.id, editingRemedy);
    } catch (e) {}

    setStatusMsg('Category saved!');
    setEditingRemedy(null);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleSaveSubItem = async (e) => {
    e.preventDefault();
    setStatusMsg('Saving remedy item...');
    if (!currentCategoryData) return;

    let updatedItems = [...(currentCategoryData.items || [])];
    const exists = updatedItems.some((it) => it.no === editingItem.no);
    if (exists) {
      updatedItems = updatedItems.map((it) => (it.no === editingItem.no ? editingItem : it));
    } else {
      updatedItems.push(editingItem);
    }

    const updatedCategory = { ...currentCategoryData, items: updatedItems };
    const updatedAll = remedies.map((r) => (r.id === updatedCategory.id ? updatedCategory : r));
    setRemedies(updatedAll);
    localStorage.setItem('srivari_remedies', JSON.stringify(updatedAll));

    try {
      await saveRemedy(updatedCategory.id, updatedCategory);
    } catch (e) {}

    setStatusMsg('Item saved!');
    setEditingItem(null);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleDeleteSubItem = async (no) => {
    if (!window.confirm('Delete this remedy video/item?')) return;
    const updatedItems = (currentCategoryData.items || []).filter((it) => it.no !== no);
    const updatedCategory = { ...currentCategoryData, items: updatedItems };
    const updatedAll = remedies.map((r) => (r.id === updatedCategory.id ? updatedCategory : r));
    setRemedies(updatedAll);
    localStorage.setItem('srivari_remedies', JSON.stringify(updatedAll));

    try {
      await saveRemedy(updatedCategory.id, updatedCategory);
    } catch (e) {}
  };

  const handleAddNewItem = () => {
    const nextNo = (currentCategoryData?.items?.length || 0) + 1;
    setEditingItem({
      no: nextNo,
      title: '',
      titleEn: '',
      titleTe: '',
      youtubeId: '',
      youtubeUrl: '',
      description: '',
      descriptionTe: ''
    });
  };

  if (loading) return <div>Loading Remedies...</div>;

  return (
    <div className="admin-section-container">
      {statusMsg && <div className="admin-status-badge">{statusMsg}</div>}

      {/* Category Tabs */}
      <div className="admin-tabs-bar" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {categories.filter(c => c.id !== 'all').map((cat) => (
          <button
            key={cat.id}
            className={`admin-btn ${selectedCat === cat.id ? 'admin-btn-primary' : 'admin-btn-outline'}`}
            onClick={() => { setSelectedCat(cat.id); setEditingRemedy(null); setEditingItem(null); }}
          >
            {cat.labelEn.split(',')[0]}
          </button>
        ))}
      </div>

      {currentCategoryData ? (
        <div>
          <div className="admin-actions-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2>{currentCategoryData.title}</h2>
              <p style={{ color: '#666' }}>{currentCategoryData.titleTe} • {currentCategoryData.items?.length || 0} Remedies</p>
            </div>
            <div>
              <button className="admin-btn admin-btn-sm" onClick={() => setEditingRemedy(currentCategoryData)}>
                Edit Category Header
              </button>
              <button className="admin-btn admin-btn-primary admin-btn-sm" style={{ marginLeft: '10px' }} onClick={handleAddNewItem}>
                + Add Video / Remedy Item
              </button>
            </div>
          </div>

          {/* Edit Category Modal/Form */}
          {editingRemedy && (
            <form onSubmit={handleSaveCategoryDetails} className="admin-form-card">
              <h3>Edit Category Overview</h3>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Title (English):</label>
                  <input
                    type="text"
                    value={editingRemedy.title || ''}
                    onChange={(e) => setEditingRemedy({ ...editingRemedy, title: e.target.value })}
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Title (Telugu):</label>
                  <input
                    type="text"
                    value={editingRemedy.titleTe || ''}
                    onChange={(e) => setEditingRemedy({ ...editingRemedy, titleTe: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Header Video YouTube ID:</label>
                  <input
                    type="text"
                    value={editingRemedy.youtubeId || ''}
                    onChange={(e) => setEditingRemedy({ ...editingRemedy, youtubeId: e.target.value })}
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Image:</label>
                  <input
                    type="text"
                    value={editingRemedy.image || ''}
                    onChange={(e) => setEditingRemedy({ ...editingRemedy, image: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Description:</label>
                <textarea
                  rows="2"
                  value={editingRemedy.desc || ''}
                  onChange={(e) => setEditingRemedy({ ...editingRemedy, desc: e.target.value })}
                  className="admin-input"
                />
              </div>
              <div className="admin-form-btns">
                <button type="submit" className="admin-btn admin-btn-success">Save Category</button>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setEditingRemedy(null)}>Cancel</button>
              </div>
            </form>
          )}

          {/* Edit Remedy Sub-Item */}
          {editingItem && (
            <form onSubmit={handleSaveSubItem} className="admin-form-card" style={{ marginTop: '20px' }}>
              <h3>{currentCategoryData.items?.some(i => i.no === editingItem.no) ? `Edit Remedy #${editingItem.no}` : 'New Remedy Item'}</h3>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Title (Telugu / Primary):</label>
                  <input
                    type="text"
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    required
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label>YouTube Video ID (e.g. KQNU9mrIK4k):</label>
                  <input
                    type="text"
                    value={editingItem.youtubeId || ''}
                    onChange={(e) => {
                      const yId = e.target.value;
                      setEditingItem({
                        ...editingItem,
                        youtubeId: yId,
                        youtubeUrl: yId ? `https://youtu.be/${yId}` : ''
                      });
                    }}
                    className="admin-input"
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Description:</label>
                <textarea
                  rows="3"
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="admin-input"
                />
              </div>
              <div className="admin-form-btns">
                <button type="submit" className="admin-btn admin-btn-success">Save Item</button>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setEditingItem(null)}>Cancel</button>
              </div>
            </form>
          )}

          {/* Remedies List Table */}
          <div className="admin-table-wrap" style={{ marginTop: '20px' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Remedy Title</th>
                  <th>YouTube ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(currentCategoryData.items || []).map((it) => (
                  <tr key={it.no}>
                    <td><strong>{it.no}</strong></td>
                    <td>
                      <div><strong>{it.title}</strong></div>
                      <div style={{ fontSize: '0.85em', color: '#666', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {it.description}
                      </div>
                    </td>
                    <td>
                      {it.youtubeId ? (
                        <a href={`https://youtu.be/${it.youtubeId}`} target="_blank" rel="noreferrer" style={{ color: '#0066cc' }}>
                          <code>{it.youtubeId}</code>
                        </a>
                      ) : (
                        <span style={{ color: '#999' }}>None</span>
                      )}
                    </td>
                    <td>
                      <button className="admin-btn admin-btn-sm" onClick={() => setEditingItem(it)}>Edit</button>
                      <button className="admin-btn admin-btn-sm admin-btn-danger" style={{ marginLeft: '6px' }} onClick={() => handleDeleteSubItem(it.no)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>Select a category above to view and manage its remedies.</div>
      )}
    </div>
  );
}

