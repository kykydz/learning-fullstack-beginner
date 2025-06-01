// src/components/atoms/SidebarItem.tsx
import Link from 'next/link';

interface SidebarItemProps {
  href: string;
  label: string;
}

export default function SidebarItem({ href, label }: SidebarItemProps) {
  return (
    <li className="py-2 px-4 rounded-md hover:bg-[color:var(--sidebar-hover)] transition-colors">
      <Link href={href} className="block w-full">
        {label}
      </Link>
    </li>
  );
}
