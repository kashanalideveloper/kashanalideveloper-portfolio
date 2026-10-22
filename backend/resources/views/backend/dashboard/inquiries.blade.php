<x-app-layout title="Inquiries | Dashboard">
<x-slot name="content">
    <div class="min-h-screen bg-brand-bg">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 py-8">
            <h1 class="text-3xl sm:text-5xl font-bold text-brand-ink dark:text-white uppercase mb-8 tracking-tight">Inquiries</h1>

            <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead class="border-b border-brand-line dark:border-slate-700">
                            <tr>
                                @foreach(['ID', 'Name', 'Email', 'Company', 'Service', 'Budget', 'Status', 'Date'] as $header)
                                <th class="px-6 py-3 text-left text-[10px] font-mono text-brand-muted uppercase tracking-widest">{{ $header }}</th>
                                @endforeach
                                <th class="px-6 py-3 text-right text-[10px] font-mono text-brand-muted uppercase tracking-widest">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-brand-line/40 dark:divide-slate-700/50">
                            @foreach($inquiries as $inquiry)
                            <tr class="hover:bg-brand-soft dark:hover:bg-slate-800 transition-colors">
                                <td class="px-6 py-3 text-brand-muted font-mono">{{ $inquiry->id }}</td>
                                <td class="px-6 py-3 font-semibold text-brand-ink dark:text-white">{{ $inquiry->name }}</td>
                                <td class="px-6 py-3 text-brand-muted">{{ $inquiry->email }}</td>
                                <td class="px-6 py-3 text-brand-muted">{{ $inquiry->company ?? 'N/A' }}</td>
                                <td class="px-6 py-3 text-brand-muted">{{ $inquiry->service ?? 'N/A' }}</td>
                                <td class="px-6 py-3 text-brand-muted">{{ $inquiry->budget ?? 'N/A' }}</td>
                                <td class="px-6 py-3">
                                    <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide bg-brand-primary/10 text-brand-primary">
                                        {{ $inquiry->status }}
                                    </span>
                                </td>
                                <td class="px-6 py-3 text-brand-muted font-mono text-xs">{{ $inquiry->created_at->format('M d, Y') }}</td>
                                <td class="px-6 py-3 text-right">
                                    <form action="{{ route('dashboard.inquiries.destroy', $inquiry->id) }}" method="POST" class="inline">
                                        @csrf @method('DELETE')
                                        <button type="submit" class="text-xs text-rose-500 hover:text-rose-700 dark:hover:text-rose-400" onclick="return confirm('Delete this inquiry?')">Delete</button>
                                    </form>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="mt-4 text-center">
                {{ $inquiries->links() }}
            </div>
        </div>
    </div>
</x-slot>
</x-app-layout>