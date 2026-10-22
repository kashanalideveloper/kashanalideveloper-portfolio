<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Models\Message;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\User;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function overview()
    {
        $stats = [
            'inquiries' => Inquiry::count(),
            'projects' => Project::count(),
            'blog' => BlogPost::count(),
            'users' => User::count(),
        ];

        $recentInquiries = Inquiry::orderByDesc('created_at')->limit(5)->get();
        $recentProjects = Project::orderByDesc('created_at')->limit(5)->get();
        $recentMessages = Message::unread()->orderByDesc('created_at')->limit(5)->get();

        return view('backend.dashboard.overview', compact('stats', 'recentInquiries', 'recentProjects', 'recentMessages'));
    }

    public function inquiries()
    {
        $inquiries = Inquiry::orderByDesc('created_at')->paginate(15);
        return view('backend.dashboard.inquiries', compact('inquiries'));
    }

    public function users()
    {
        $users = User::orderByDesc('created_at')->paginate(15);
        return view('backend.dashboard.users', compact('users'));
    }

    public function projects()
    {
        $projects = Project::orderByDesc('created_at')->paginate(15);
        return view('backend.dashboard.projects', compact('projects'));
    }

    public function blog()
    {
        $posts = BlogPost::orderByDesc('created_at')->paginate(15);
        return view('backend.dashboard.blog', compact('posts'));
    }

    public function messages()
    {
        $messages = Message::orderByDesc('created_at')->paginate(15);
        return view('backend.dashboard.messages', compact('messages'));
    }

    public function services()
    {
        $services = Service::orderByDesc('created_at')->paginate(15);
        return view('backend.dashboard.services', compact('services'));
    }

    public function skills()
    {
        $skills = Skill::orderByDesc('level')->get();
        return view('backend.dashboard.skills', compact('skills'));
    }

    public function testimonials()
    {
        $testimonials = Testimonial::orderByDesc('created_at')->paginate(15);
        return view('backend.dashboard.testimonials', compact('testimonials'));
    }

    public function destroyInquiry($id)
    {
        $inquiry = Inquiry::findOrFail($id);
        $inquiry->delete();
        return redirect()->route('dashboard.inquiries')->with('success', 'Inquiry deleted successfully.');
    }

    public function destroyUser($id)
    {
        $user = User::findOrFail($id);
        if ($user->id === Auth::user()->id) {
            return redirect()->route('dashboard.users')->with('error', 'You cannot delete your own account.');
        }
        $user->delete();
        return redirect()->route('dashboard.users')->with('success', 'User deleted successfully.');
    }
}