"use client";

import { usePathname } from "next/navigation";

export default function ProfilePage() {
    const pathname = usePathname();

    const user = {
        name: "Nama Anda",
        email: "email.anda@example.com",
        company: "Perusahaan Anda",
        bio: "Deskripsi singkat tentang diri Anda atau profesi Anda.",
        profilePicture: "https://via.placeholder.com/150",
    };

    const handleEditProfile = () => {
        alert("Fungsi Edit Profil segera hadir!");
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white p-6 border-r border-gray-300 shadow-sm">
                <h2 className="text-2xl font-semibold mb-6">Menu Profil</h2>
                <ul className="space-y-4">
                    <li>
                        <a
                            href="/dashboard"
                            className="block text-blue-600 hover:text-blue-800 transition underline"
                        >
                            Dashboard
                        </a>
                    </li>
                    <li>
                        {pathname === "/profile" ? (
                            <span className="block text-gray-500 cursor-default no-underline">
                                Profile
                            </span>
                        ) : (
                            <a
                                href="/profile"
                                className="block text-blue-600 hover:text-blue-800 transition underline"
                            >
                                Profile
                            </a>
                        )}
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="p-12 flex-1 flex justify-center items-start">
                <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-md text-center">
                    <div className="w-40 h-40 mx-auto mb-6 relative rounded-full overflow-hidden border-4 border-blue-500">
                        <img
                            src={user.profilePicture}
                            alt="Foto Profil"
                            className="w-full h-full object-cover"
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-white font-semibold bg-black bg-opacity-50 rounded-full">
                            Foto Profil
                        </span>
                    </div>

                    <h1 className="text-4xl font-bold mb-2 text-gray-900">{user.name}</h1>
                    <p className="text-md text-gray-600 mb-3">{user.email}</p>
                    <p className="text-gray-700 mb-6 px-4">{user.bio}</p>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-1 text-gray-800">Perusahaan</h2>
                        <p className="text-gray-600">{user.company}</p>
                    </div>

                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                        onClick={handleEditProfile}
                    >
                        Edit Profil
                    </button>
                </div>
            </main>
        </div>
    );
}
