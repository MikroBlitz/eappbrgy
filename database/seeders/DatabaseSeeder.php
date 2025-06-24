<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin and Manager users
        $admin = User::factory()->create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email' => 'admin@mail.com',
            'phone' => '09876543210',
            'password' => Hash::make('admin1234'),
            'is_active' => 1,
        ]);

        $manager = User::factory()->create([
            'first_name' => 'Manager',
            'last_name' => 'Mans',
            'email' => 'manager@mail.com',
            'phone' => '09876543210',
            'password' => Hash::make('manager1234'),
            'is_active' => 1,
        ]);

        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $managerRole = Role::firstOrCreate(['name' => 'Manager']);
        $userRole = Role::firstOrCreate(['name' => 'User']);
        $roles = [
            'System Administrator',
            'Team Lead',
            'Project Manager',
            'Department Head',
            'Operations Manager',
            'HR Manager',
            'Finance Manager',
            'Guest',
            'Member',
            'Premium Member',
            'VIP Member',
            'Developer',
            'Designer',
            'Content Creator',
            'Editor',
            'Moderator',
            'Support Agent',
            'Customer Service',
            'Sales Representative',
            'Marketing Specialist',
            'Analyst',
            'Client',
            'Vendor',
            'Partner',
            'Contractor',
            'Consultant'
        ];
        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }

        // Define permissions
        $permissions = [
            'view user',
            'create user',
            'edit user',
            'delete user',
            'update user status',

            'view role',
            'create role',
            'edit role',
            'delete role',

            'view permission',
            'create permission',
            'edit permission',
            'delete permission',

            'view purok',
            'create purok',
            'edit purok',
            'delete purok',

            'view household',
            'create household',
            'edit household',
            'delete household',

            'view resident',
            'create resident',
            'edit resident',
            'delete resident',
        ];

        // Create permissions if not exists
        $permissionMap = [];
        foreach ($permissions as $permissionName) {
            $permissionMap[$permissionName] = Permission::firstOrCreate(['name' => $permissionName]);
        }

        $managerRole->syncPermissions(array_map(fn($name) => $permissionMap[$name], $permissions));

        // Assign roles to users
        $admin->assignRole($adminRole);
        $manager->assignRole($managerRole);

        // Create additional users
        $users = User::factory(50)->create();
        $users->each(fn($user) => $user->assignRole($userRole));

        $this->call([
            PurokSeeder::class,
            HouseholdSeeder::class,
            ResidentSeeder::class,
        ]);
    }
}
