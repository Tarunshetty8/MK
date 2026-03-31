import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './UserPortal.css';

export default function Home() {
    return (
        <div className="home-page">
            <header className="hero-section">
                <div className="hero-content">
                    <p className="hero-pre-heading">OUR STORY</p>
                    <h1 className="hero-heading">Born from a love of exceptional coffee, organic produce & fine wine</h1>
                    <p className="hero-subheading">
                        Marmelo is your neighborhood cafe, organic grocer, and wine cellar. We source the finest seasonal produce, roast our own coffee, and curate a selection of natural wines and craft beers. Every product we stock is a small celebration of flavor, craft, and community.
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
                            <h3>Natural Wine & Cheese Tasting</h3>
                            <p className="event-desc">Join us for a guided tasting of exceptional natural wines paired with artisan cheeses and organic produce...</p>
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
                            <h3>Coffee Brewing Masterclass</h3>
                            <p className="event-desc">Learn to brew the perfect cup of coffee from scratch. Take home your own beans, a freshly...</p>
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
                            <h3>Organic Farmers Market</h3>
                            <p className="event-desc">We're throwing open the doors for our seasonal farmers market! Live music, fresh produce, natural wines and...</p>
                            <div className="event-footer">
                                <span className="event-meta">11:00 · 200 spots</span>
                                <Link to="/" className="event-book" style={{ color: '#94a3b8', cursor: 'not-allowed' }}>Fully Booked</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="gallery-section" style={{ padding: '4rem 5%', backgroundColor: 'var(--stone-50)' }}>
                <div className="section-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <p className="section-pre-heading">OUR WORK</p>
                    <h2 className="section-heading">Image Gallery</h2>
                </div>
                <div className="image-gallery-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem',
                    width: '100%'
                }}>
                    <img src="https://images.squarespace-cdn.com/content/v1/655a0aefcc06663665faecbe/8f7df1de-71b0-431a-b075-82ee88982569/img-5.jpg?format=1500w" alt="Gallery 1" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }} />
                    <img src="https://images.squarespace-cdn.com/content/v1/655a0aefcc06663665faecbe/62538653-2c3a-40a6-aa76-a8e612d8558c/img-6.jpg?format=1500w" alt="Gallery 2" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }} />
                    <img src="https://images.squarespace-cdn.com/content/v1/655a0aefcc06663665faecbe/031739f1-e709-4c7c-8a83-96ad1335265c/SUPER-CLUB.jpg?format=1500w" alt="Gallery 3" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }} />
                    <img src="https://images.squarespace-cdn.com/content/v1/655a0aefcc06663665faecbe/a79f2660-cd8a-4eae-ae3d-093081c594e8/LOOP-EVENTS.jpg?format=1500w" alt="Gallery 4" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }} />
                </div>
            </section>
        </div>
    );
}
