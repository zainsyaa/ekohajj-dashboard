import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { User, Bell, Moon, Shield, Database, LogOut, ChevronRight, Save, RefreshCw, Download, HelpCircle, Mail, Settings as SettingsIconLucide } from 'lucide-react';
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
    const [twoFactor, setTwoFactor] = useState(true);
    const [isResetting, setIsResetting] = useState(false);
    
    const currentDate = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const handleResetData = () => {
        if (window.confirm("Apakah Anda yakin ingin mereset semua data aplikasi ke kondisi awal? Tindakan ini tidak dapat dibatalkan.")) {
            setIsResetting(true);
            setTimeout(() => {
                // Reset logic would go here - for now we just reload the page to trigger the initial data load again
                // or we could manually set all states to empty/initial
                window.location.reload();
            }, 1500);
        }
    };

    const handleExportData = () => {
        alert("Fitur Export Data akan segera tersedia dalam format .CSV dan .PDF");
    };

    return (
        <div className="space-y-6 pb-10 animate-fade-in-up font-sans">
            
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
                    <div className="relative group">
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:blur-lg transition-all opacity-40"></div>
                        <div className="w-16 h-16 md:w-22 md:h-22 rounded-full border-[3px] border-white/30 bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center backdrop-blur-md shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                            <img 
                                src="https://placehold.co/400x400/064E3B/D4AF37?text=EkoHajj+2026" 
                                alt="Admin Profile" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                }
            >
                <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs md:text-sm font-bold transition-all text-white whitespace-nowrap shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2 group">
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
                            <Toggle checked={notifications} onChange={setNotifications} />
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
                            <Toggle checked={darkMode} onChange={setDarkMode} />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white transition-all border border-transparent hover:border-gray-100 hover:shadow-sm group">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">Keamanan 2FA</h4>
                                    <p className="text-[11px] text-gray-500">Verifikasi ganda saat login</p>
                                </div>
                            </div>
                            <Toggle checked={twoFactor} onChange={setTwoFactor} />
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
                            onClick={handleResetData}
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

                {/* Support */}
                <GlassCard 
                    title="Bantuan & Dukungan" 
                    subtitle="Pusat Bantuan & Dokumentasi"
                    action={<div className="p-2 bg-orange-50 rounded-lg text-orange-700 shadow-sm"><HelpCircle size={18}/></div>}
                    className="h-full md:col-span-2 !bg-white/80"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a href="#" className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 bg-white/50 hover:bg-white hover:border-orange-200 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm relative z-10">
                                <Mail size={24} />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-base font-bold text-gray-800 group-hover:text-orange-700 transition-colors">Hubungi Tim IT</h4>
                                <p className="text-xs text-gray-500 mt-0.5">support@ekohajj.kemenag.go.id</p>
                            </div>
                            <ChevronRight size={18} className="ml-auto text-gray-300 group-hover:text-orange-400 transition-colors relative z-10" />
                        </a>
                        
                        <a href="#" className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 bg-white/50 hover:bg-white hover:border-teal-200 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                            <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-sm relative z-10">
                                <HelpCircle size={24} />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-base font-bold text-gray-800 group-hover:text-teal-700 transition-colors">Panduan Pengguna</h4>
                                <p className="text-xs text-gray-500 mt-0.5">Dokumentasi lengkap modul</p>
                            </div>
                            <ChevronRight size={18} className="ml-auto text-gray-300 group-hover:text-teal-400 transition-colors relative z-10" />
                        </a>
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
