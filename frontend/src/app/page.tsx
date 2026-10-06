'use client';

import { useEffect, useState } from 'react';

interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    status?: string;
    version?: string;
    timestamp?: string;
    environment?: string;
  };
}

export default function Home() {
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const checkApiHealth = async () => {
    setApiStatus('loading');
    setErrorMessage('');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    try {
      const res = await fetch(`${apiUrl}/v1/health`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: ApiResponse = await res.json();
      setApiData(data);
      setApiStatus('success');
    } catch (err: unknown) {
      setApiStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Gagal terhubung ke API backend');
    }
  };

  useEffect(() => {
    checkApiHealth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="space-y-2 border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wider">
            Digital Library Setup
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Madrasah Hasan Muchyi Kapurejo
          </h1>
          <p className="text-slate-400 text-sm">
            Status Pengujian Komunikasi Frontend (Next.js) ↔ Backend (Laravel REST API)
          </p>
        </div>

        {/* API Health Card */}
        <div className="p-6 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-300">Backend API Health</span>
            {apiStatus === 'loading' && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-xs font-medium border border-amber-500/20 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Connecting...
              </span>
            )}
            {apiStatus === 'success' && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Connected ✅
              </span>
            )}
            {apiStatus === 'error' && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 text-rose-400 rounded-full text-xs font-medium border border-rose-500/20">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                Disconnected ❌
              </span>
            )}
          </div>

          {/* Response Payload Display */}
          {apiStatus === 'success' && apiData && (
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-lg bg-slate-900 font-mono text-xs text-emerald-300 overflow-x-auto border border-slate-800">
                <pre>{JSON.stringify(apiData, null, 2)}</pre>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs text-slate-400 pt-2">
                <div>
                  <span className="text-slate-500">API Endpoint:</span>{' '}
                  <code className="text-slate-300">{process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/v1/health</code>
                </div>
                <div>
                  <span className="text-slate-500">Response Status:</span>{' '}
                  <span className="text-emerald-400 font-medium">200 OK</span>
                </div>
              </div>
            </div>
          )}

          {apiStatus === 'error' && (
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-lg bg-rose-950/30 border border-rose-900/50 text-rose-300 text-xs font-mono">
                {errorMessage}
              </div>
              <p className="text-xs text-slate-400">
                Pastikan backend Laravel sedang berjalan dengan perintah: <code className="text-amber-400 bg-slate-900 px-2 py-0.5 rounded">php artisan serve</code>
              </p>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={checkApiHealth}
              disabled={apiStatus === 'loading'}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20"
            >
              Re-test API Connection
            </button>
          </div>
        </div>

        {/* Stack Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-3 bg-slate-950/40 border border-slate-800/60 rounded-xl">
            <div className="text-slate-500">Frontend</div>
            <div className="font-semibold text-slate-200 mt-1">Next.js 16</div>
          </div>
          <div className="p-3 bg-slate-950/40 border border-slate-800/60 rounded-xl">
            <div className="text-slate-500">Backend</div>
            <div className="font-semibold text-slate-200 mt-1">Laravel 13</div>
          </div>
          <div className="p-3 bg-slate-950/40 border border-slate-800/60 rounded-xl">
            <div className="text-slate-500">Database</div>
            <div className="font-semibold text-slate-200 mt-1">PostgreSQL</div>
          </div>
          <div className="p-3 bg-slate-950/40 border border-slate-800/60 rounded-xl">
            <div className="text-slate-500">Auth</div>
            <div className="font-semibold text-slate-200 mt-1">Sanctum</div>
          </div>
        </div>
      </div>
    </div>
  );
}
