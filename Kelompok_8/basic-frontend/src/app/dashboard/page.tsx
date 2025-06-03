import Link from "next/link";

type User = {
    id: number;
    name: string;
    email: string;
    company: {
        name: string;
    };
};

export default async function DashboardPage() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users: User[] = await res.json();

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-100 p-4 border-r border-gray-300 h-screen">
                <h2 className="text-xl font-bold mb-4">Sidebar</h2>
                <ul className="space-y-2">
                    <li>
                        <Link href="/dashboard" className="block text-blue-600 underline">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/profile" className="block text-blue-600 underline">Profile</Link>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="p-8 flex-1">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <table className="w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Company</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="text-sm">
                                <td className="border p-2">{user.name}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">{user.company.name}</td>
                                <td className="border p-2">
                                    <Link href={`/dashboard/${user.id}`} className="text-blue-600 underline">Lihat Detail</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
