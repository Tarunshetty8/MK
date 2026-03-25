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
            letterSpacing: '0.25em', 
            fontWeight: '600',
            color: color,
            textTransform: 'uppercase',
            marginRight: '-0.25em', // to balance the letter spacing on the last letter visually if needed
            display: 'inline-block',
            ...style 
        }}>
            MARMELO
        </span>
    );
}
