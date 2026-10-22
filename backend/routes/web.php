<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Frontend\PageController;
use App\Http\Controllers\Frontend\BlogController;
use App\Http\Controllers\Frontend\ProjectController;
use App\Http\Controllers\Frontend\ServiceController;
use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Frontend\SitemapController;
use App\Http\Controllers\Frontend\RobotsController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Auth\AuthController;

/* ─── SEO ─── */
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
Route::get('/robots.txt', [RobotsController::class, 'index'])->name('robots');

/* ─── Public Pages (Frontend) ─── */
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/faq', [PageController::class, 'faq'])->name('faq');
Route::get('/privacy-policy', [PageController::class, 'privacy'])->name('privacy');
Route::get('/terms-conditions', [PageController::class, 'terms'])->name('terms');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');

/* ─── Blog (Frontend) ─── */
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

/* ─── Projects (Frontend) ─── */
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');

/* ─── Services (Frontend) ─── */
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/services/{service}', [ServiceController::class, 'show'])->name('services.show');

/* ─── Contact Form (Frontend) ─── */
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

/* ─── Auth ─── */
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/login', [AuthController::class, 'authenticate'])->name('authenticate');
Route::get('/register', [AuthController::class, 'register'])->name('register');
Route::post('/register', [AuthController::class, 'store'])->name('register.store');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

/* ─── Dashboard (Backend, Auth Required) ─── */
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'overview'])->name('dashboard.overview');
    Route::get('/dashboard/inquiries', [DashboardController::class, 'inquiries'])->name('dashboard.inquiries');
    Route::get('/dashboard/users', [DashboardController::class, 'users'])->name('dashboard.users');
    Route::get('/dashboard/projects', [DashboardController::class, 'projects'])->name('dashboard.projects');
    Route::get('/dashboard/blog', [DashboardController::class, 'blog'])->name('dashboard.blog');
    Route::get('/dashboard/messages', [DashboardController::class, 'messages'])->name('dashboard.messages');
    Route::get('/dashboard/services', [DashboardController::class, 'services'])->name('dashboard.services');
    Route::get('/dashboard/skills', [DashboardController::class, 'skills'])->name('dashboard.skills');
    Route::get('/dashboard/testimonials', [DashboardController::class, 'testimonials'])->name('dashboard.testimonials');
Route::delete('/dashboard/inquiries/{inquiry}', [DashboardController::class, 'destroyInquiry'])->name('dashboard.inquiries.destroy');
Route::delete('/dashboard/users/{user}', [DashboardController::class, 'destroyUser'])->name('dashboard.users.destroy');
});