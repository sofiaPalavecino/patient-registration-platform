<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Patient extends Model
{

    use Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'country_code',
        'phone',
        'document_image_path',
    ];
}
