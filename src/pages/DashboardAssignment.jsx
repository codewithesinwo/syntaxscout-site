import React, { useState, useMemo, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { FaDownload, FaSearch, FaSyncAlt } from "react-icons/fa";

export default function DashboardAssignment() {
  const { darkMode } = useTheme();

  // Initial assignments data
  const initialAssignments = () => {
    try {
      const raw = localStorage.getItem("dashboard_assignments_v1");
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [
      { id: 1, title: "Build a Portfolio Website", course: "Web Development Fundamentals", due: "2025-08-15", status: "Pending", completed: false, updated: "2025-08-02" },
      { id: 2, title: "React Todo App", course: "React & Frontend Development", due: "2025-08-20", status: "Pending", completed: false, updated: "2025-08-10" },
      { id: 3, title: "Data Analysis Report", course: "Python for Data Analysis", due: "2025-07-25", status: "Completed", completed: true, updated: "2025-07-19" },
      { id: 4, title: "ML Model Evaluation", course: "Machine Learning with Python", due: "2025-08-22", status: "Pending", completed: false, updated: "2025-08-12" },
      { id: 5, title: "Security Audit", course: "Cybersecurity & Ethical Hacking", due: "2025-06-30", status: "Pending", completed: false, updated: "2025-06-22" },
    ];
  };

  const [assignments, setAssignments] = useState(initialAssignments);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("due-asc");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    try {
      localStorage.setItem("dashboard_assignments_v1", JSON.stringify(assignments));
    } catch (e) {}
  }, [assignments]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = assignments.filter(
      (a) =>
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.course.toLowerCase().includes(q)
    );
    list = [...list];
    if (sortBy === "due-asc") list.sort((a, b) => new Date(a.due) - new Date(b.due));
    if (sortBy === "due-desc") list.sort((a, b) => new Date(b.due) - new Date(a.due));
    if (sortBy === "course-asc") list.sort((a, b) => a.course.localeCompare(b.course));
    if (sortBy === "course-desc") list.sort((a, b) => b.course.localeCompare(a.course));
    if (sortBy === "status") list.sort((a, b) => a.status.localeCompare(b.status));
    return list;
  }, [assignments, query, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

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
      ["Title", "Course", "Due Date", "Status", "Completed", "Last Updated"],
      ...filtered.map((a) => [
        a.title,
        a.course,
        a.due,
        a.status,
        a.completed ? "Yes" : "No",
        a.updated,
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "assignments_export.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const resetAssignments = () => {
    if (!window.confirm("Mark all assignments as pending? This cannot be undone.")) return;
    setAssignments((prev) =>
      prev.map((a) => ({
        ...a,
        status: "Pending",
        completed: false,
        updated: new Date().toISOString().slice(0, 10),
      }))
    );
  };

  const toggleComplete = (id) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              completed: !a.completed,
              status: !a.completed ? "Completed" : "Pending",
              updated: new Date().toISOString().slice(0, 10),
            }
          : a
      )
    );
  };

  return (
    <div className={`p-6 mt-16 min-h-screen ${darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Assignments</h1>
            <p className="text-sm mt-1 text-gray-400">Track your assignments, due dates, and completion status.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? "bg-neutral-900" : "bg-white"} border`}>
              <FaSearch className="text-gray-400" />
              <input
                type="search"
                placeholder="Search assignments..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                className={`bg-transparent outline-none text-sm ${darkMode ? "placeholder-gray-400" : "placeholder-gray-500"}`}
                aria-label="Search assignments"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-2 rounded-lg text-sm ${darkMode ? "bg-neutral-900 border" : "bg-white border"} outline-none`}
              aria-label="Sort assignments"
            >
              <option value="due-asc">Due Date: Soonest</option>
              <option value="due-desc">Due Date: Latest</option>
              <option value="course-asc">Course: A → Z</option>
              <option value="course-desc">Course: Z → A</option>
              <option value="status">Status</option>
            </select>
            <button onClick={exportCSV} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-400 text-black text-sm" aria-label="Export CSV">
              <FaDownload /> Export
            </button>
            <button onClick={resetAssignments} className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${darkMode ? "bg-gray-700" : "bg-white"} border`} aria-label="Reset assignments">
              <FaSyncAlt /> Reset Status
            </button>
          </div>
        </header>
        <div className={`p-4 rounded-lg mb-6 ${darkMode ? "bg-neutral-900 border" : "bg-white border"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Assignments</p>
              <div className="text-3xl font-bold">{assignments.length}</div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Completed</p>
              <div className="text-xl font-medium">{assignments.filter(a => a.completed).length}</div>
            </div>
          </div>
        </div>
        <div className={`rounded-lg overflow-hidden ${darkMode ? "bg-neutral-900 border" : "bg-white border"}`}>
          <table className="w-full min-w-[640px] table-fixed">
            <thead className={`${darkMode ? "bg-neutral-800" : "bg-gray-50"}`}>
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium">Title</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Course</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Due Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-sm font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">No assignments found.</td>
                </tr>
              ) : (
                paged.map((a) => (
                  <tr key={a.id} className={`${darkMode ? "hover:bg-neutral-800" : "hover:bg-gray-50"}`}>
                    <td className="px-4 py-4 align-top">
                      <div className="font-medium">{a.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{a.course}</div>
                    </td>
                    <td className="px-4 py-4 align-top">{a.course}</td>
                    <td className="px-4 py-4 align-top">{formatDate(a.due)}</td>
                    <td className="px-4 py-4 align-top w-32">
                      <button
                        onClick={() => toggleComplete(a.id)}
                        className={`px-2 py-1 rounded-full text-xs font-medium focus:outline-none ${
                          a.completed ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                        }`}
                        aria-pressed={a.completed}
                        aria-label={`${a.completed ? "Mark as pending" : "Mark as completed"} for ${a.title}`}
                      >
                        {a.status}
                      </button>
                    </td>
                    <td className="px-4 py-4 align-top text-sm text-gray-400">{formatDate(a.updated)}</td>
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
