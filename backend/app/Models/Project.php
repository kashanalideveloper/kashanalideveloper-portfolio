<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'client', 'status', 'progress', 'budget',
        'deadline', 'tech', 'description',
    ];

    protected $casts = [
        'progress' => 'integer',
        'deadline' => 'date',
    ];
}