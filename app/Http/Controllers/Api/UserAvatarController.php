<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AvatarUploadRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserAvatarController extends Controller
{
    public function store(AvatarUploadRequest $request, User $user): JsonResponse
    {
        $authUser = Auth::user();

        if ($authUser === null || ($authUser->id !== $user->id && ! $authUser->hasRole('Admin'))) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete existing avatar if any
        if ($user->avatar_path && Storage::disk('public')->exists($user->avatar_path)) {
            Storage::disk('public')->delete($user->avatar_path);
        }

        $path = $request->file('avatar')->store('avatars', 'public');
        $user->avatar_path = $path;
        $user->save();

        return response()->json([
            'message' => 'Avatar uploaded successfully',
            'user' => $user->fresh(),
        ]);
    }

    public function destroy(User $user): JsonResponse
    {
        $authUser = Auth::user();

        if ($authUser === null || ($authUser->id !== $user->id && ! $authUser->hasRole('Admin'))) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($user->avatar_path && Storage::disk('public')->exists($user->avatar_path)) {
            Storage::disk('public')->delete($user->avatar_path);
        }

        $user->avatar_path = null;
        $user->save();

        return response()->json([
            'message' => 'Avatar removed successfully',
            'user' => $user->fresh(),
        ]);
    }
}
