<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'subject', 'preview', 'unread', 'thread',
    ];

    protected $casts = [
        'unread' => 'boolean',
        'thread' => 'array',
    ];

    public function scopeUnread($query)
    {
        return $query->where('unread', true);
    }
}