import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/GlassCard';
import { User, Bell, Moon, Shield, Database, LogOut, ChevronRight, Save, RefreshCw, Download, HelpCircle, Mail, Settings as SettingsIconLucide, X, Globe, Check, AlertTriangle } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Page } from '../types';
import { HeroSection } from '../components/HeroSection';

interface SettingsProps {
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onNavigate, onLogout }) => {
    const { 
        setBumbuMakkah, setBumbuMadinah, setRteData, setTenantData, 
        setExpeditionData, setTelecomData, setRiceData 
    } = useData();

    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [isEnglish, setIsEnglish] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);
    
    const currentDate = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    // Auto-dismiss toast
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
        setToast({ message, type });
    };

    const handleResetConfirm = () => {
        setIsResetModalOpen(false);
        setIsResetting(true);
        showToast("Mereset data aplikasi...", 'info');
        
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    const handleExportData = () => {
        showToast("Export data sedang diproses...", 'info');
        setTimeout(() => {
            showToast("Data berhasil diexport ke CSV", 'success');
        }, 1500);
    };

    const handleEditProfile = () => {
        showToast("Fitur Edit Profil akan segera tersedia", 'info');
    };

    const handleSettingChange = (setting: string, value: boolean) => {
        showToast(`Pengaturan ${setting} ${value ? 'diaktifkan' : 'dinonaktifkan'}`, 'success');
    };

    return (
        <div className="space-y-6 pb-10 animate-fade-in-up font-sans relative">
            
            {/* Toast Notification */}
            {toast && (
                <div className="fixed top-24 right-4 md:right-8 z-50 animate-fade-in-up">
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md ${
                        toast.type === 'success' ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800' :
                        toast.type === 'warning' ? 'bg-amber-50/90 border-amber-200 text-amber-800' :
                        'bg-blue-50/90 border-blue-200 text-blue-800'
                    }`}>
                        {toast.type === 'success' && <Check size={18} />}
                        {toast.type === 'warning' && <AlertTriangle size={18} />}
                        {toast.type === 'info' && <RefreshCw size={18} />}
                        <span className="text-sm font-medium">{toast.message}</span>
                        <button onClick={() => setToast(null)} className="ml-2 opacity-60 hover:opacity-100">
                            <X size={14} />
                        </button>
                    </div>
                </div>
            )}

            {/* Reset Confirmation Modal */}
            {isResetModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="absolute inset-0" onClick={() => setIsResetModalOpen(false)}></div>
                    <div className="relative bg-white p-6 rounded-2xl shadow-2xl animate-zoom-in max-w-sm w-full mx-auto border border-red-100">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto text-red-500">
                            <AlertTriangle size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Reset Aplikasi?</h3>
                        <p className="text-sm text-gray-500 text-center mb-6">
                            Apakah Anda yakin ingin mereset semua data? Tindakan ini tidak dapat dibatalkan dan akan memuat ulang halaman.
                        </p>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setIsResetModalOpen(false)}
                                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors text-sm"
                            >
                                Batal
                            </button>
                            <button 
                                onClick={handleResetConfirm}
                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors text-sm shadow-md shadow-red-200"
                            >
                                Ya, Reset
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Picture Modal */}
            {isProfileModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div 
                        className="absolute inset-0" 
                        onClick={() => setIsProfileModalOpen(false)}
                    ></div>
                    <div className="relative bg-white p-2 rounded-2xl shadow-2xl animate-zoom-in max-w-sm w-full mx-auto">
                        <button 
                            onClick={() => setIsProfileModalOpen(false)}
                            className="absolute -top-4 -right-4 bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
                        >
                            <X size={20} />
                        </button>
                        <div className="aspect-square w-full rounded-xl overflow-hidden border border-gray-100">
                            <img 
                                src="https://placehold.co/400x400/064E3B/D4AF37?text=EkoHajj+2026" 
                                alt="Admin Profile Large" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="mt-4 text-center pb-2">
                            <h3 className="text-lg font-bold text-[#064E3B]">Admin</h3>
                            <p className="text-xs text-gray-500 font-mono mb-3">ID: 0000000</p>
                            <div className="flex justify-center gap-2">
                                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Administrator</span>
                                <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section - User Profile */}
            <HeroSection 
                title={
                    <div className="flex items-center gap-3 flex-wrap">
                        <span>Admin</span>
                        <div className="hidden sm:block h-8 w-px bg-white/20 mx-1"></div>
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg border border-white/10 backdrop-blur-sm shadow-inner">
                            <span className="text-[10px] uppercase tracking-wider text-emerald-200 font-bold">ID</span>
                            <span className="font-mono text-lg md:text-xl tracking-widest text-white/90 font-bold">0000000</span>
                        </div>
                    </div>
                }
                subtitle="Pengembangan Ekosistem Ekonomi Haji dan Umrah Kementerian Haji dan Umrah Republik Indonesia"
                currentDate={currentDate}
                role="Administrator EkoHajj"
                startContent={
                    <div className="relative group cursor-pointer" onClick={() => setIsProfileModalOpen(true)}>
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:blur-lg transition-all opacity-40"></div>
                        <div className="w-16 h-16 md:w-22 md:h-22 rounded-full border-[3px] border-white/30 bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center backdrop-blur-md shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                            <img 
                                src="https://placehold.co/400x400/064E3B/D4AF37?text=EkoHajj+2026" 
                                alt="Admin Profile" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 bg-white/20 backdrop-blur-md p-1 rounded-full border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                }
            >
                <button 
                    onClick={handleEditProfile}
                    className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs md:text-sm font-bold transition-all text-white whitespace-nowrap shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2 group"
                >
                    <span>Edit Profil</span>
                    <SettingsIconLucide size={16} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
            </HeroSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* App Preferences */}
                <GlassCard 
                    title="Preferensi Aplikasi" 
                    subtitle="Pengaturan Tampilan & Notifikasi"
                    action={<div className="p-2 bg-indigo-50 rounded-lg text-indigo-700 shadow-sm"><SettingsIconLucide size={18}/></div>}
                    className="h-full !bg-white/80"
                >
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white transition-all border border-transparent hover:border-gray-100 hover:shadow-sm group">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <Bell size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">Notifikasi</h4>
                                    <p className="text-[11px] text-gray-500">Terima update real-time</p>
                                </div>
                            </div>
                            <Toggle checked={notifications} onChange={(val) => { setNotifications(val); handleSettingChange('Notifikasi', val); }} />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white transition-all border border-transparent hover:border-gray-100 hover:shadow-sm group">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <Moon size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-slate-700 transition-colors">Mode Gelap</h4>
                                    <p className="text-[11px] text-gray-500">Tampilan ramah mata</p>
                                </div>
                            </div>
                            <Toggle checked={darkMode} onChange={(val) => { setDarkMode(val); handleSettingChange('Mode Gelap', val); }} />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white transition-all border border-transparent hover:border-gray-100 hover:shadow-sm group">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">Bahasa / Language</h4>
                                    <p className="text-[11px] text-gray-500">Pilih bahasa aplikasi</p>
                                </div>
                            </div>
                            <LanguageToggle 
                                isEnglish={isEnglish} 
                                onChange={(val) => { 
                                    setIsEnglish(val); 
                                    showToast(`Bahasa diubah ke ${val ? 'English' : 'Indonesia'}`, 'success'); 
                                }} 
                            />
                        </div>
                    </div>
                </GlassCard>

                {/* Data Management */}
                <GlassCard 
                    title="Manajemen Data" 
                    subtitle="Export & Reset Data"
                    action={<div className="p-2 bg-blue-50 rounded-lg text-blue-700 shadow-sm"><Database size={18}/></div>}
                    className="h-full !bg-white/80"
                >
                    <div className="space-y-3">
                        <button 
                            onClick={handleExportData}
                            className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white/50 hover:bg-white hover:border-blue-200 hover:shadow-md group transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-100 transition-colors">
                                    <Download size={20} />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition-colors">Export Laporan</h4>
                                    <p className="text-[11px] text-gray-500">Unduh data dalam format CSV/PDF</p>
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </div>
                        </button>

                        <button 
                            onClick={() => setIsResetModalOpen(true)}
                            disabled={isResetting}
                            className="w-full flex items-center justify-between p-4 rounded-xl border border-red-100 bg-red-50/30 hover:bg-red-50 hover:border-red-200 hover:shadow-md group transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-100 transition-colors">
                                    {isResetting ? <RefreshCw size={20} className="animate-spin" /> : <RefreshCw size={20} />}
                                </div>
                                <div className="text-left">
                                    <h4 className="text-sm font-bold text-red-700 group-hover:text-red-800 transition-colors">Reset Aplikasi</h4>
                                    <p className="text-[11px] text-red-500/80">Kembalikan ke pengaturan awal</p>
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-red-50/50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                <ChevronRight size={16} className="text-red-300 group-hover:text-red-600 transition-colors" />
                            </div>
                        </button>
                    </div>
                </GlassCard>

                {/* Manajemen Akun */}
                <GlassCard 
                    title="Manajemen Akun" 
                    subtitle="Daftar Pengguna Terdaftar"
                    action={<div className="p-2 bg-emerald-50 rounded-lg text-emerald-700 shadow-sm"><User size={18}/></div>}
                    className="h-full md:col-span-2 !bg-white/80"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Pengguna</th>
                                    <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {[
                                    { id: '0000000', name: 'Admin', role: 'Administrator EkoHajj', status: 'Active', email: 'admin@ekohajj.kemenag.go.id', avatar: 'https://placehold.co/400x400/064E3B/D4AF37?text=EkoHajj+2026' },
                                    { id: '002', name: 'Budi Santoso', role: 'Petugas Lapangan', status: 'Active', email: 'budi.s@ekohajj.kemenag.go.id', avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random' },
                                    { id: '003', name: 'Siti Aminah', role: 'Verifikator', status: 'Inactive', email: 'siti.a@ekohajj.kemenag.go.id', avatar: 'https://ui-avatars.com/api/?name=Siti+Aminah&background=random' },
                                ].map((user) => (
                                    <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full shadow-sm" />
                                                <div>
                                                    <p className="text-sm font-bold text-gray-800">{user.name}</p>
                                                    <p className="text-[10px] text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wide border border-gray-200">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                                                user.status === 'Active' 
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                                    : 'bg-gray-50 text-gray-500 border-gray-200'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></span>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit User">
                                                <SettingsIconLucide size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-center">
                        <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-all flex items-center gap-1">
                            Lihat Semua Pengguna <ChevronRight size={12} />
                        </button>
                    </div>
                </GlassCard>
            </div>

            <div className="flex justify-center pt-8">
                <button 
                    onClick={onLogout}
                    className="flex items-center gap-2 px-8 py-3.5 bg-white border border-red-100 text-red-600 rounded-2xl font-bold text-sm hover:bg-red-50 hover:border-red-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-300 group"
                >
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Keluar dari Aplikasi
                </button>
            </div>

            <div className="text-center pt-6 pb-2">
                <p className="text-[10px] text-gray-400 font-mono tracking-wider opacity-60 hover:opacity-100 transition-opacity cursor-default">Version 1.0.2 (Build 2026.02.21)</p>
            </div>
        </div>
    );
};

// Simple Toggle Component
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) => (
    <button 
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-7 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#064E3B]/20 ${checked ? 'bg-[#064E3B] shadow-inner' : 'bg-gray-200 shadow-inner'}`}
    >
        <span 
            className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-md transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        />
    </button>
);

const LanguageToggle = ({ isEnglish, onChange }: { isEnglish: boolean; onChange: (val: boolean) => void }) => (
    <button 
        onClick={() => onChange(!isEnglish)}
        className="relative w-20 h-9 bg-gray-100/80 backdrop-blur-sm rounded-lg p-1 flex items-center shadow-inner border border-gray-200 hover:border-gray-300 transition-all cursor-pointer group"
    >
        <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-md shadow-sm border border-gray-100 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isEnglish ? 'left-[calc(50%+2px)]' : 'left-1'}`}
        ></div>
        
        <div className={`flex-1 flex items-center justify-center z-10 transition-all duration-300 ${!isEnglish ? 'opacity-100 scale-105' : 'opacity-50 scale-95'}`}>
            <span className={`text-xs font-bold ${!isEnglish ? 'text-[#064E3B]' : 'text-gray-400'}`}>ID</span>
        </div>
        
        <div className={`flex-1 flex items-center justify-center z-10 transition-all duration-300 ${isEnglish ? 'opacity-100 scale-105' : 'opacity-50 scale-95'}`}>
            <span className={`text-xs font-bold ${isEnglish ? 'text-[#064E3B]' : 'text-gray-400'}`}>EN</span>
        </div>
    </button>
);
