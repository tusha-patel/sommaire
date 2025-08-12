import React from 'react'


const Footer = () => {
    return (
        <footer className="bg-gradient-to-t from-gray-100 to-white border-t border-gray-200 py-10 mt-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-800">Sommaire</span>
                    <span className="text-gray-400">© {new Date().getFullYear()}</span>
                </div>
                <div className="flex gap-4 text-gray-500 text-sm">
                    <a href="/" className="hover:text-gray-800 transition">Home</a>
                    <a href="/dashboard" className="hover:text-gray-800 transition">Dashboard</a>
                    <a href="/upload" className="hover:text-gray-800 transition">Upload</a>
                    <a href="/sign-in" className="hover:text-gray-800 transition">Sign In</a>
                </div>
                <div className="text-xs text-gray-400">Made with <span className="text-pink-500">♥</span> by Sommaire Team</div>
            </div>
        </footer>
    );
}

export default Footer