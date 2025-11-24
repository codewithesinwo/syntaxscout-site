import React, { useState, useMemo, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { FaDownload, FaSearch, FaSyncAlt } from "react-icons/fa";

export default function DashboardGrade() {
  const { darkMode } = useTheme();

  // Load initial data from localStorage or use defaults
  const initialGrades = () => {
    try {
      const raw = localStorage.getItem("dashboard_grades_v1");
      if (raw) return JSON.parse(raw);
    } catch (e) {
      // ignore parse errors
    }
    return [
      { id: 1, course: "Web Development Fundamentals", grade: 85, progress: 60, completed: false, updated: "2025-08-02" },
      { id: 2, course: "React & Frontend Development", grade: 78, progress: 45, completed: false, updated: "2025-08-10" },
      { id: 3, course: "Python for Data Analysis", grade: 92, progress: 100, completed: true, updated: "2025-07-19" },
      { id: 4, course: "Machine Learning with Python", grade: 67, progress: 35, completed: false, updated: "2025-08-12" },
      { id: 5, course: "Cybersecurity & Ethical Hacking", grade: 73, progress: 15, completed: false, updated: "2025-06-22" },
    ];
  };

  const [grades, setGrades] = useState(initialGrades);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("grade-desc");

  // UI: inline editing and pagination
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Persist grades to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("dashboard_grades_v1", JSON.stringify(grades));
    } catch (e) {
      // ignore storage errors
    }
  }, [grades]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = grades.filter((g) => !q || g.course.toLowerCase().includes(q));
    list = [...list];
    if (sortBy === "grade-desc") list.sort((a, b) => b.grade - a.grade);
    if (sortBy === "grade-asc") list.sort((a, b) => a.grade - b.grade);
    if (sortBy === "course-asc") list.sort((a, b) => a.course.localeCompare(b.course));
    if (sortBy === "course-desc") list.sort((a, b) => b.course.localeCompare(a.course));
    if (sortBy === "progress-desc") list.sort((a, b) => b.progress - a.progress);
    return list;
  }, [grades, query, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const average = useMemo(() => {
    if (!grades.length) return 0;
    return Math.round(grades.reduce((s, g) => s + g.grade, 0) / grades.length);
  }, [grades]);

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString();
    } catch {
      return iso;
    }
  };

  const exportCSV = () => {
    const rows = [
      ["Course", "Grade", "Progress", "Completed", "Last Updated"],
      ...filtered.map((g) => [g.course, `${g.grade}`, `${g.progress}%`, g.completed ? "Yes" : "No", g.updated]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grades_export.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const resetProgress = () => {
    if (!window.confirm("Reset progress for all courses to 0%? This cannot be undone.")) return;
    setGrades((prev) => prev.map((g) => ({ ...g, progress: 0, updated: new Date().toISOString().slice(0, 10) })));
  };

  // Toggle completed state
  const toggleComplete = (id) => {
    setGrades((prev) => prev.map((g) => (g.id === id ? { ...g, completed: !g.completed, updated: new Date().toISOString().slice(0, 10) } : g)));
  };

  // Inline edit grade: validate 0-100
  const startEdit = (id, current) => {
    setEditingId(id);
    setEditingValue(String(current));
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditingValue("");
  };
  const saveEdit = (id) => {
    const v = parseInt(editingValue, 10);
    if (Number.isNaN(v) || v < 0 || v > 100) {
      // revert invalid input
      cancelEdit();
      return;
    }
    setGrades((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              grade: v,
              // Optionally adjust progress when grade updated (simple heuristic)
              progress: Math.max(0, Math.min(100, Math.round((g.progress + v) / 2))),
              updated: new Date().toISOString().slice(0, 10),
            }
          : g
      )
    );
    cancelEdit();
  };

  return (
    <div className={`p-6 mt-16 min-h-screen ${darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Grades & Progress</h1>
            <p className="text-sm mt-1 text-gray-400">Overview of your course performance and progress.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? "bg-neutral-900" : "bg-white"} border`}>
              <FaSearch className="text-gray-400" />
              <input
                type="search"
                placeholder="Search courses..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                className={`bg-transparent outline-none text-sm ${darkMode ? "placeholder-gray-400" : "placeholder-gray-500"}`}
                aria-label="Search courses"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-2 rounded-lg text-sm ${darkMode ? "bg-neutral-900 border" : "bg-white border"} outline-none`}
              aria-label="Sort grades"
            >
              <option value="grade-desc">Grade: High → Low</option>
              <option value="grade-asc">Grade: Low → High</option>
              <option value="progress-desc">Progress: High → Low</option>
              <option value="course-asc">Course: A → Z</option>
              <option value="course-desc">Course: Z → A</option>
            </select>

            <button onClick={exportCSV} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-400 text-black text-sm" aria-label="Export CSV">
              <FaDownload /> Export
            </button>

            <button onClick={resetProgress} className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${darkMode ? "bg-gray-700" : "bg-white"} border`} aria-label="Reset progress">
              <FaSyncAlt /> Reset Progress
            </button>
          </div>
        </header>

        <div className={`p-4 rounded-lg mb-6 ${darkMode ? "bg-neutral-900 border" : "bg-white border"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Average Grade</p>
              <div className="text-3xl font-bold">{average}%</div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Courses</p>
              <div className="text-xl font-medium">{grades.length}</div>
            </div>
          </div>
        </div>

        <div className={`rounded-lg overflow-hidden ${darkMode ? "bg-neutral-900 border" : "bg-white border"}`}>
          <table className="w-full min-w-[640px] table-fixed">
            <thead className={`${darkMode ? "bg-neutral-800" : "bg-gray-50"}`}>
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium">Course</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Progress</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Grade</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-sm font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">No courses found.</td>
                </tr>
              ) : (
                paged.map((g) => (
                  <tr key={g.id} className={`${darkMode ? "hover:bg-neutral-800" : "hover:bg-gray-50"}`}>
                    <td className="px-4 py-4 align-top">
                      <div className="font-medium">{g.course}</div>
                      <div className="text-xs text-gray-400 mt-1">{g.lessons ?? ""}</div>
                    </td>
                    <td className="px-4 py-4 align-top w-48">
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${g.progress}%`,
                            background: g.progress > 75 ? "#16a34a" : g.progress > 40 ? "#f59e0b" : "#ef4444",
                          }}
                        />
                      </div>
                      <div className="text-xs text-gray-400 mt-2">{g.progress}%</div>
                    </td>
                    <td className="px-4 py-4 align-top w-28">
                      {editingId === g.id ? (
                        <input
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onBlur={() => saveEdit(g.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit(g.id);
                            if (e.key === "Escape") cancelEdit();
                          }}
                          className="w-16 text-lg font-semibold bg-transparent outline-none border-b"
                          aria-label={`Edit grade for ${g.course}`}
                          autoFocus
                        />
                      ) : (
                        <div
                          className="text-lg font-semibold cursor-pointer"
                          role="button"
                          tabIndex={0}
                          onClick={() => startEdit(g.id, g.grade)}
                          onKeyDown={(e) => e.key === "Enter" && startEdit(g.id, g.grade)}
                          aria-label={`Grade ${g.grade} for ${g.course}. Click to edit.`}
                        >
                          {g.grade}%
                        </div>
                      )}
                      <div className="text-xs text-gray-400">Score</div>
                    </td>
                    <td className="px-4 py-4 align-top w-28">
                      <button
                        onClick={() => toggleComplete(g.id)}
                        className={`px-2 py-1 rounded-full text-xs font-medium focus:outline-none ${
                          g.completed ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                        }`}
                        aria-pressed={g.completed}
                        aria-label={`${g.completed ? "Mark as in progress" : "Mark as completed"} for ${g.course}`}
                      >
                        {g.completed ? "Completed" : "In Progress"}
                      </button>
                    </td>
                    <td className="px-4 py-4 align-top text-sm text-gray-400">{formatDate(g.updated)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border bg-white text-sm disabled:opacity-50"
              aria-label="Previous page"
            >
              Prev
            </button>
            <span className="text-sm">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border bg-white text-sm disabled:opacity-50"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
