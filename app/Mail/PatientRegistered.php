<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Patient;
use Illuminate\Mail\Mailables\Address;

class PatientRegistered extends Mailable implements ShouldQueue {
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public Patient $patient){}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $fullName = $this->patient->first_name . ' ' . $this->patient->last_name;

        return new Envelope(
            subject: "{$fullName}, your registration is confirmed",
            cc: [new Address(env('REGISTRATION_CC_MAIL'), env('REGISTRATION_CC_NAME'))]
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.patient-registered',
        );
    }
}
