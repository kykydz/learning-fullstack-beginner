// src/app/profile/page.tsx
import DashboardLayout from '@/components/templates/DashboardLayout';

export default function ProfilePage() {
    return (
        <DashboardLayout>
            <div className="space-y-4">
                <h1 className="text-2xl font-bold mb-4">Profil Pengembang</h1>
                <div className="border p-4 rounded shadow flex items-center gap-4">
                    {/*Gambar profil*/}
                    <img
                        src="/avatar3.jpg"
                        alt="Foto Profil"
                        className="w-24 h-24 rounded-full object-cover border"
                    />

                    {/*Informasi pengguna*/}
                    <div>
                        <p><strong>Nama:</strong> Affa Hurrarul</p>
                        <p><strong>Email:</strong> affa@gmail.com</p>
                        <p><strong>Institusi:</strong> Universitas AKPRIND Indonesia</p>
                    </div>
                </div>


                <div className="border p-4 rounded shadow flex items-center gap-4">
                    {/*Gambar profil*/}
                    <img
                        src="/avatar3.jpg"
                        alt="Foto Profil"
                        className="w-24 h-24 rounded-full object-cover border"
                    />

                    {/*Informasi pengguna*/}
                    <div>
                        <p><strong>Nama:</strong> Affa Hurrarul</p>
                        <p><strong>Email:</strong> affa@gmail.com</p>
                        <p><strong>Institusi:</strong> Universitas AKPRIND Indonesia</p>
                    </div>
                </div>

                {/*tambahkan di sini, kopas lagi <div classname = ".border p-4 rounded shadow flex items-center gap-4"> sampai akhir, isi profil masing2*/}
            </div>
        </DashboardLayout>
    );
}

