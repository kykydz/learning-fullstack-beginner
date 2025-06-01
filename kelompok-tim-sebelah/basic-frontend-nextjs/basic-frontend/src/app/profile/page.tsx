// src/app/profile/page.tsx
import DashboardLayout from '@/components/templates/DashboardLayout';
import Image from 'next/image';

export default function ProfilePage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Profil Pengembang</h1>
                
                {/* Profile Card 1 */}
                <div className="border dark:border-gray-700 p-6 rounded-lg shadow-sm bg-white dark:bg-gray-800 flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                        <Image
                            src="/avatar3.jpg"
                            alt="Foto Profil Affa"
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full object-cover border-2 border-blue-200 dark:border-blue-600"
                        />
                    </div>
                    
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-semibold">Affa Hurrarul</h2>
                                {/* <span className="inline-flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    Online
                                </span> */}
                            </div>
                            {/* <button className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                                ✏️ Edit Profil
                            </button> */}
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600 dark:text-gray-300"><strong>Role:</strong> Fullstack Developer</p>
                                <p className="text-gray-600 dark:text-gray-300"><strong>Email:</strong> affa@gmail.com</p>
                                <p className="text-gray-600 dark:text-gray-300"><strong>Institusi:</strong> Universitas AKPRIND Indonesia</p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">Tech Stack:</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">Next.js</span>
                                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">React</span>
                                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">Node.js</span>
                                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">TypeScript</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4 flex gap-3">
                            <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                                <Image src="/github-icon.png" width={16} height={16} alt="GitHub" />
                                GitHub
                            </a>
                            <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                                <Image src="/linkedin-icon.png" width={16} height={16} alt="LinkedIn" />
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                {/* Profile Card 2 */}
                <div className="border dark:border-gray-700 p-6 rounded-lg shadow-sm bg-white dark:bg-gray-800 flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                        <Image
                            src="/joice.jpg"
                            alt="Foto Profil Joice"
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full object-cover border-2 border-purple-200 dark:border-purple-600"
                        />
                    </div>
                    
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-semibold">Joice Lumban Tobing</h2>
                                {/* <span className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                    Offline
                                </span> */}
                            </div>
                            {/* <button className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                                ✏️ Edit Profil
                            </button> */}
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600 dark:text-gray-300"><strong>Role:</strong> UI/UX Designer</p>
                                <p className="text-gray-600 dark:text-gray-300"><strong>Email:</strong> joice@gmail.com</p>
                                <p className="text-gray-600 dark:text-gray-300"><strong>Institusi:</strong> Universitas AKPRIND Indonesia</p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">Tools:</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">Figma</span>
                                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">Adobe XD</span>
                                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">Photoshop</span>
                                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">Illustrator</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4 flex gap-3">
                            <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                                <Image src="/behance-icon.png" width={16} height={16} alt="Behance" />
                                Behance
                            </a>
                            <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                                <Image src="/dribbble-icon.png" width={16} height={16} alt="Dribbble" />
                                Dribbble
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}