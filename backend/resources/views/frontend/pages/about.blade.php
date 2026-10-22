<x-app-layout title="About | Malik Kashan - Web Developer in Lahore"
    description="Learn more about Malik Kashan, a frontend and WordPress developer based in Lahore, Pakistan. Skills, experience, and testimonials.">
<x-slot name="content">
    <section class="py-16 sm:py-24 bg-brand-bg">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl sm:text-5xl font-bold text-brand-ink dark:text-white uppercase mb-4 tracking-tight">About Me</h2>
                <p class="text-brand-muted max-w-2xl mx-auto text-lg">I'm Malik Kashan, a full-stack web developer based in Lahore, Pakistan, specializing in Next.js, React, WordPress, Shopify, and Laravel. I build fast, secure, and high-converting websites for businesses worldwide.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div class="space-y-8">
                    <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl p-8 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                        <h3 class="text-xl font-bold text-brand-ink dark:text-white mb-4">Skills & Expertise</h3>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            @foreach($skills as $skill)
                            <div class="flex flex-col items-center p-4 bg-brand-soft dark:bg-slate-800 rounded-xl border border-brand-line dark:border-slate-700">
                                <span class="text-sm font-bold text-brand-ink dark:text-white mb-2">{{ $skill->name }}</span>
                                <div class="w-full bg-brand-line/30 h-2 rounded-full overflow-hidden">
                                    <div class="bg-brand-primary h-full rounded-full" style="width: {{ $skill->level }}%"></div>
                                </div>
                                <span class="text-xs text-brand-muted mt-1">{{ $skill->level }}%</span>
                            </div>
                            @endforeach
                        </div>
                    </div>

                    <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl p-8 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                        <h3 class="text-xl font-bold text-brand-ink dark:text-white mb-4">Location & Contact</h3>
                        <p class="text-brand-muted mb-2"><strong>City:</strong> Lahore, Punjab, Pakistan</p>
                        <p class="text-brand-muted mb-2"><strong>Email:</strong> kashanalikot@gmail.com</p>
                        <p class="text-brand-muted mb-2"><strong>Phone:</strong> +92 328 1944386</p>
                        <p class="text-brand-muted mb-2"><strong>WhatsApp:</strong> <a href="https://wa.me/923281944386" class="text-brand-primary hover:underline">+92 328 1944386</a></p>
                        <p class="text-brand-muted mb-2"><strong>GitHub:</strong> <a href="https://github.com/kashanalideveloper/" class="text-brand-primary hover:underline" target="_blank">github.com/kashanalideveloper</a></p>
                    </div>
                </div>

                <div class="space-y-8">
                    <h3 class="text-xl font-bold text-brand-ink dark:text-white">Client Testimonials</h3>
                    @foreach($testimonials as $testimonial)
                    <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl p-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xs shrink-0">{{ $testimonial->avatar ?? 'MK' }}</div>
                            <div class="flex-1">
                                <p class="text-brand-ink dark:text-white text-sm italic mb-2">"{{ $testimonial->text }}"</p>
                                <p class="text-xs font-bold text-brand-primary">{{ $testimonial->name }}</p>
                                <p class="text-xs text-brand-muted">{{ $testimonial->role }}</p>
                                <div class="flex gap-1 mt-2">
                                    @for($i = 0; $i < $testimonial->rating; $i++)
                                    <svg class="w-3 h-3 fill-amber-400 text-amber-400" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    @endfor
                                </div>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
    </section>
</x-slot>
</x-app-layout>