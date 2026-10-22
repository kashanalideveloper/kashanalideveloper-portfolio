<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ $title ?? config('app.name') }}</title>
    <meta name="description" content="{{ $description ?? 'Malik Kashan - Web Developer in Lahore, Pakistan. Next.js & Shopify expert building fast, custom web solutions.' }}">

    @if(isset($keywords))
        <meta name="keywords" content="{{ implode(', ', $keywords) }}">
    @endif

    <link rel="canonical" href="{{ $canonical ?? url()->current() }}">

    @if(isset($ogImage))
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="{{ $ogTitle ?? $title ?? config('app.name') }}">
        <meta property="og:description" content="{{ $description ?? '' }}">
        <meta property="og:image" content="{{ asset($ogImage) }}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:image" content="{{ asset($ogImage) }}">
    @endif

    <link rel="icon" href="{{ asset('favicon.png') }}">
    <link rel="apple-touch-icon" href="{{ asset('favicon.png') }}">

    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <style>
        body { font-family: 'Poppins', sans-serif; }
        .brand-bg { background-color: #ffffff; }
        .brand-bg.dark { background-color: #0f172a; }
        .brand-ink { color: #0f172a; }
        .brand-ink.dark { color: #ffffff; }
        .brand-muted { color: #64748b; }
        .brand-muted.dark { color: #94a3b8; }
        .brand-primary { color: #0891b2; }
        .brand-bg-primary { background-color: #0891b2; }
        .brand-line { border-color: #e2e8f0; }
        .brand-line.dark { border-color: #334155; }
        .brand-soft { background-color: #f6f8fb; }
        .brand-soft.dark { background-color: #1e293b; }
    </style>

    @stack('styles')
</head>
<body class="brand-bg text-brand-ink antialiased">

    @yield('content')

    @stack('scripts')

</body>
</html>