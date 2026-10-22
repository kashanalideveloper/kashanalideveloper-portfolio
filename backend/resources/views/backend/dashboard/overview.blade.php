<x-app-layout title="Dashboard | Malik Kashan">
<x-slot name="content">
    <div class="min-h-screen bg-brand-bg">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 py-8">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl sm:text-5xl font-bold text-brand-ink dark:text-white uppercase mb-2 tracking-tight">Dashboard</h1>
                    <p class="text-brand-muted">Welcome back, {{ Auth::user()->name }}</p>
                </div>
                <a href="{{ route('logout') }}" method="POST" @csrf class="px-4 py-2 text-xs font-bold text-rose-500 border border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors">
                    @csrf
                    <button type="submit" class="text-xs font-bold text-rose-500">Logout</button>
                </a>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl p-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                    <p class="text-[10px] font-mono text-brand-muted uppercase mb-2">New Inquiries</p>
                    <p class="text-2xl font-black text-brand-ink dark:text-white">{{ $stats['inquiries'] }}</p>
                </div>
                <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl p-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                    <p class="text-[10px] font-mono text-brand-muted uppercase mb-2">Active Projects</p>
                    <p class="text-2xl font-black text-brand-ink dark:text-white">{{ $stats['projects'] }}</p>
                </div>
                <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl p-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                    <p class="text-[10px] font-mono text-brand-muted uppercase mb-2">Blog Articles</p>
                    <p class="text-2xl font-black text-brand-ink dark:text-white">{{ $stats['blog'] }}</p>
                </div>
                <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl p-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                    <p class="text-[10px] font-mono text-brand-muted uppercase mb-2">Registered Users</p>
                    <p class="text-2xl font-black text-brand-ink dark:text-white">{{ $stats['users'] }}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-6">
                    <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
                        <div class="flex items-center justify-between px-6 py-4 border-b border-brand-line dark:border-slate-700">
                            <h3 class="text-sm font-bold text-brand-ink dark:text-white">Recent Inquiries</h3>
                            <a href="{{ route('dashboard.inquiries') }}" class="text-[10px] text-brand-primary font-bold hover:underline">View all →</a>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full text-xs">
                                <thead>
                                    <tr class="border-b border-brand-line dark:border-slate-700">
                                        @foreach(['Client', 'Service', 'Budget', 'Status'] as $header)
                                        <th class="text-left px-6 py-3 text-[10px] font-mono text-brand-muted uppercase tracking-widest">{{ $header }}</th>
                                        @endforeach
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-brand-line/40 dark:divide-slate-700/50">
                                    @foreach($recentInquiries as $inquiry)
                                    <tr class="hover:bg-brand-soft dark:hover:bg-slate-800 transition-colors">
                                        <td class="px-6 py-3.5 font-semibold text-brand-ink dark:text-white">{{ $inquiry->name }}</td>
                                        <td class="px-6 py-3.5 text-brand-muted">{{ $inquiry->service ?? 'N/A' }}</td>
                                        <td class="px-6 py-3.5 font-semibold text-brand-ink dark:text-slate-300">{{ $inquiry->budget ?? 'N/A' }}</td>
                                        <td class="px-6 py-3.5">
                                            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide bg-brand-primary/10 text-brand-primary">
                                                {{ $inquiry->status }}
                                            </span>
                                        </td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
                        <div class="px-6 py-4 border-b border-brand-line dark:border-slate-700">
                            <h3 class="text-sm font-bold text-brand-ink dark:text-white">Recent Projects</h3>
                        </div>
                        <div class="divide-y divide-brand-line/40 dark:divide-slate-700/50">
                            @foreach($recentProjects as $project)
                            <div class="px-6 py-4 hover:bg-brand-soft dark:hover:bg-slate-800 transition-colors">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <p class="text-sm font-bold text-brand-ink dark:text-white">{{ $project->name }}</p>
                                        <p class="text-xs text-brand-muted">{{ $project->client }}</p>
                                    </div>
                                    <span class="px-2.5 py-1 rounded-full text-[10px] font-bold {{ $project->status === 'Completed' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-brand-primary/10 text-brand-primary' }}">
                                        {{ $project->status }}
                                    </span>
                                </div>
                                <div class="w-full bg-brand-line/30 h-2 rounded-full overflow-hidden mt-2">
                                    <div class="bg-brand-primary h-full rounded-full" style="width: {{ $project->progress }}%"></div>
                                </div>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>

                <div class="space-y-6">
                    <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl p-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                        <h3 class="text-sm font-bold text-brand-ink dark:text-white mb-4">Quick Actions</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <a href="{{ route('dashboard.inquiries') }}" class="flex flex-col items-center gap-2 p-3 rounded-xl border border-brand-line text-center text-xs font-bold text-brand-primary hover:bg-brand-primary/8 transition-colors">
                                📥 Inquiries
                            </a>
                            <a href="{{ route('dashboard.projects') }}" class="flex flex-col items-center gap-2 p-3 rounded-xl border border-brand-line text-center text-xs font-bold text-brand-primary hover:bg-brand-primary/8 transition-colors">
                                📂 Projects
                            </a>
                            <a href="{{ route('dashboard.blog') }}" class="flex flex-col items-center gap-2 p-3 rounded-xl border border-brand-line text-center text-xs font-bold text-brand-primary hover:bg-brand-primary/8 transition-colors">
                                📝 Blog
                            </a>
                            <a href="{{ route('dashboard.services') }}" class="flex flex-col items-center gap-2 p-3 rounded-xl border border-brand-line text-center text-xs font-bold text-brand-primary hover:bg-brand-primary/8 transition-colors">
                                🛠 Services
                            </a>
                            <a href="{{ route('dashboard.skills') }}" class="flex flex-col items-center gap-2 p-3 rounded-xl border border-brand-line text-center text-xs font-bold text-brand-primary hover:bg-brand-primary/8 transition-colors">
                                ⚡ Skills
                            </a>
                            <a href="{{ route('dashboard.testimonials') }}" class="flex flex-col items-center gap-2 p-3 rounded-xl border border-brand-line text-center text-xs font-bold text-brand-primary hover:bg-brand-primary/8 transition-colors">
                                ⭐ Testimonials
                            </a>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl p-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                        <h3 class="text-sm font-bold text-brand-ink dark:text-white mb-4">Unread Messages</h3>
                        @if($recentMessages->isEmpty())
                        <p class="text-xs text-brand-muted text-center py-4">No unread messages.</p>
                        @else
                        <ul class="space-y-3">
                            @foreach($recentMessages as $message)
                            <li class="flex items-center gap-3 px-3 py-2 rounded-lg bg-brand-soft dark:bg-slate-800 hover:bg-brand-primary/5 transition-colors">
                                <div class="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xs">{{ strtoupper(substr($message->name, 0, 2)) }}</div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-xs font-bold text-brand-ink dark:text-white truncate">{{ $message->name }}</p>
                                    <p class="text-[10px] text-brand-muted truncate">{{ $message->subject }}</p>
                                </div>
                            </li>
                            @endforeach
                        </ul>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-slot>
</x-app-layout>