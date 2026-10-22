<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;

class SitemapController extends Controller
{
    public function index()
    {
        $baseUrl = config('app.url');

        $routes = [
            ['url' => $baseUrl, 'priority' => 1.0, 'frequency' => 'weekly'],
            ['url' => $baseUrl . '/about', 'priority' => 0.9, 'frequency' => 'monthly'],
            ['url' => $baseUrl . '/projects', 'priority' => 0.9, 'frequency' => 'weekly'],
            ['url' => $baseUrl . '/services', 'priority' => 0.9, 'frequency' => 'monthly'],
            ['url' => $baseUrl . '/blog', 'priority' => 0.8, 'frequency' => 'weekly'],
            ['url' => $baseUrl . '/contact', 'priority' => 0.8, 'frequency' => 'monthly'],
            ['url' => $baseUrl . '/faq', 'priority' => 0.7, 'frequency' => 'monthly'],
            ['url' => $baseUrl . '/privacy-policy', 'priority' => 0.5, 'frequency' => 'yearly'],
            ['url' => $baseUrl . '/terms-conditions', 'priority' => 0.5, 'frequency' => 'yearly'],
        ];

        $blogRoutes = \App\Models\BlogPost::published()->orderByDesc('published_at')->get()->map(fn ($post) => [
            'url' => $baseUrl . '/blog/' . $post->slug,
            'lastModified' => $post->published_at?->format('Y-m-d') ?? now()->format('Y-m-d'),
            'priority' => 0.7,
            'frequency' => 'monthly',
        ]);

        $projectRoutes = \App\Models\Project::all()->map(fn ($project) => [
            'url' => $baseUrl . '/projects/' . $project->id,
            'lastModified' => $project->updated_at->format('Y-m-d'),
            'priority' => 0.6,
            'frequency' => 'monthly',
        ]);

        $serviceRoutes = \App\Models\Service::all()->map(fn ($service) => [
            'url' => $baseUrl . '/services/' . $service->id,
            'lastModified' => $service->updated_at->format('Y-m-d'),
            'priority' => 0.6,
            'frequency' => 'monthly',
        ]);

        $allRoutes = array_merge($routes, $blogRoutes->toArray(), $projectRoutes->toArray(), $serviceRoutes->toArray());

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        foreach ($allRoutes as $route) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($route['url'], ENT_QUOTES, 'UTF-8') . '</loc>';
            $xml .= '<lastmod>' . ($route['lastModified'] ?? now()->format('Y-m-d')) . '</lastmod>';
            $xml .= '<changefreq>' . $route['frequency'] . '</changefreq>';
            $xml .= '<priority>' . $route['priority'] . '</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}