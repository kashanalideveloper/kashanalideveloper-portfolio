<x-app-layout title="Skills | Dashboard">
<x-slot name="content">
    <div class="min-h-screen bg-brand-bg">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 py-8">
            <h1 class="text-3xl sm:text-5xl font-bold text-brand-ink dark:text-white uppercase mb-8 tracking-tight">Skills</h1>

            <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead class="border-b border-brand-line dark:border-slate-700">
                            <tr>
                                @foreach(['ID', 'Name', 'Category', 'Level'] as $header)
                                <th class="px-6 py-3 text-left text-[10px] font-mono text-brand-muted uppercase tracking-widest">{{ $header }}</th>
                                @endforeach
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-brand-line/40 dark:divide-slate-700/50">
                            @foreach($skills as $skill)
                            <tr class="hover:bg-brand-soft dark:hover:bg-slate-800 transition-colors">
                                <td class="px-6 py-3 text-brand-muted font-mono">{{ $skill->id }}</td>
                                <td class="px-6 py-3 font-semibold text-brand-ink dark:text-white">{{ $skill->name }}</td>
                                <td class="px-6 py-3 text-brand-muted">{{ $skill->category }}</td>
                                <td class="px-6 py-3">
                                    <div class="w-full bg-brand-line/30 h-2 rounded-full overflow-hidden">
                                        <div class="bg-brand-primary h-full rounded-full" style="width: {{ $skill->level }}%"></div>
                                    </div>
                                    <span class="text-[10px] font-bold">{{ $skill->level }}%</span>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</x-slot>
</x-app-layout>