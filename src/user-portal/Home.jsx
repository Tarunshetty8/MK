import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './UserPortal.css';

export default function Home() {
    return (
        <div className="home-page">
            <header className="hero-section">
                <div className="hero-content">
                    <p className="hero-pre-heading">OUR STORY</p>
                    <h1 className="hero-heading">Born from a love of Portuguese food & East London community</h1>
                    <p className="hero-subheading">
                        Marmelo takes its name from the Portuguese word for quince — the fruit behind the world's first jam. We honour that tradition of turning simple, seasonal ingredients into something extraordinary. Every product we make is a small celebration of flavour, craft, and the people we share it with.
                    </p>
                    <div style={{ marginTop: '2.5rem' }}>
                        <Link to="/about" className="primary-pill-btn">
                            Our Full Story <ArrowRight size={18} style={{ marginLeft: '4px' }} />
                        </Link>
                    </div>
                </div>
            </header>

            <section className="events-section">
                <div className="section-header">
                    <div>
                        <p className="section-pre-heading">WHAT'S ON</p>
                        <h2 className="section-heading">Upcoming Events</h2>
                    </div>
                    <Link to="/events" className="see-all-link">See all <ArrowRight size={16} style={{ marginLeft: '4px' }} /></Link>
                </div>

                <div className="events-grid">
                    <div className="event-card">
                        <div className="event-image img-wine">
                            <div className="event-date-badge">
                                <span className="event-month">JUL</span>
                                <span className="event-day">12</span>
                            </div>
                        </div>
                        <div className="event-card-body">
                            <h3>Portuguese Wine & Cheese Evening</h3>
                            <p className="event-desc">Join us for a guided tasting of exceptional Portuguese wines paired with artisan cheeses from Alentejo and...</p>
                            <div className="event-footer">
                                <span className="event-meta">19:00 · 24 spots</span>
                                <Link to="/" className="event-book">Book <ArrowRight size={14} /></Link>
                            </div>
                        </div>
                    </div>

                    <div className="event-card">
                        <div className="event-image img-sourdough">
                            <div className="event-date-badge">
                                <span className="event-month">JUL</span>
                                <span className="event-day">20</span>
                            </div>
                        </div>
                        <div className="event-card-body">
                            <h3>Sourdough Masterclass</h3>
                            <p className="event-desc">Learn to bake your own beautiful sourdough bread from scratch. Take home your own starter, a freshly...</p>
                            <div className="event-footer">
                                <span className="event-meta">10:00 · 8 spots</span>
                                <Link to="/" className="event-book">Book <ArrowRight size={14} /></Link>
                            </div>
                        </div>
                    </div>

                    <div className="event-card">
                        <div className="event-image img-market">
                            <div className="event-date-badge">
                                <span className="event-month">AUG</span>
                                <span className="event-day">3</span>
                            </div>
                        </div>
                        <div className="event-card-body">
                            <h3>Summer Market & Open Kitchen</h3>
                            <p className="event-desc">We're throwing open the doors for our first summer market! Live music, street food, our full product rang...</p>
                            <div className="event-footer">
                                <span className="event-meta">11:00 · 200 spots</span>
                                <Link to="/" className="event-book" style={{ color: '#94a3b8', cursor: 'not-allowed' }}>Fully Booked</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
