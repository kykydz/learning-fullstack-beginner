// src/component/DashboardLayout.tsx
import Sidebar from './sidebarmenu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4">
        <h2 className="text-lg font-semibold mb-4">Menu</h2>
        <Sidebar />
      </aside>
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100">
        {children}
      </main>
    </div>
  );
}
