import logoImg from '../assets/logo.webp';

export default function Logo({ size = '1.75rem', color = 'inherit', style = {}, collapsed = false }) {
    if (collapsed) {
        return (
            <img src={logoImg} alt="Marmelo Logo" style={{ height: size, filter: color === 'white' ? 'invert(1)' : 'none', ...style }} />
        );
    }
    
    return (
        <img src={logoImg} alt="Marmelo Logo" style={{ height: size, filter: color === 'white' ? 'invert(1)' : 'none', ...style }} />
    );
}
