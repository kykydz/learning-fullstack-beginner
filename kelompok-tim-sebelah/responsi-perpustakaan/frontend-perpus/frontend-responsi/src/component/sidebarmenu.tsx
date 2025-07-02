// src/component/sidebarmenu.tsx
import SidebarItem from './sidebaritem';

export default function SidebarMenu() {
  return (
    <ul className="flex flex-col gap-2">
      <SidebarItem href="/dashboard" label="Dashboard" />
    </ul>
  );
}
