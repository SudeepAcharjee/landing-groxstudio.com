"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from "firebase/firestore";
import { 
  LayoutDashboard, 
  Video, 
  Calendar, 
  LogOut, 
  Menu, 
  X, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail,
  ChevronRight
} from "lucide-react";

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("bookings");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videos, setVideos] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchVideos();
        fetchBookings();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchVideos = async () => {
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setVideos(data);
  };

  const fetchBookings = async () => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBookings(data);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "bookings", id), { status: newStatus });
      fetchBookings(); 
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert("Login failed. Check email and password.");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.secure_url) {
        await addDoc(collection(db, "testimonials"), {
          src: data.secure_url,
          poster: data.secure_url.replace(".mp4", ".jpg").replace(".mov", ".jpg"),
          createdAt: serverTimestamp(),
        });
        alert("Video uploaded successfully!");
        setFile(null);
        fetchVideos();
      } else {
        alert("Upload failed to Cloudinary");
      }
    } catch (err) {
      alert("Error uploading video");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this video?")) {
      await deleteDoc(doc(db, "testimonials", id));
      fetchVideos();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col gap-5 w-full max-w-sm shadow-2xl backdrop-blur-xl">
          <div className="text-center space-y-2">
            <h2 className="text-white text-3xl font-bold tracking-tight">Admin Portal</h2>
            <p className="text-white/40 text-sm">GroxStudio Management System</p>
          </div>
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[#0066FF] transition-all" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[#0066FF] transition-all" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit" className="bg-[#0066FF] text-white px-4 py-3 rounded-xl font-bold mt-2 hover:bg-[#0052cc] transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)]">
            Log In to Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex text-white overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 border-r border-white/5 bg-black flex flex-col z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="font-bold text-xl tracking-tighter">Grox<span className="text-[#0066FF]">Studio</span></span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab("bookings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "bookings" ? "bg-[#0066FF] text-white" : "text-white/40 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Calendar size={20} />
            {isSidebarOpen && <span className="font-medium">Bookings</span>}
          </button>
          <button 
            onClick={() => setActiveTab("testimonials")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "testimonials" ? "bg-[#0066FF] text-white" : "text-white/40 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Video size={20} />
            {isSidebarOpen && <span className="font-medium">Testimonials</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => signOut(auth)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            {activeTab === "bookings" ? "Manage Bookings" : "Testimonials Gallery"}
          </h1>
          <p className="text-white/40 mt-1">
            {activeTab === "bookings" ? "Track and update appointment statuses" : "Upload and manage video reviews"}
          </p>
        </header>

        {activeTab === "bookings" ? (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden overflow-x-auto shadow-2xl">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-white/40 uppercase text-[10px] font-black tracking-widest">
                    <th className="p-6">Submission</th>
                    <th className="p-6">Client Details</th>
                    <th className="p-6">Requested Slot</th>
                    <th className="p-6">Status</th>
                    <th className="p-6 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-20 text-center text-white/20 italic">No bookings found in the records.</td>
                    </tr>
                  ) : (
                    bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="p-6 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="text-sm text-white/80">
                              {b.createdAt ? new Date(b.createdAt.toDate()).toLocaleDateString() : 'Pending...'}
                            </span>
                            <span className="text-[10px] text-white/30 uppercase font-bold">Received</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex flex-col gap-1">
                            <span className="font-bold text-white group-hover:text-[#0066FF] transition-colors">{b.name}</span>
                            <div className="flex items-center gap-4 text-white/40 text-xs">
                              <span className="flex items-center gap-1"><Mail size={12} /> {b.email}</span>
                              <span className="flex items-center gap-1"><Phone size={12} /> {b.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 whitespace-nowrap">
                          <div className="bg-[#0066FF]/10 border border-[#0066FF]/20 px-4 py-2 rounded-xl inline-flex flex-col">
                            <span className="text-[#0066FF] text-xs font-bold uppercase tracking-tight">{b.date}</span>
                            <span className="text-white text-sm font-black">{b.time}</span>
                          </div>
                        </td>
                        <td className="p-6 whitespace-nowrap">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${
                            b.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                            b.status === 'contacted' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
                            'bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20'
                          }`}>
                            {b.status || 'pending'}
                          </span>
                        </td>
                        <td className="p-6 whitespace-nowrap text-right">
                          <select 
                            value={b.status || 'pending'}
                            onChange={(e) => handleStatusChange(b.id, e.target.value)}
                            className="bg-[#0a0a0a] border border-white/10 text-white text-sm rounded-xl p-2.5 outline-none focus:border-[#0066FF] transition-all cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl max-w-2xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Plus size={20} className="text-[#0066FF]" /> 
                Add New Review
              </h2>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="video/*" 
                    onChange={e => setFile(e.target.files?.[0] || null)} 
                    className="w-full p-4 border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02] hover:border-[#0066FF]/50 transition-all cursor-pointer file:hidden" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-white/40 group-hover:text-white transition-colors">
                    {file ? file.name : "Click or drag video to upload"}
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={!file || uploading} 
                  className="w-full bg-[#0066FF] disabled:opacity-50 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:bg-[#0052cc] transition-all"
                >
                  {uploading ? (
                    <>
                      <Clock className="animate-spin" size={20} />
                      Processing Video...
                    </>
                  ) : (
                    <>
                      <Video size={20} />
                      Publish Testimonial
                    </>
                  )}
                </button>
              </form>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Gallery ({videos.length})</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {videos.map(v => (
                  <div key={v.id} className="relative aspect-[9/16] bg-white/5 rounded-2xl overflow-hidden border border-white/10 group shadow-lg">
                    <video 
                      src={v.src} 
                      poster={v.poster} 
                      className="absolute inset-0 w-full h-full object-cover" 
                      muted 
                      loop 
                      playsInline 
                      onMouseEnter={(e) => e.currentTarget.play()} 
                      onMouseLeave={(e) => e.currentTarget.pause()} 
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-4 backdrop-blur-[2px]">
                      <button 
                        onClick={() => handleDelete(v.id)} 
                        className="bg-red-500/20 border border-red-500/50 text-red-500 p-4 rounded-full hover:bg-red-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
