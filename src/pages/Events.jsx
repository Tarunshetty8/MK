import { useState, useContext } from 'react';
import { Search, Plus, Calendar as CalendarIcon, MapPin, Edit, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';
import { DataContext } from '../context/DataContext';
import './Pages.css';

export default function Events() {
    const { events, addEvent, editEvent, deleteEvent } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('Upcoming');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    const filteredEvents = events.filter(e => {
        const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'All' || e.status === filter;
        return matchesSearch && matchesFilter;
    });

    const handleDelete = (evt) => {
        setEventToDelete(evt);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (eventToDelete) {
            deleteEvent(eventToDelete.id);
            setIsDeleteModalOpen(false);
            setEventToDelete(null);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const eventData = {
            title: document.getElementById('e-title').value,
            date: document.getElementById('e-date').value,
            maxAttendees: parseInt(document.getElementById('e-max').value, 10),
            location: document.getElementById('e-loc').value,
        };

        if (editingEvent) {
            editEvent({ ...editingEvent, ...eventData });
        } else {
            addEvent(eventData);
        }
        setIsModalOpen(false);
    };

    const openEditModal = (evt = null) => {
        setEditingEvent(evt);
        setIsModalOpen(true);
    };

    return (
        <div className="page-container">
            <div className="page-header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1>Events Calendar</h1>
                    <p className="subtitle">Manage public events, workshops, and RSVP links.</p>
                </div>
                <button className="btn btn-primary" style={{ display: 'flex', gap: '8px' }} onClick={() => openEditModal()}>
                    <Plus size={16} /> Create Event
                </button>
            </div>

            <div className="panel">
                <div className="panel-header" style={{ background: 'var(--bg-main)' }}>
                    <div className="search-bar" style={{ width: '100%', maxWidth: '400px', backgroundColor: 'var(--bg-card)' }}>
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <button className={`btn btn-outline btn-sm ${filter === 'Upcoming' ? 'active' : ''}`} onClick={() => setFilter('Upcoming')}>Upcoming</button>
                        <button className={`btn btn-outline btn-sm ${filter === 'Past' ? 'active' : ''}`} onClick={() => setFilter('Past')}>Past Events</button>
                        <button className={`btn btn-outline btn-sm ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Event Title</th>
                                <th>Date & Time</th>
                                <th>Location</th>
                                <th>Attendees</th>
                                <th>Status</th>
                                <th align="right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No events found.</td>
                                </tr>
                            )}
                            {filteredEvents.map(event => (
                                <tr key={event.id}>
                                    <td className="fw-600">{event.title}</td>
                                    <td>
                                        <div className="flex-center" style={{ gap: '0.5rem' }}>
                                            <CalendarIcon size={14} className="text-muted" />
                                            <span className="fw-500">{new Date(event.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex-center" style={{ gap: '0.5rem' }}>
                                            <MapPin size={14} className="text-muted" /> <span className="text-muted text-small">{event.location}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ width: '100px', marginBottom: '0.25rem', background: 'var(--bg-main)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{ width: `${(event.attendees / event.maxAttendees) * 100}%`, backgroundColor: 'var(--primary)', height: '100%' }}></div>
                                        </div>
                                        <span className="text-small fw-600">{event.attendees} / {event.maxAttendees}</span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${event.status === 'Upcoming' ? 'bg-success' : 'bg-muted'}`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td align="right">
                                        <div className="action-buttons justify-end">
                                            <button className="icon-btn" title="Edit Event" onClick={() => openEditModal(event)}><Edit size={18} /></button>
                                            <button className="icon-btn danger" title="Cancel Event" onClick={() => handleDelete(event)}><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingEvent ? "Edit Event" : "Create Event"}
                footer={
                    <>
                        <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleSave}>Save Event</button>
                    </>
                }
            >
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSave}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Event Title</label>
                        <input type="text" id="e-title" className="form-input" defaultValue={editingEvent?.title || ''} placeholder="e.g. Pasta Making Workshop" required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Date & Time</label>
                            <input type="datetime-local" id="e-date" className="form-input" defaultValue={editingEvent?.date ? editingEvent.date.substring(0, 16) : ''} required />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Max Attendees</label>
                            <input type="number" id="e-max" className="form-input" defaultValue={editingEvent?.maxAttendees || 15} required />
                        </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Location</label>
                        <input type="text" id="e-loc" className="form-input" defaultValue={editingEvent?.location || ''} placeholder="e.g. Main Kitchen" required />
                    </div>
                </form>
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Event"
                footer={
                    <>
                        <button className="btn btn-outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary bg-danger" style={{ border: 'none', color: 'white' }} onClick={confirmDelete}>Delete</button>
                    </>
                }
            >
                <div style={{ padding: '1rem 0' }}>
                    <p style={{ margin: 0, color: 'var(--text-main)' }}>
                        Are you sure you want to delete <strong>{eventToDelete?.title}</strong>? 
                        This action cannot be undone.
                    </p>
                </div>
            </Modal>
        </div>
    );
}
