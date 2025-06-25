export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
    );
  }
  