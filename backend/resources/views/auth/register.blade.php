<x-app-layout title="Register | Malik Kashan">
<x-slot name="content">
    <div class="min-h-screen bg-brand-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full bg-white dark:bg-slate-900 border border-brand-line dark:border-slate-700 rounded-2xl p-8 sm:p-10 shadow-[0_10px_24px_rgba(15,23,42,0.07)]">
            <div class="text-center mb-8">
                <h2 class="text-2xl sm:text-3xl font-bold text-brand-ink dark:text-white uppercase mb-2 tracking-tight">Create Account</h2>
                <p class="text-brand-muted">Join the dashboard as a client</p>
            </div>

            @if ($errors->any())
            <div class="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm">
                Please fix the following errors:<br>
                @foreach ($errors->all() as $error)
                • {{ $error }}<br>
                @endforeach
            </div>
            @endif

            <form method="POST" action="{{ route('register.store') }}" class="space-y-4">
                @csrf

                <div>
                    <label htmlFor="name" class="block text-[10px] font-mono uppercase tracking-wider text-brand-muted mb-1">Full Name</label>
                    <input id="name" name="name" type="text" required value="{{ old('name') }}" class="w-full bg-brand-soft text-brand-ink font-light text-sm p-3 rounded-xl border border-brand-line focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary placeholder-brand-muted/30 transition-all duration-200 @error('name') border-red-500 @enderror" placeholder="John Doe" />
                    @error('name') <p class="text-xs text-red-500 mt-1">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label htmlFor="email" class="block text-[10px] font-mono uppercase tracking-wider text-brand-muted mb-1">Email Address</label>
                    <input id="email" name="email" type="email" required value="{{ old('email') }}" class="w-full bg-brand-soft text-brand-ink font-light text-sm p-3 rounded-xl border border-brand-line focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary placeholder-brand-muted/30 transition-all duration-200 @error('email') border-red-500 @enderror" placeholder="you@example.com" />
                    @error('email') <p class="text-xs text-red-500 mt-1">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label htmlFor="password" class="block text-[10px] font-mono uppercase tracking-wider text-brand-muted mb-1">Password</label>
                    <input id="password" name="password" type="password" required minlength="8" class="w-full bg-brand-soft text-brand-ink font-light text-sm p-3 rounded-xl border border-brand-line focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary placeholder-brand-muted/30 transition-all duration-200 @error('password') border-red-500 @enderror" placeholder="••••••••" />
                    @error('password') <p class="text-xs text-red-500 mt-1">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label htmlFor="password_confirmation" class="block text-[10px] font-mono uppercase tracking-wider text-brand-muted mb-1">Confirm Password</label>
                    <input id="password_confirmation" name="password_confirmation" type="password" required minlength="8" class="w-full bg-brand-soft text-brand-ink font-light text-sm p-3 rounded-xl border border-brand-line focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary placeholder-brand-muted/30 transition-all duration-200 @error('password_confirmation') border-red-500 @enderror" placeholder="••••••••" />
                    @error('password_confirmation') <p class="text-xs text-red-500 mt-1">{{ $message }}</p> @enderror
                </div>

                <button type="submit" class="w-full py-3 px-6 rounded-xl text-xs font-bold font-mono uppercase tracking-widest bg-brand-primary text-white hover:bg-[#0ea5e9] transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(8,145,178,0.3)] active:scale-[0.98]">
                    Create Account
                </button>
            </form>

            <div class="mt-6 pt-6 border-t border-brand-line dark:border-slate-700 text-center">
                <p class="text-xs text-brand-muted">Already have an account?</p>
                <a href="{{ route('login') }}" class="text-xs font-bold text-brand-primary hover:underline">Sign in</a>
            </div>
        </div>
    </div>
</x-slot>
</x-app-layout>