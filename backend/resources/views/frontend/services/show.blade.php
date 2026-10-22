<x-app-layout title="{{ $service->title }} | Malik Kashan"
    description="{{ $service->desc }}">
<x-slot name="content">
    <section class="py-16 sm:py-24 bg-brand-bg">
        <div class="max-w-4xl mx-auto px-6 sm:px-8">
            <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                <div class="p-8 sm:p-12">
                    <div class="flex items-center gap-2 mb-4">
                        <span class="text-[10px] font-mono uppercase tracking-wider text-brand-primary">Service</span>
                    </div>
                    <h1 class="text-3xl sm:text-5xl font-bold text-brand-ink dark:text-white mb-6 tracking-tight">{{ $service->title }}</h1>
                    <div class="text-brand-muted text-lg leading-relaxed mb-8">
                        {!! nl2br(e($service->desc)) !!}
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                        @if($service->price)
                        <div class="p-4 bg-brand-soft rounded-xl border border-brand-line">
                            <p class="text-xs text-brand-muted uppercase tracking-wider mb-1">Price</p>
                            <p class="text-brand-ink dark:text-white font-semibold">{{ $service->price }}</p>
                        </div>
                        @endif
                        @if($service->delivery)
                        <div class="p-4 bg-brand-soft rounded-xl border border-brand-line">
                            <p class="text-xs text-brand-muted uppercase tracking-wider mb-1">Delivery</p>
                            <p class="text-brand-ink dark:text-white font-semibold">{{ $service->delivery }}</p>
                        </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </section>
</x-slot>
</x-app-layout>