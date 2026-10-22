<x-app-layout title="Projects | Malik Kashan - Web Developer in Lahore"
    description="View Malik Kashan's web development projects portfolio.">
<x-slot name="content">
    <section class="py-16 sm:py-24 bg-brand-bg">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl sm:text-5xl font-bold text-brand-ink dark:text-white uppercase mb-4 tracking-tight">Projects</h2>
                <p class="text-brand-muted">A selection of websites, web apps, and digital products I've built for clients.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach($projects as $project)
                <article class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl overflow-hidden hover:border-brand-primary/50 transition-colors group">
                    <div class="h-48 bg-brand-soft dark:bg-slate-800 flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors">
                        <span class="text-brand-muted text-sm">{{ $project->tech }}</span>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-brand-ink dark:text-white mb-2">{{ $project->name }}</h3>
                        <p class="text-brand-muted text-sm mb-3">{{ $project->client }}</p>
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-xs font-bold text-brand-primary">{{ $project->status }}</span>
                            <span class="text-xs text-brand-muted">{{ $project->budget }}</span>
                        </div>
                        <div class="w-full bg-brand-line/30 h-2 rounded-full overflow-hidden mb-4">
                            <div class="bg-brand-primary h-full rounded-full" style="width: {{ $project->progress }}%"></div>
                        </div>
                        <a href="{{ route('projects.show', $project->id) }}" class="text-xs font-bold text-brand-primary hover:underline inline-block">View details →</a>
                    </div>
                </article>
                @endforeach
            </div>

            <div class="mt-8 text-center">
                {{ $projects->links() }}
            </div>
        </div>
    </section>
</x-slot>
</x-app-layout>