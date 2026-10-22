<x-app-layout title="Services | Malik Kashan - Web Developer in Lahore"
    description="Web development services offered by Malik Kashan in Lahore, Pakistan.">
<x-slot name="content">
    <section class="py-16 sm:py-24 bg-brand-bg">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl sm:text-5xl font-bold text-brand-ink dark:text-white uppercase mb-4 tracking-tight">Services</h2>
                <p class="text-brand-muted">Custom web solutions tailored to your business needs.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach($services as $service)
                <article class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl p-8 hover:border-brand-primary/50 transition-colors group">
                    <div class="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary/20 transition-colors">
                        <span class="text-2xl">{{ $service->icon ?? '🔧' }}</span>
                    </div>
                    <h3 class="text-xl font-bold text-brand-ink dark:text-white mb-3">{{ $service->title }}</h3>
                    <p class="text-brand-muted text-sm leading-relaxed mb-6">{{ $service->desc }}</p>
                    <div class="space-y-2 text-sm text-brand-muted">
                        @if($service->price)
                        <p><strong>Price:</strong> {{ $service->price }}</p>
                        @endif
                        @if($service->delivery)
                        <p><strong>Delivery:</strong> {{ $service->delivery }}</p>
                        @endif
                    </div>
                    <a href="{{ route('services.show', $service->id) }}" class="text-xs font-bold text-brand-primary mt-4 inline-block hover:underline">Learn more →</a>
                </article>
                @endforeach
            </div>
        </div>
    </section>
</x-slot>
</x-app-layout>