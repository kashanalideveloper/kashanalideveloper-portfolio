<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;

class RobotsController extends Controller
{
    public function index()
    {
        $baseUrl = config('app.url');

        $content = "User-agent: *\n";
        $content .= "Allow: /\n";
        $content .= "Disallow: /dashboard/\n";
        $content .= "Disallow: /login\n";
        $content .= "Disallow: /register\n";
        $content .= "Disallow: /api/\n";
        $content .= "\n";
        $content .= "Sitemap: " . rtrim($baseUrl, '/') . "/sitemap.xml\n";

        return response($content, 200, ['Content-Type' => 'text/plain']);
    }
}