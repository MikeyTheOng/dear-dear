export default function Sunflower() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-50 h-40">
            <g fill="#FFD700">
                {[...Array(20)].map((_, i) => (
                    <path
                        key={i}
                        d="M100,100 L110,70 Q100,75 90,70 Z"
                        transform={`rotate(${i * 18} 100 100)`}
                    />
                ))}
            </g>
            <circle cx="100" cy="100" r="18" fill="#8B4513" />
            <g fill="#4A2500">
                {[...Array(20)].map((_, i) => {
                    const angle = Math.random() * Math.PI * 2;
                    const radius = Math.random() * 14;
                    return (
                        <circle
                            key={i}
                            cx={100 + Math.cos(angle) * radius}
                            cy={100 + Math.sin(angle) * radius}
                            r="1"
                        />
                    );
                })}
            </g>
            <path d="M100,118 Q98,155 100,190" stroke="#228B22" strokeWidth="5" fill="none" />
            <path d="M100,140 Q110,135 115,140 Q110,145 100,142" fill="#32CD32" />
            <path d="M100,165 Q90,160 85,165 Q90,170 100,167" fill="#32CD32" />
        </svg>
    );
}
