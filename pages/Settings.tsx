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
                    <div className="flex items-center gap-5">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-[3px] border-white/30 bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center backdrop-blur-md shadow-lg flex-shrink-0">
                            <User className="text-white w-10 h-10 md:w-12 md:h-12 drop-shadow-md" />
                        </div>
                        <div className="flex flex-col justify-center text-left">
                            <span className="text-2xl md:text-4xl font-bold font-playfair leading-none tracking-tight">
                                Admin
                            </span>
                            <span className="text-[10px] md:text-xs text-[#D4AF37] font-bold tracking-widest uppercase mt-1">
                                Administrator EkoHajj
                            </span>
                            <span className="text-sm md:text-base text-emerald-50/80 font-light tracking-wide mt-1 leading-relaxed max-w-2xl">
                                Pengembangan Ekosistem Ekonomi Haji dan Umrah<br/>
                                Kementerian Haji dan Umrah Republik Indonesia
                            </span>
                        </div>
                    </div>
                }
                subtitle=""
                currentDate={currentDate}
            >
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs md:text-sm font-medium transition-all text-white whitespace-nowrap shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2">
                    Edit Profil
                </button>
            </HeroSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* App Preferences */}
                <GlassCard 
                    title="Preferensi Aplikasi" 
                    subtitle="Pengaturan Tampilan & Notifikasi"
                    action={<div className="p-2 bg-indigo-50 rounded-lg text-indigo-700"><SettingsIconLucide size={16}/></div>}
                    className="h-full"
                >
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <Bell size={18} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800">Notifikasi</h4>
                                    <p className="text-[10px] text-gray-500">Terima update real-time</p>
                                </div>
                            </div>
                            <Toggle checked={notifications} onChange={setNotifications} />
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
                                    <Moon size={18} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800">Mode Gelap</h4>
                                    <p className="text-[10px] text-gray-500">Tampilan ramah mata</p>
                                </div>
                            </div>
                            <Toggle checked={darkMode} onChange={setDarkMode} />
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                    <Shield size={18} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800">Keamanan 2FA</h4>
                                    <p className="text-[10px] text-gray-500">Verifikasi ganda saat login</p>
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
                    action={<div className="p-2 bg-blue-50 rounded-lg text-blue-700"><Database size={16}/></div>}
                    className="h-full"
                >
                    <div className="space-y-4">
                        <button 
                            onClick={handleExportData}
                            className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[#064E3B]/30 hover:bg-gray-50 group transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <Download size={18} />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-sm font-bold text-gray-800">Export Laporan</h4>
                                    <p className="text-[10px] text-gray-500">Unduh data dalam format CSV/PDF</p>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-gray-400 group-hover:text-[#064E3B]" />
                        </button>

                        <button 
                            onClick={handleResetData}
                            disabled={isResetting}
                            className="w-full flex items-center justify-between p-4 rounded-xl border border-red-100 hover:border-red-300 hover:bg-red-50 group transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-100 transition-colors">
                                    {isResetting ? <RefreshCw size={18} className="animate-spin" /> : <RefreshCw size={18} />}
                                </div>
                                <div className="text-left">
                                    <h4 className="text-sm font-bold text-red-700">Reset Aplikasi</h4>
                                    <p className="text-[10px] text-red-500/80">Kembalikan ke pengaturan awal</p>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-red-300 group-hover:text-red-600" />
                        </button>
                    </div>
                </GlassCard>

                {/* Support */}
                <GlassCard 
                    title="Bantuan & Dukungan" 
                    subtitle="Pusat Bantuan & Dokumentasi"
                    action={<div className="p-2 bg-orange-50 rounded-lg text-orange-700"><HelpCircle size={16}/></div>}
                    className="h-full md:col-span-2"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a href="#" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-full group-hover:scale-110 transition-transform">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-800">Hubungi Tim IT</h4>
                                <p className="text-xs text-gray-500">support@ekohajj.kemenag.go.id</p>
                            </div>
                        </a>
                        
                        <a href="#" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group">
                            <div className="p-3 bg-teal-50 text-teal-600 rounded-full group-hover:scale-110 transition-transform">
                                <HelpCircle size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-800">Panduan Pengguna</h4>
                                <p className="text-xs text-gray-500">Dokumentasi lengkap modul</p>
                            </div>
                        </a>
                    </div>
                </GlassCard>
            </div>

            <div className="flex justify-center pt-6">
                <button 
                    onClick={onLogout}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-red-100 text-red-600 rounded-xl font-bold text-sm hover:bg-red-50 hover:border-red-200 shadow-sm hover:shadow-md transition-all"
                >
                    <LogOut size={16} />
                    Keluar dari Aplikasi
                </button>
            </div>

            <div className="text-center pt-4">
                <p className="text-[10px] text-gray-400 font-mono">Version 1.0.2 (Build 2026.02.21)</p>
            </div>
        </div>
    );
};

// Simple Toggle Component
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) => (
    <button 
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#064E3B] ${checked ? 'bg-[#064E3B]' : 'bg-gray-200'}`}
    >
        <span 
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition duration-200 ease-in-out mt-1 ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
    </button>
);
