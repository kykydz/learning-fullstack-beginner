// src/components/organisms/Sidebar.tsx
import SidebarMenu from '../molecules/sidebarmenu';

export default function Sidebar() {
  return (
    <aside
      className="w-64 h-screen p-4 shadow-lg"
      style={{ backgroundColor: "var(--sidebar-bg)" }}
    >
      <h2 className="text-xl font-bold mb-4">Menu Sidebar</h2>
      <SidebarMenu />
    </aside>
  );
}

