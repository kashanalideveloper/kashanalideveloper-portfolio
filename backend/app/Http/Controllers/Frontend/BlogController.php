<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = BlogPost::published()->orderByDesc('published_at');

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $categories = BlogPost::published()->distinct()->pluck('category');
        $posts = $query->paginate(9)->withQueryString();

        return view('frontend.blog.index', compact('posts', 'categories'));
    }

    public function show(BlogPost $post)
    {
        return view('frontend.blog.show', compact('post'));
    }
}