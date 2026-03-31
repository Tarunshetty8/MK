export default function Logo({ size = '1.75rem', color = 'inherit', style = {}, collapsed = false }) {
    if (collapsed) {
        return (
            <img src="/marmelo-logo.webp" alt="Marmelo Logo" style={{ height: size, filter: color === 'white' ? 'invert(1)' : 'none', ...style }} />
        );
    }
    
    return (
        <img src="/marmelo-logo.webp" alt="Marmelo Logo" style={{ height: size, filter: color === 'white' ? 'invert(1)' : 'none', ...style }} />
    );
}
