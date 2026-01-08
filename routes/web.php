<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Settings\PatientController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/patients', function () {
        return Inertia::render('Patients/Index');
    })->name('patients.index');

    Route::get('/patients/create', function () {
        return Inertia::render('Patients/Create');
    })->name('patients.create');

    Route::post('/patients/create', [PatientController::class, 'create'])
        ->name('patients.store');
});

require __DIR__.'/settings.php';
