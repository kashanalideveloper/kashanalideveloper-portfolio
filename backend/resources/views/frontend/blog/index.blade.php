<x-app-layout title="Blog | Malik Kashan - Web Developer in Lahore"
    description="Read blog articles about web development, Next.js, WordPress, SEO, and more by Malik Kashan.">
<x-slot name="content">
    <section class="py-16 sm:py-24 bg-brand-bg">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl sm:text-5xl font-bold text-brand-ink dark:text-white uppercase mb-4 tracking-tight">Blog</h2>
                <p class="text-brand-muted">Insights on web development, Next.js, WordPress, SEO, and building high-performance websites.</p>
            </div>

            <div class="flex justify-between items-center mb-8">
                <div class="flex gap-2">
                    @foreach($categories as $category)
                    <a href="{{ request()->fullUrlWithQuery(['category' => $category]) }}" class="px-4 py-2 text-xs font-bold uppercase tracking-wider border border-brand-line rounded-lg text-brand-muted hover:text-brand-primary hover:border-brand-primary transition-colors {{ request('category') === $category ? 'bg-brand-primary text-white border-brand-primary' : '' }}">
                        {{ $category }}
                    </a>
                    @endforeach
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach($posts as $post)
                <article class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl overflow-hidden hover:border-brand-primary/50 transition-colors group">
                    @if($post->image)
                    <img src="{{ asset($post->image) }}" alt="{{ $post->title }}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    @else
                    <div class="w-full h-48 bg-brand-soft dark:bg-slate-800 flex items-center justify-center">
                        <span class="text-brand-muted text-sm">No Image</span>
                    </div>
                    @endif
                    <div class="p-6">
                        <div class="flex items-center gap-2 mb-3">
                            <span class="text-[10px] font-mono uppercase tracking-wider text-brand-primary">{{ $post->category }}</span>
                            <span class="text-[10px] text-brand-muted">{{ $post->read_time }}</span>
                        </div>
                        <h3 class="text-xl font-bold text-brand-ink dark:text-white mb-3 group-hover:text-brand-primary transition-colors">{{ $post->title }}</h3>
                        <p class="text-brand-muted text-sm mb-4 line-clamp-2">{{ $post->excerpt }}</p>
                        <a href="{{ route('blog.show', $post->slug) }}" class="text-xs font-bold text-brand-primary hover:underline inline-block">Read more →</a>
                    </div>
                </article>
                @endforeach
            </div>

            <div class="mt-8 text-center">
                {{ $posts->links() }}
            </div>
        </div>
    </section>
</x-slot>
</x-app-layout>