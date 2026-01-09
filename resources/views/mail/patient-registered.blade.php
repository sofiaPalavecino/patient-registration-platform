@component('mail::message')
# Welcome {{ $patient->first_name }}

Your registration has been completed successfully.

**Email:** {{ $patient->email }}
**Phone:** {{ $patient->phone }}

Thanks,<br>
{{ config('app.name') }}
@endcomponent
