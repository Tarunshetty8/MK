export default function Logo({ size = '1.75rem', color = 'inherit', style = {}, collapsed = false }) {
    if (collapsed) {
        return (
            <span style={{ 
                fontFamily: '"Courier New", Courier, monospace', 
                fontSize: size, 
                fontWeight: '600',
                color: color,
                textTransform: 'uppercase',
                display: 'inline-block',
                ...style 
            }}>
                M
            </span>
        );
    }
    
    return (
        <span style={{ 
            fontFamily: '"Courier New", Courier, monospace', 
            fontSize: size, 
            letterSpacing: '0.1em', 
            fontWeight: '600',
            color: '#FFFFFF',
            backgroundColor: '#000000',
            padding: '0.25em 0.5em',
            textTransform: 'uppercase',
            display: 'inline-block',
            ...style 
        }}>
            MARMELO
        </span>
    );
}
