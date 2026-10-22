<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function home()
    {
        $services = Service::active()->limit(6)->get();
        $projects = Project::orderByDesc('created_at')->limit(6)->get();
        $testimonials = Testimonial::approved()->orderByDesc('date')->limit(6)->get();
        $skills = Skill::orderByDesc('level')->limit(12)->get();
        $recentBlog = BlogPost::published()->orderByDesc('published_at')->limit(3)->get();

        return view('frontend.pages.home', compact('services', 'projects', 'testimonials', 'skills', 'recentBlog'));
    }

    public function about()
    {
        $skills = Skill::orderByDesc('level')->get();
        $testimonials = Testimonial::approved()->orderByDesc('date')->get();

        return view('frontend.pages.about', compact('skills', 'testimonials'));
    }

    public function faq()
    {
        return view('frontend.pages.faq');
    }

    public function privacy()
    {
        return view('frontend.pages.privacy');
    }

    public function terms()
    {
        return view('frontend.pages.terms');
    }

    public function contact()
    {
        return view('frontend.pages.contact');
    }
}