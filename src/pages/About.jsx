import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-emerald-400 mb-4">Tentang Kami (About)</h1>
      <p className="text-slate-300 mb-6">Ini adalah halaman tentang aplikasi ini.</p>
      <Link to="/" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium">
        Kembali ke Home
      </Link>
    </div>
  );
}