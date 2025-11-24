import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { FaSearch, FaDownload, FaTrash, FaEnvelope } from "react-icons/fa";

export default function DashboardMessage() {
  const { darkMode } = useTheme();

  // Initial messages (persisted)
  const initialMessages = () => {
    try {
      const raw = localStorage.getItem("dashboard_messages_v1");
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      { id: 1, sender: "Instructor A", subject: "Welcome to the course", body: "Hi — welcome! Please review the syllabus.", date: "2025-08-01T09:15:00Z", read: false },
      { id: 2, sender: "System", subject: "Assignment graded", body: "Your assignment has been graded. Check the details.", date: "2025-08-10T13:40:00Z", read: true },
      { id: 3, sender: "Peer B", subject: "Study group?", body: "Would you like to join a study session this weekend?", date: "2025-08-11T18:00:00Z", read: false },
      { id: 4, sender: "Admin", subject: "Maintenance Notice", body: "Scheduled maintenance tomorrow 02:00 - 04:00 UTC.", date: "2025-07-30T06:00:00Z", read: true },
      { id: 5, sender: "Instructor C", subject: "Project update", body: "Please see updated project requirements.", date: "2025-08-12T11:20:00Z", read: false },
    ];
  };

  const [messages, setMessages] = useState(initialMessages);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all / read / unread
  const [sortBy, setSortBy] = useState("date-desc"); // date-desc / date-asc / sender-asc / sender-desc
  const [page, setPage] = useState(1);
  const perPage = 10;

  // persist
  useEffect(() => {
    try {
      localStorage.setItem("dashboard_messages_v1", JSON.stringify(messages));
    } catch {}
  }, [messages]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = messages.filter((m) => {
      if (filter === "read" && !m.read) return false;
      if (filter === "unread" && m.read) return false;
      if (!q) return true;
      return (
        m.sender.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.body.toLowerCase().includes(q)
      );
    });
    list = [...list];
    if (sortBy === "date-desc") list.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sortBy === "date-asc") list.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortBy === "sender-asc") list.sort((a, b) => a.sender.localeCompare(b.sender));
    if (sortBy === "sender-desc") list.sort((a, b) => b.sender.localeCompare(a.sender));
    return list;
  }, [messages, query, filter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch {
      return iso;
    }
  };

  const toggleRead = (id) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: !m.read } : m)));
  };

  const deleteMessage = (id) => {
    if (!window.confirm("Delete this message?")) return;
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const deleteRead = () => {
    if (!window.confirm("Delete all read messages?")) return;
    setMessages((prev) => prev.filter((m) => !m.read));
  };

  const exportCSV = () => {
    const rows = [
      ["Sender", "Subject", "Body", "Read", "Date"],
      ...filtered.map((m) => [m.sender, m.subject, m.body, m.read ? "Yes" : "No", m.date]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "messages_export.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`p-6 mt-16 min-h-screen ${darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Messages</h1>
            <p className="text-sm mt-1 text-gray-400">Your inbox for course and system messages.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? "bg-neutral-900" : "bg-white"} border`}>
              <FaSearch className="text-gray-400" />
              <input
                type="search"
                placeholder="Search messages..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                className={`bg-transparent outline-none text-sm ${darkMode ? "placeholder-gray-400" : "placeholder-gray-500"}`}
                aria-label="Search messages"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
              className={`px-3 py-2 rounded-lg text-sm ${darkMode ? "bg-neutral-900 border" : "bg-white border"} outline-none`}
              aria-label="Filter messages"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-2 rounded-lg text-sm ${darkMode ? "bg-neutral-900 border" : "bg-white border"} outline-none`}
              aria-label="Sort messages"
            >
              <option value="date-desc">Newest</option>
              <option value="date-asc">Oldest</option>
              <option value="sender-asc">Sender A → Z</option>
              <option value="sender-desc">Sender Z → A</option>
            </select>

            <button onClick={exportCSV} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-400 text-black text-sm" aria-label="Export CSV">
              <FaDownload /> Export
            </button>

            <button onClick={deleteRead} className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${darkMode ? "bg-gray-700" : "bg-white"} border`} aria-label="Delete read">
              <FaTrash /> Delete Read
            </button>
          </div>
        </header>

        <div className={`rounded-lg overflow-hidden ${darkMode ? "bg-neutral-900 border" : "bg-white border"}`}>
          <table className="w-full table-fixed min-w-[640px]">
            <thead className={`${darkMode ? "bg-neutral-800" : "bg-gray-50"}`}>
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium">Sender</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Subject</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Snippet</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Date</th>
                <th className="px-4 py-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">No messages found.</td>
                </tr>
              ) : (
                paged.map((m) => (
                  <tr key={m.id} className={`${darkMode ? "hover:bg-neutral-800" : "hover:bg-gray-50"}`}>
                    <td className="px-4 py-4 align-top w-36">
                      <div className="font-medium flex items-center gap-2">
                        <FaEnvelope className={`text-sm ${m.read ? "text-gray-400" : "text-amber-400"}`} />
                        <span>{m.sender}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className={`font-medium ${m.read ? "text-gray-400" : ""}`}>{m.subject}</div>
                    </td>
                    <td className="px-4 py-4 align-top text-sm text-gray-400">
                      {m.body.length > 80 ? `${m.body.slice(0, 80)}…` : m.body}
                    </td>
                    <td className="px-4 py-4 align-top text-sm text-gray-400">{formatDate(m.date)}</td>
                    <td className="px-4 py-4 align-top w-36 flex items-center gap-2">
                      <button
                        onClick={() => toggleRead(m.id)}
                        className={`px-2 py-1 rounded text-sm border ${m.read ? "bg-white" : "bg-amber-100"}`}
                        aria-pressed={m.read}
                        aria-label={`${m.read ? "Mark as unread" : "Mark as read"} for ${m.subject}`}
                      >
                        {m.read ? "Mark Unread" : "Mark Read"}
                      </button>
                      <button
                        onClick={() => deleteMessage(m.id)}
                        className="px-2 py-1 rounded text-sm border bg-red-50 text-red-700"
                        aria-label={`Delete message ${m.subject}`}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing {(page - 1) * perPage + (filtered.length ? 1 : 0)}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
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
