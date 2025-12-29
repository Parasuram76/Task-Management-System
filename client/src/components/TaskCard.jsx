export default function TaskCard({ task, onDelete, onUpdate }) {
    const getStatusColor = (status) => {
        switch(status) {
            case 'completed': return 'from-green-500 to-emerald-600';
            case 'in-progress': return 'from-blue-500 to-indigo-600';
            default: return 'from-amber-500 to-orange-600';
        }
    };

    const getStatusBg = (status) => {
        switch(status) {
            case 'completed': return 'bg-green-50 text-green-700 border-green-200';
            case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-200';
            default: return 'bg-amber-50 text-amber-700 border-amber-200';
        }
    };

    return (
        <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 animate-[slideUp_0.4s_ease-out]">
            {/* Status Badge */}
            <div className="flex items-start justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBg(task.status)}`}>
                    {task.status.replace('-', ' ').toUpperCase()}
                </span>
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${getStatusColor(task.status)} animate-pulse`}></div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                {task.title}
            </h3>

            {/* Description */}
            <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                {task.description || "No description provided"}
            </p>

            {/* Due Date */}
            {task.dueDate && (
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(task.dueDate).toDateString()}</span>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-slate-100">
                <button
                    onClick={() => onUpdate(task)}
                    className="flex-1 bg-indigo-50 text-indigo-600 py-2 px-4 rounded-lg font-medium hover:bg-indigo-100 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task._id)}
                    className="flex-1 bg-red-50 text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-100 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                </button>
            </div>

            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}