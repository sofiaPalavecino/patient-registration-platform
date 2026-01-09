<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Patient;
use App\Http\Resources\PatientResource;
use App\Notifications\PatientRegisteredNotification;

class PatientController extends Controller
{

    public function index()
    {
        return PatientResource::collection(
            Patient::latest()->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255|regex:/^[A-Za-z\s]+$/',
            'last_name' => 'required|string|max:255|regex:/^[A-Za-z\s]+$/',
            'email' => 'required|email:rfc,dns|unique:patients,email|ends_with:@gmail.com',
            'country_code' => 'required|regex:/^\d{1,3}$/',
            'phone' => 'required|string|min:10|regex:/^[0-9]+$/',
            'document_image' => 'required|image|mimes:jpg|max:2048',
        ], [
            'document_image.max' => 'The document image must not be greater than 2MB.',
            'email.ends_with' => 'The email must be a valid Gmail address.',
        ]);

        $path = $request->file('document_image')
            ->store('/patients/documents', 'public');

        $patient = Patient::create([
            ...$validated,
            'document_image_path' => $path,
        ]);

        try {
            $patient->notify(new \App\Notifications\PatientRegisteredNotification($patient));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Patient created but notification failed',
                'error' => $e->getMessage(),
                'data' => $patient,
            ], 500);
        }

        return response()->json([
            'message' => 'Patient created successfully',
            'data' => $patient,
        ], 201);
    }

    public function show(Patient $patient)
    {
        return new PatientResource($patient);
    }

}
