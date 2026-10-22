<x-app-layout title="Testimonials | Dashboard">
<x-slot name="content">
    <div class="min-h-screen bg-brand-bg">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 py-8">
            <h1 class="text-3xl sm:text-5xl font-bold text-brand-ink dark:text-white uppercase mb-8 tracking-tight">Testimonials</h1>

            <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead class="border-b border-brand-line dark:border-slate-700">
                            <tr>
                                @foreach(['ID', 'Name', 'Role', 'Rating', 'Approved', 'Date'] as $header)
                                <th class="px-6 py-3 text-left text-[10px] font-mono text-brand-muted uppercase tracking-widest">{{ $header }}</th>
                                @endforeach
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-brand-line/40 dark:divide-slate-700/50">
                            @foreach($testimonials as $testimonial)
                            <tr class="hover:bg-brand-soft dark:hover:bg-slate-800 transition-colors">
                                <td class="px-6 py-3 text-brand-muted font-mono">{{ $testimonial->id }}</td>
                                <td class="px-6 py-3 font-semibold text-brand-ink dark:text-white">{{ $testimonial->name }}</td>
                                <td class="px-6 py-3 text-brand-muted">{{ $testimonial->role }}</td>
                                <td class="px-6 py-3 text-brand-muted">
                                    @for($i = 0; $i < $testimonial->rating; $i++)
                                    <svg class="w-3 h-3 fill-amber-400 text-amber-400 inline" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    @endfor
                                </td>
                                <td class="px-6 py-3">
                                    <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide {{ $testimonial->approved ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-brand-primary/10 text-brand-primary' }}">
                                        {{ $testimonial->approved ? 'Approved' : 'Pending' }}
                                    </span>
                                </td>
                                <td class="px-6 py-3 text-brand-muted font-mono text-xs">{{ $testimonial->date ? $testimonial->date->format('M d, Y') : 'N/A' }}</td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="mt-4 text-center">
                {{ $testimonials->links() }}
            </div>
        </div>
    </div>
</x-slot>
</x-app-layout>