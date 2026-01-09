<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/patients');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/patients', function () {
        return Inertia::render('Patients/PatientsUnified');
    })->name('patients.index');

    Route::get('/patients/create', function () {
        return redirect('/patients');
    })->name('patients.create');
});

require __DIR__.'/settings.php';
