// src/components/molecules/SidebarMenu.tsx
import SidebarItem from '../atoms/sidebaritem';

export default function SidebarMenu() {
  return (
    <ul className="flex flex-col gap-2">
      <SidebarItem href="/dashboard" label="Dashboard" />
      <SidebarItem href="/profile" label="Profile" />
      <SidebarItem href="/auth" label="Get Token" />
    </ul>
  );
}
