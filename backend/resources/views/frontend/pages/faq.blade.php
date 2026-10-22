<x-app-layout title="FAQ | Malik Kashan - Web Developer in Lahore"
    description="Frequently asked questions about Malik Kashan's web development services in Lahore, Pakistan.">
<x-slot name="content">
    <section class="py-16 sm:py-24 bg-brand-bg">
        <div class="max-w-4xl mx-auto px-6 sm:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl sm:text-5xl font-bold text-brand-ink dark:text-white uppercase mb-4 tracking-tight">Frequently Asked Questions</h2>
                <p class="text-brand-muted">Have questions about working together? Here are the most common ones.</p>
            </div>

            <div class="space-y-4">
                @foreach([
                    ['q' => 'What services do you offer?', 'a' => 'I offer Next.js/React websites, Shopify e-commerce stores, WordPress development, Laravel backends, website redesign, UI/UX design, performance optimization, and website maintenance.'],
                    ['q' => 'Where are you based?', 'a' => 'I am based in Lahore, Punjab, Pakistan, but I work with clients worldwide remotely.'],
                    ['q' => 'How long does a project take?', 'a' => 'Project timelines vary based on scope. A typical website takes 7-21 days, e-commerce stores 10-25 days, and custom web apps 15-45 days.'],
                    ['q' => 'What is your pricing?', 'a' => 'Pricing depends on the project type and complexity. Websites start at Rs 80k, Shopify stores at Rs 1.2L, WordPress at Rs 50k, and Laravel backends at Rs 1.5L. Contact me for a custom quote.'],
                    ['q' => 'Do you provide SEO?', 'a' => 'Yes, all websites I build include on-page SEO setup, schema markup, and Core Web Vitals optimization. I also offer dedicated SEO optimization services.'],
                    ['q' => 'How can I contact you?', 'a' => 'You can reach me via the contact form, email at kashanalikot@gmail.com, WhatsApp at +92 328 1944386, or book a call through the contact page.'],
                ] as $item)
                <div class="bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl overflow-hidden">
                    <div class="p-6 border-b border-brand-line dark:border-slate-700 cursor-pointer group" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
                        <h3 class="font-bold text-brand-ink dark:text-white group-hover:text-brand-primary transition-colors">{{ $item['q'] }}</h3>
                        <span class="text-xs text-brand-primary">▾</span>
                    </div>
                    <div class="p-6 text-brand-muted border-b border-brand-line/40 dark:border-slate-700/50" style="display: none">
                        {{ $item['a'] }}
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>
</x-slot>
</x-app-layout>