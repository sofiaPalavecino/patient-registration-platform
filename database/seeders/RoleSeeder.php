<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear roles (solo si no existen)
        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'viewer']);

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

    }
}
