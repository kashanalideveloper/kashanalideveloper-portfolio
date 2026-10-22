<x-app-layout title="Projects | Dashboard">
<x-slot name="content">
    <div class="min-h-screen bg-brand-bg">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 py-8">
            <h1 class="text-3xl sm:text-5xl font-bold text-brand-ink dark:text-white uppercase mb-8 tracking-tight">Projects</h1>

            <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead class="border-b border-brand-line dark:border-slate-700">
                            <tr>
                                @foreach(['ID', 'Name', 'Client', 'Status', 'Progress', 'Tech', 'Budget', 'Deadline'] as $header)
                                <th class="px-6 py-3 text-left text-[10px] font-mono text-brand-muted uppercase tracking-widest">{{ $header }}</th>
                                @endforeach
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-brand-line/40 dark:divide-slate-700/50">
                            @foreach($projects as $project)
                            <tr class="hover:bg-brand-soft dark:hover:bg-slate-800 transition-colors">
                                <td class="px-6 py-3 text-brand-muted font-mono">{{ $project->id }}</td>
                                <td class="px-6 py-3 font-semibold text-brand-ink dark:text-white">{{ $project->name }}</td>
                                <td class="px-6 py-3 text-brand-muted">{{ $project->client }}</td>
                                <td class="px-6 py-3">
                                    <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide {{ $project->status === 'Completed' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-brand-primary/10 text-brand-primary' }}">
                                        {{ $project->status }}
                                    </span>
                                </td>
                                <td class="px-6 py-3 text-brand-muted">
                                    <div class="w-full bg-brand-line/30 h-2 rounded-full overflow-hidden">
                                        <div class="bg-brand-primary h-full rounded-full" style="width: {{ $project->progress }}%"></div>
                                    </div>
                                    <span class="text-[10px] font-bold">{{ $project->progress }}%</span>
                                </td>
                                <td class="px-6 py-3 text-brand-muted">{{ $project->tech }}</td>
                                <td class="px-6 py-3 text-brand-muted">{{ $project->budget }}</td>
                                <td class="px-6 py-3 text-brand-muted font-mono text-xs">{{ $project->deadline ? $project->deadline->format('M d, Y') : 'N/A' }}</td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="mt-4 text-center">
                {{ $projects->links() }}
            </div>
        </div>
    </div>
</x-slot>
</x-app-layout>