export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 px-8 py-8">{children}</main>
    </div>
  );
}
