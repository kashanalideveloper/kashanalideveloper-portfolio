<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $ip = $request->ip();

        if (RateLimiter::tooManyAttempts("contact:{$ip}", config('contact.rate_limit_max'))) {
            $seconds = RateLimiter::availableIn("contact:{$ip}");
            return response()->json([
                'ok' => false,
                'error' => 'Too many messages. Please try again in ' . $seconds . ' seconds.',
            ], 429);
        }

        RateLimiter::hit("contact:{$ip}", config('contact.rate_limit_decay'));

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150'],
            'company' => ['nullable', 'string', 'max:150'],
            'service' => ['nullable', 'string', 'max:100'],
            'budget' => ['nullable', 'string', 'max:100'],
            'message' => ['required', 'string', 'max:5000'],
            'website' => ['sometimes', 'nullable', 'string'],
        ]);

        if (filled($validated['website']) && trim($validated['website']) !== '') {
            return response()->json([
                'ok' => true,
                'message' => 'Message received.',
            ]);
        }

        $cleanName = e(trim($validated['name']));
        $cleanEmail = e(trim($validated['email']));
        $cleanCompany = e(trim($validated['company'] ?? 'N/A'));
        $cleanService = e(trim($validated['service'] ?? 'Not specified'));
        $cleanBudget = e(trim($validated['budget'] ?? 'Not specified'));
        $cleanMessage = nl2br(e(trim($validated['message'])));

        $inquiry = Inquiry::create([
            'name' => $cleanName,
            'email' => $cleanEmail,
            'company' => $cleanCompany,
            'service' => $cleanService,
            'budget' => $cleanBudget,
            'message' => $cleanMessage,
            'status' => 'new',
            'ip_address' => $ip,
        ]);

        try {
            $this->sendInquiryEmail($inquiry);
        } catch (\Exception $e) {
            Log::warning('Contact form email failed: ' . $e->getMessage());
        }

        return response()->json([
            'ok' => true,
            'message' => 'Message sent successfully!',
        ]);
    }

    protected function sendInquiryEmail(Inquiry $inquiry): void
    {
        $to = config('contact.to_email');
        if (empty($to) || $to === 'kashanalikot@gmail.com') {
            Log::info('Contact inquiry logged (no email provider configured): ' . $inquiry->name . ' | ' . $inquiry->email);
            return;
        }

        $html = view('emails.inquiry', compact('inquiry'))->render();

        Mail::send([], [], function ($message) use ($to, $inquiry, $html) {
            $message->to($to)
                ->from(config('mail.from.address'), config('mail.from.name'))
                ->replyTo($inquiry->email, $inquiry->name)
                ->subject('New Project Inquiry from ' . $inquiry->name)
                ->setHtml($html);
        });
    }
}