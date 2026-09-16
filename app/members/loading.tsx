export default function MembersLoading() {
  return (
    <section className="w-full pt-32 pb-28 sm:pt-40 sm:pb-36 lg:pt-48 lg:pb-44 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-36 rounded-3xl border border-foreground/10 bg-foreground/[0.04] animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
