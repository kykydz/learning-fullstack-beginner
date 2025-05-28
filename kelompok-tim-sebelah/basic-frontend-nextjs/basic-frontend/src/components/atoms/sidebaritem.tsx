// src/components/atoms/SidebarItem.tsx
import Link from 'next/link';

interface SidebarItemProps {
  href: string;
  label: string;
}

export default function SidebarItem({ href, label }: SidebarItemProps) {
  return (
    <li className="py-2 px-4 hover:bg-gray-200">
      <Link href={href}>{label}</Link>
    </li>
  );
}
