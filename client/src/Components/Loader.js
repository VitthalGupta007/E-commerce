function Loader() {
  return (
    <div className="fixed inset-0 bg-stone-600 z-[9999] flex items-center justify-center opacity-60">
      <div className="w-10 h-10 border-5 border-dashed border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;
