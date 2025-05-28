// src/components/organisms/Sidebar.tsx
import SidebarMenu from '../molecules/sidebarmenu';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-100 p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Menu Sidebar</h2>
      <SidebarMenu />
    </aside>
  );
}
