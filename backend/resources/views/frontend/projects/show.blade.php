<x-app-layout title="{{ $project->name }} | Malik Kashan"
    description="{{ $project->description ?? 'Project by Malik Kashan' }}">
<x-slot name="content">
    <section class="py-16 sm:py-24 bg-brand-bg">
        <div class="max-w-4xl mx-auto px-6 sm:px-8">
            <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                <div class="h-64 bg-brand-soft dark:bg-slate-800 flex items-center justify-center">
                    <span class="text-brand-muted text-sm">{{ $project->tech }}</span>
                </div>
                <div class="p-8 sm:p-12">
                    <h1 class="text-3xl sm:text-5xl font-bold text-brand-ink dark:text-white mb-6 tracking-tight">{{ $project->name }}</h1>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div>
                            <p class="text-xs text-brand-muted uppercase tracking-wider mb-1">Client</p>
                            <p class="text-brand-ink dark:text-white font-semibold">{{ $project->client }}</p>
                        </div>
                        <div>
                            <p class="text-xs text-brand-muted uppercase tracking-wider mb-1">Status</p>
                            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold {{ $project->status === 'Completed' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-brand-primary/10 text-brand-primary' }}">
                                {{ $project->status }}
                            </span>
                        </div>
                        <div>
                            <p class="text-xs text-brand-muted uppercase tracking-wider mb-1">Budget</p>
                            <p class="text-brand-ink dark:text-white font-semibold">{{ $project->budget }}</p>
                        </div>
                        <div>
                            <p class="text-xs text-brand-muted uppercase tracking-wider mb-1">Tech</p>
                            <p class="text-brand-ink dark:text-white font-semibold">{{ $project->tech }}</p>
                        </div>
                    </div>
                    <div class="mb-8">
                        <p class="text-xs text-brand-muted uppercase tracking-wider mb-2">Progress</p>
                        <div class="w-full bg-brand-line/30 h-3 rounded-full overflow-hidden">
                            <div class="bg-brand-primary h-full rounded-full" style="width: {{ $project->progress }}%"></div>
                        </div>
                        <p class="text-xs font-bold mt-1 text-brand-ink dark:text-white">{{ $project->progress }}% Complete</p>
                    </div>
                    @if($project->description)
                    <div class="text-brand-muted leading-relaxed">
                        {!! nl2br(e($project->description)) !!}
                    </div>
                    @endif
                </div>
            </div>
        </div>
    </section>
</x-slot>
</x-app-layout>