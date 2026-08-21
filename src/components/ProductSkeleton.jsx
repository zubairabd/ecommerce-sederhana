export default function ProductSkeleton() {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 animate-pulse flex flex-col justify-between">
      {/* Gambar Skeleton */}
      <div className="w-full h-40 bg-slate-700 rounded-lg mb-4" />

      {/* Judul & Harga Skeleton */}
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-slate-700 rounded w-3/4" />
        <div className="h-4 bg-slate-700 rounded w-1/2" />
        <div className="h-5 bg-slate-700 rounded w-1/3 mt-2" />
      </div>

      {/* Tombol Skeleton */}
      <div className="mt-4 flex gap-2">
        <div className="h-9 bg-slate-700 rounded-lg flex-1" />
        <div className="h-9 bg-slate-700 rounded-lg flex-1" />
      </div>
    </div>
  );
}