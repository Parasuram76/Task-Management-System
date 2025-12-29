import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        dueDate: "",
        status: "pending",
    });

    const [editForm, setEditForm] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const res = await api.get("/tasks/get");
            setTasks(res.data.tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const createTask = async () => {
        if (!form.title) return;

        try {
            await api.post("/tasks/create", form);
            setForm({ title: "", description: "", dueDate: "", status: "pending" });
            setShowForm(false);
            fetchTasks();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/delete/${id}`);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const updateTask = (task) => {
        setEditForm({
            _id: task._id,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate?.split("T")[0],
            status: task.status,
        });
    };

    const saveTaskUpdate = async () => {
        try {
            await api.put(`/tasks/update/${editForm._id}`, editForm);
            setEditForm(null);
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const stats = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === "pending").length,
        inProgress: tasks.filter(t => t.status === "in-progress").length,
        completed: tasks.filter(t => t.status === "completed").length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* HEADER */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800">Your Tasks</h2>
                            <p className="text-slate-500 mt-1">Manage and track your daily tasks</p>
                        </div>

                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Task
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatBox title="Total Tasks" count={stats.total} color="slate" />
                        <StatBox title="Pending" count={stats.pending} color="amber" />
                        <StatBox title="In Progress" count={stats.inProgress} color="blue" />
                        <StatBox title="Completed" count={stats.completed} color="green" />
                    </div>
                </div>

                {/* CREATE FORM */}
                {showForm && (
                    <TaskForm
                        title="Create New Task"
                        form={form}
                        setForm={setForm}
                        onSubmit={createTask}
                        onCancel={() => setShowForm(false)}
                    />
                )}

                {/* ===================== EDIT POPUP ===================== */}
                {editForm && (
                    <EditPopup onClose={() => setEditForm(null)}>
                        <TaskForm
                            title="Edit Task"
                            form={editForm}
                            setForm={setEditForm}
                            onSubmit={saveTaskUpdate}
                            onCancel={() => setEditForm(null)}
                        />
                    </EditPopup>
                )}

                {/* TASK LIST */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
                    </div>
                ) : tasks.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((t, index) => (
                            <div key={t._id} style={{ animationDelay: `${index * 0.1}s` }}>
                                <TaskCard task={t} onDelete={deleteTask} onUpdate={updateTask} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ---------------- POPUP MODAL ---------------- */
function EditPopup({ children, onClose }) {
    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

/* ---------------- SMALL REUSABLE COMPONENTS ---------------- */

function StatBox({ title, count, color }) {
    const bg = {
        slate: "from-slate-50 to-slate-100 border-slate-200 text-slate-800",
        amber: "from-amber-50 to-orange-100 border-amber-200 text-amber-700",
        blue: "from-blue-50 to-indigo-100 border-blue-200 text-blue-700",
        green: "from-green-50 to-emerald-100 border-green-200 text-green-700",
    };

    return (
        <div className={`bg-gradient-to-br p-4 rounded-xl border ${bg[color]}`}>
            <div className="text-2xl font-bold">{count}</div>
            <div className="text-sm opacity-80">{title}</div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-100">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No tasks yet</h3>
            <p className="text-slate-500">Create your first task to get started!</p>
        </div>
    );
}

/* ------------------ FORM COMPONENT ------------------ */
function TaskForm({ title, form, setForm, onSubmit, onCancel }) {
    return (
        <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>

            <div className="space-y-4">
                <Input label="Task Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />

                <Textarea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input type="date" label="Due Date" value={form.dueDate} onChange={(v) => setForm({ ...form, dueDate: v })} />

                    <Select
                        label="Status"
                        value={form.status}
                        onChange={(v) => setForm({ ...form, status: v })}
                        options={[
                            { val: "pending", text: "Pending" },
                            { val: "in-progress", text: "In Progress" },
                            { val: "completed", text: "Completed" },
                        ]}
                    />
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        onClick={onSubmit}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg"
                    >
                        Save
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ------------------ INPUT COMPONENTS ------------------ */

function Input({ label, value, onChange, type = "text" }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
        </div>
    );
}

function Textarea({ label, value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
        </div>
    );
}

function Select({ label, value, onChange, options }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
                {options.map(o => <option key={o.val} value={o.val}>{o.text}</option>)}
            </select>
        </div>
    );
}
