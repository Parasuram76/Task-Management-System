import Tasks from "./Tasks";

export default function Dashboard() {
    return (
        <div className="animate-[fadeIn_0.5s_ease-out]">
            <Tasks />
            
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}