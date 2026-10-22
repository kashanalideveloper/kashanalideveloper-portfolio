<?php

return [

    'to_email' => env('CONTACT_TO_EMAIL', 'kashanalikot@gmail.com'),
    'from_email' => env('CONTACT_FROM_EMAIL', 'noreply@example.com'),

    'rate_limit_max' => (int) env('RATE_LIMIT_CONTACT_MAX', 5),
    'rate_limit_decay' => (int) env('RATE_LIMIT_CONTACT_DECAY', 10),

];
