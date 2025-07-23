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

        $sysAdmin = User::factory()->create([
            'first_name' => 'Manager',
            'last_name' => 'Mans',
            'email' => 'manager@mail.com',
            'phone' => '09876543210',
            'password' => Hash::make('manager1234'),
            'is_active' => 1,
        ]);

        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $systemAdmin = Role::firstOrCreate(['name' => 'System Administrator']);
        $userRole = Role::firstOrCreate(['name' => 'User']);
        $roles = [
            'Barangay Captain',         // Punong Barangay
            'Barangay Councilor',       // Kagawad
            'Barangay Secretary',
            'Barangay Treasurer',
            'SK Chairperson',           // Sangguniang Kabataan Chair
            'SK Councilor',
            'Barangay Health Worker',   // BHW
            'Barangay Tanod',           // Peace and Order
            'Barangay Volunteer',
            'Resident',                 // Regular user/resident account
            'Senior Citizen',
            'PWD Representative',
            'Youth Representative',
            'Guest',                    // For non-residents or limited access
            'System Administrator',     // Technical admin of the app/system
            'Data Encoder',             // Staff updating records
            'Social Welfare Officer',   // For community services
        ];
        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }

        // Define permissions
        $permissions = [
            'view dashboard',

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

            'view blotter',
            'create blotter',
            'edit blotter',
            'delete blotter',
            'open blotter',
            'resolve blotter',
            'dismiss blotter',

            'view official',
            'create official',
            'edit official',
            'delete official',

            'view document',
            'create document',
            'edit document',
            'delete document',
            'approve document',
            'pending document',
            'release document',
            'revoke document',
        ];

        // Create permissions if not exists
        $permissionMap = [];
        foreach ($permissions as $permissionName) {
            $permissionMap[$permissionName] = Permission::firstOrCreate(['name' => $permissionName]);
        }

        $systemAdmin->syncPermissions(array_map(fn($name) => $permissionMap[$name], $permissions));

        // Assign roles to users
        $admin->assignRole($adminRole);
        $sysAdmin->assignRole($systemAdmin);

        // Create additional users
        $users = User::factory(50)->create();
        $users->each(fn($user) => $user->assignRole($userRole));

        // Assign permissions to roles
        // Permissions for System Administrator (technical admin, full access)
        $systemAdminRole = Role::firstOrCreate(['name' => 'System Administrator']);
        $systemAdminRole->syncPermissions(Permission::all());

        // Permissions for Barangay Captain (broad authority)
        $captainRole = Role::firstOrCreate(['name' => 'Barangay Captain']);
        $captainRole->syncPermissions([
            'view dashboard',
            'view user', 'create user', 'edit user', 'delete user',
            'view purok', 'create purok', 'edit purok', 'delete purok',
            'view household', 'create household', 'edit household', 'delete household',
            'view resident', 'create resident', 'edit resident', 'delete resident',
            'view blotter', 'create blotter', 'edit blotter', 'delete blotter',
            'view official', 'create official', 'edit official', 'delete official',
        ]);

        // Permissions for Barangay Councilor (similar to captain but no user management)
        $councilorRole = Role::firstOrCreate(['name' => 'Barangay Councilor']);
        $councilorRole->syncPermissions([
            'view dashboard',
            'view purok', 'view household', 'view resident',
            'create blotter', 'edit blotter', 'view blotter',
            'view official',
        ]);

        // Permissions for Barangay Secretary (manage residents/households)
        $secretaryRole = Role::firstOrCreate(['name' => 'Barangay Secretary']);
        $secretaryRole->syncPermissions([
            'view dashboard',
            'view purok', 'view household', 'create household', 'edit household', 'delete household',
            'view resident', 'create resident', 'edit resident', 'delete resident',
        ]);

        // Permissions for Barangay Treasurer (view dashboard, residents)
        $treasurerRole = Role::firstOrCreate(['name' => 'Barangay Treasurer']);
        $treasurerRole->syncPermissions([
            'view dashboard',
            'view resident', 'view household',
        ]);

        // Permissions for Barangay Health Worker & Social Welfare Officer
        $healthRoles = ['Barangay Health Worker', 'Social Welfare Officer'];
        foreach ($healthRoles as $roleName) {
            $role = Role::firstOrCreate(['name' => $roleName]);
            $role->syncPermissions([
                'view dashboard',
                'view resident',
            ]);
        }

        // Permissions for Barangay Tanod (security)
        $tanodRole = Role::firstOrCreate(['name' => 'Barangay Tanod']);
        $tanodRole->syncPermissions([
            'view dashboard',
            'view resident',
            'create blotter', 'view blotter',
        ]);

        // Permissions for Data Encoder (manage data)
        $encoderRole = Role::firstOrCreate(['name' => 'Data Encoder']);
        $encoderRole->syncPermissions([
            'view dashboard',
            'view resident', 'create resident', 'edit resident', 'delete resident',
            'view household', 'create household', 'edit household', 'delete household',
        ]);

        // Permissions for SK officials (SK Chairperson & SK Councilor)
        $skRoles = ['SK Chairperson', 'SK Councilor'];
        foreach ($skRoles as $roleName) {
            $role = Role::firstOrCreate(['name' => $roleName]);
            $role->syncPermissions([
                'view dashboard',
                'view resident',
            ]);
        }

        // Permissions for Residents, Guests, etc.
        $residentRoles = ['Resident', 'Senior Citizen', 'PWD Representative', 'Youth Representative', 'Guest'];
        foreach ($residentRoles as $roleName) {
            $role = Role::firstOrCreate(['name' => $roleName]);
            $role->syncPermissions([
                'view dashboard',
            ]);
        }

        $this->call([
            PurokSeeder::class,
            HouseholdSeeder::class,
            ResidentSeeder::class,
        ]);
    }
}
