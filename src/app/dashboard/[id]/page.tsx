import { notFound } from "next/navigation";
import Link from "next/link";

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
};

function Profile() {
    return (
        <img
            src="https://i.imgur.com/MK3eW3As.jpg"
            alt="Katherine Johnson"
        />
    );
}

function Gallery() {
    return (
        <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Amazing Scientists</h2>
                <Profile />
                <Profile />
                <Profile />
        </section>
    );
}

export default async function UserDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);

    if (!res.ok) {
        return notFound();
    }

    const user: User = await res.json();

    return (
        <div className="p-8">
            <Link href="/dashboard" className="text-blue-600 underline mb-4 inline-block">
        ← Kembali ke Dashboard
      </Link>
            <h1 className="text-2xl font-bold mb-4">Detail Pengguna</h1>
            <div className="border p-4 rounded shadow">
                <p><strong>Nama:</strong> {user.name}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Telepon:</strong> {user.phone}</p>
                <p><strong>Website:</strong> {user.website}</p>
                <p><strong>Perusahaan:</strong> {user.company.name}</p>
                <p><strong>Alamat:</strong> {user.address.street}, {user.address.city}</p>
            </div>
            <Gallery />
        </div>
    );
}