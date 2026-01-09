<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use App\Models\Patient;
use App\Models\User;

class PatientApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withHeaders(['Accept' => 'application/json']);
    }

    /** @test */
    public function it_can_create_a_patient()
    {
        Storage::fake('public');

        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $file = UploadedFile::fake()->image('document.jpg');

        $payload = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@gmail.com',
            'phone' => '11123456789',
            'country_code' => '54',
            'document_image' => $file,
        ];

        $response = $this->post('/api/patients', $payload);

        $response->assertStatus(201);
        $this->assertDatabaseHas('patients', [
            'email' => 'john@gmail.com',
            'first_name' => 'John',
        ]);

        $patient = Patient::where('email', 'john@gmail.com')->firstOrFail();

        $this->assertTrue(Storage::disk('public')->exists($patient->document_image_path));

    }

    /** @test */
    public function it_requires_all_fields()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $response = $this->post('/api/patients', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'first_name',
            'last_name',
            'email',
            'country_code',
            'phone',
            'document_image'
        ]);
    }

    /** @test */
    public function it_validates_first_name_format()
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');
        $file = UploadedFile::fake()->image('document.jpg');


        $payload = $this->getValidPayload($file);
        $payload['first_name'] = 'John123';

        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['first_name']);


        $payload['first_name'] = 'John@#$';
        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['first_name']);


        $payload['first_name'] = 'John Paul';
        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(201);
    }

    /** @test */
    public function it_validates_last_name_format()
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');
        $file = UploadedFile::fake()->image('document.jpg');

        $payload = $this->getValidPayload($file);
        $payload['last_name'] = 'Doe123';

        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['last_name']);
    }

    /** @test */
    public function it_validates_email_format()
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');
        $file = UploadedFile::fake()->image('document.jpg');

        $payload = $this->getValidPayload($file);


        $payload['email'] = 'invalid-email';
        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);


        $payload['email'] = 'test@yahoo.com';
        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function it_validates_email_uniqueness()
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');
        $file = UploadedFile::fake()->image('document.jpg');

        
        Patient::create([
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane@gmail.com',
            'country_code' => '54',
            'phone' => '1112345678',
            'document_image_path' => 'test/path.jpg'
        ]);

        $payload = $this->getValidPayload($file);
        $payload['email'] = 'jane@gmail.com';

        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function it_validates_country_code_format()
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');
        $file = UploadedFile::fake()->image('document.jpg');

        $payload = $this->getValidPayload($file);

        
        $payload['country_code'] = 'AB';
        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['country_code']);

        
        $payload['country_code'] = '1234';
        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['country_code']);

        
        $payload['country_code'] = '1';
        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(201);
    }

    /** @test */
    public function it_validates_phone_format_and_length()
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');
        $file = UploadedFile::fake()->image('document.jpg');

        $payload = $this->getValidPayload($file);

        
        $payload['phone'] = '111234567a';
        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['phone']);

        
        $payload['phone'] = '123456789';
        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['phone']);

        
        $payload['phone'] = '111-234-5678';
        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['phone']);
    }

    /** @test */
    public function it_validates_document_image_type()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        
        $file = UploadedFile::fake()->image('document.png');
        $payload = $this->getValidPayload($file);

        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['document_image']);

        
        $file = UploadedFile::fake()->create('document.pdf', 100);
        $payload = $this->getValidPayload($file);

        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['document_image']);
    }

    /** @test */
    public function it_validates_document_image_size()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        
        $file = UploadedFile::fake()->image('document.jpg')->size(3000); // 3MB
        $payload = $this->getValidPayload($file);

        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['document_image']);
    }

    /** @test */
    public function it_validates_name_length()
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');
        $file = UploadedFile::fake()->image('document.jpg');

        $payload = $this->getValidPayload($file);

        
        $payload['first_name'] = str_repeat('A', 256);
        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['first_name']);

        
        $payload = $this->getValidPayload($file);
        $payload['last_name'] = str_repeat('B', 256);
        $response = $this->post('/api/patients', $payload);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['last_name']);
    }

    private function getValidPayload($file): array
    {
        return [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john' . rand(1000, 9999) . '@gmail.com',
            'phone' => '1112345678',
            'country_code' => '54',
            'document_image' => $file,
        ];
    }
}
