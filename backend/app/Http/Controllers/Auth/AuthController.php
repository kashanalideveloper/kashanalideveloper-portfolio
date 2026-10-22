<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;

class AuthController extends Controller
{
    public function login()
    {
        return view('auth.login');
    }

    public function authenticate(Request $request)
    {
        $ip = $request->ip();
        $key = 'login:' . $ip;

        if (RateLimiter::tooManyAttempts($key, (int) env('RATE_LIMIT_LOGIN_MAX', 5))) {
            $seconds = RateLimiter::availableIn($key);
            return back()->withErrors([
                'email' => 'Too many login attempts. Please try again in ' . $seconds . ' seconds.',
            ])->withInput($request->only('email'));
        }

        RateLimiter::hit($key, (int) env('RATE_LIMIT_LOGIN_DECAY', 15));

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!Auth::attempt($credentials, $request->boolean('remember'))) {
            RateLimiter::hit($key, (int) env('RATE_LIMIT_LOGIN_DECAY', 15));
            return back()->withErrors([
                'email' => 'Invalid email or password.',
            ])->withInput($request->only('email'));
        }

        RateLimiter::clear($key);
        $request->session()->regenerate();

        return redirect()->intended('/dashboard')->with('success', 'Welcome back!');
    }

    public function register()
    {
        return view('auth.register');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::create([
            'name' => e(trim($validated['name'])),
            'email' => e(strtolower(trim($validated['email']))),
            'password' => Hash::make($validated['password']),
            'role' => 'client',
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return redirect('/dashboard')->with('success', 'Account created successfully!');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/')->with('success', 'Logged out successfully.');
    }
}