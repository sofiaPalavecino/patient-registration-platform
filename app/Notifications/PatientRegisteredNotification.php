<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Mail\PatientRegistered;
use Illuminate\Mail\Mailable;
use App\Models\Patient;

class PatientRegisteredNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Patient $patient){}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        /**
         * TODO: add 'sms' to the array when SMS notification is implemented
         */
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): Mailable
    {
        return new PatientRegistered($this->patient);
    }

    /**
     * TODO: implement the SMS notification here
     */

}
