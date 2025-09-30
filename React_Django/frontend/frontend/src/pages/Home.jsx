import React, { useState, useEffect } from "react";
import api from "../api";
import Notes from "../components/Notes";

// 👉 change this to "pk" if your backend uses pk instead of id
const idField = "id";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const getId = (n) => n?.[idField];

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => {
        console.log("Fetched notes:", res.data); // 👀 debug
        setNotes(res.data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getNotes();
  }, []);

  const deleteNote = (id) => {
    if (!id) {
      console.error("Delete called without a valid id");
      return;
    }
    api
      .delete(`/api/notes/${id}`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note Deleted");
          getNotes();
        } else {
          alert("Failed to delete note");
        }
      })
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { title, content })
      .then((res) => {
        if (res.status === 201) alert("Note Created");
        else alert("Failed to create note");
        setTitle("");
        setContent("");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          My Notes
        </h2>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {notes.map((note) => (
            <Notes
              key={getId(note)}
              note={note}
              onDelete={() => deleteNote(getId(note))}
            />
          ))}
        </div>

        {/* Create Note Form */}
        <section className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 mb-8">
          <h3 className="text-2xl font-semibold mb-6 text-blue-400">
            Create a New Note
          </h3>
          <form onSubmit={createNote} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows="6"
                className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Create Note
            </button>
          </form>
        </section>

        {/* Alternative List View */}
        <section className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-semibold mb-6 text-purple-400">
            All Notes (List View)
          </h3>
          <ul className="space-y-3">
            {notes.map((n) => {
              const id = getId(n);
              return (
                <li
                  key={id}
                  className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-all duration-200 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <strong className="text-blue-400 text-lg">
                      {n.title}
                    </strong>
                    <span className="text-gray-400 ml-2">: {n.content}</span>
                  </div>
                  <button
                    onClick={() => deleteNote(id)}
                    className="ml-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Home;
