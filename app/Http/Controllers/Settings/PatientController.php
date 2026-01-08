<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Patient;


class PatientController extends Controller
{
    

    public function create(Request $request)
    {
        //dd(json_encode($request->all()));
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email:rfc,dns|unique:patients,email',
            'country_code' => 'required|regex:/^\d{1,3}$/',
            'phone' => 'required|min:11|numeric',
            'document_image' => 'required|image|mimes:jpg|max:2048',
        ]);

        $path = $request->file('document_image')
            ->store('storage/patients/documents', 'public');

        Patient::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'country_code' => $validated['country_code'],
            'phone' => $validated['phone'],
            'document_image_path' => $path,
        ]);

        return redirect()
            ->route('patients.index')
            ->with('success', 'Patient created successfully.');
    }

    public function edit(Patient $patient)
    {
        return view('settings.patients.edit', compact('patient'));
    }


}
