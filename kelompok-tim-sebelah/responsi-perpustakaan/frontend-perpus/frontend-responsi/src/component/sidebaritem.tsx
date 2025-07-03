// src/component/sidebaritem.tsx
'use client';

import Link from 'next/link';

interface SidebarItemProps {
  href: string;
  label: string;
}

export default function SidebarItem({ href, label }: SidebarItemProps) {
  return (
    <li className="py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
      <Link
        href={href}
        className="block w-full text-gray-800 dark:text-gray-100"
      >
        {label}
      </Link>
    </li>
  );
}
