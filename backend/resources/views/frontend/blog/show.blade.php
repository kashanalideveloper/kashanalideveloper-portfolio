<x-app-layout title="{{ $post->title }} | Malik Kashan"
    description="{{ $post->excerpt }}">
<x-slot name="content">
    <section class="py-16 sm:py-24 bg-brand-bg">
        <div class="max-w-3xl mx-auto px-6 sm:px-8">
            <article class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                @if($post->image)
                <img src="{{ asset($post->image) }}" alt="{{ $post->title }}" class="w-full h-64 object-cover" />
                @endif
                <div class="p-8 sm:p-12">
                    <div class="flex items-center gap-2 mb-4">
                        <span class="text-[10px] font-mono uppercase tracking-wider text-brand-primary">{{ $post->category }}</span>
                        <span class="text-[10px] text-brand-muted">{{ $post->read_time }}</span>
                        <span class="text-[10px] text-brand-muted">{{ $post->published_at?->format('M d, Y') }}</span>
                    </div>
                    <h1 class="text-3xl sm:text-5xl font-bold text-brand-ink dark:text-white mb-6 tracking-tight leading-tight">{{ $post->title }}</h1>
                    <div class="text-brand-muted text-lg leading-relaxed mb-8">
                        {!! $post->content !!}
                    </div>
                </div>
            </article>
        </div>
    </section>
</x-slot>
</x-app-layout>