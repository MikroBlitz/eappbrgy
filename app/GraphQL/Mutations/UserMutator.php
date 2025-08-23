<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Mail\UserStatusChanged;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;

final readonly class UserMutator
{
    public function updateAvatar($_, array $args): User
    {
        $user = User::findOrFail($args['id']);
        $validator = Validator::make($args, [
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        if ($user->avatar_path && Storage::disk('public')->exists($user->avatar_path)) {
            Storage::disk('public')->delete($user->avatar_path);
        }

        $path = $args['avatar']->store('avatars', 'public');
        $user->avatar_path = $path;
        $user->save();

        return $user;
    }

    public function deleteAvatar($_, array $args): User
    {
        $user = User::findOrFail($args['id']);

        // Authorization check
        if (Auth::id() !== $user->id && !Auth::user()->hasRole('Admin')) {
            abort(403, 'Unauthorized');
        }

        // Delete old avatar if exists
        if ($user->avatar_path && Storage::disk('public')->exists($user->avatar_path)) {
            Storage::disk('public')->delete($user->avatar_path);
        }

        $user->avatar_path = null;
        $user->save();

        return $user;
    }

    public function registerUser($_, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): User
    {
        $input = $args['input'];

        if (User::where('email', $input['email'])->exists()) {
            throw ValidationException::withMessages([
                'email' => ['A user with this email already exists.']
            ]);
        }

        if (isset($input['password'])) {
            $input['password'] = Hash::make($input['password']);
        }

        $input['is_active'] = 1;
        $roles = $input['roles']['sync'] ?? 3;
        unset($input['roles']);

        $user = User::create($input);
        $user->roles()->sync((array) $roles);
        $this->notifyUserEmail($user);

        return $user;
    }

    /** @param  array{}  $args */
    public function updateStatus(null $_, array $args)
    {
        $user = User::findOrFail($args['id']);

        if (Auth::id() === $user->id) {
            throw new \Exception("You can't change your own status.");
        }
        if ($user->hasRole('Admin')) {
            throw new \Exception("You cannot disable an Admin user.");
        }

        $user->is_active = $args['is_active'];
        $user->save();
        $this->notifyUserEmail($user);

        return $user;
    }

    public function notifyUserEmail(User $user): void
    {
        Mail::to($user->email)->queue(new UserStatusChanged($user));
    }

}
