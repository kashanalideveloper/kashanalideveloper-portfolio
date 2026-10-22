<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'role', 'avatar', 'rating', 'text', 'date', 'approved',
    ];

    protected $casts = [
        'rating' => 'integer',
        'approved' => 'boolean',
        'date' => 'date',
    ];

    public function scopeApproved($query)
    {
        return $query->where('approved', true);
    }
}