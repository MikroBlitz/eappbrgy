<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AvatarUploadRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserAvatarController extends Controller
{
    public function store(AvatarUploadRequest $request, User $user): JsonResponse
    {
        $authUser = Auth::user();

        if ($authUser === null || ($authUser->id !== $user->id && ! $authUser->can('edit user'))) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user->save();

        if ($request->hasFile('avatar')) {
            // Replace old avatar
            $user->clearMediaCollection('avatar');
            $user->addMediaFromRequest('avatar')->toMediaCollection('avatar');
        }

        return response()->json([
            'message' => 'Avatar uploaded successfully',
            'user' => $user->fresh(),
        ]);
    }

    public function destroy(User $user): JsonResponse
    {
        $authUser = Auth::user();

        if ($authUser === null || ($authUser->id !== $user->id && ! $authUser->can('edit user'))) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user->clearMediaCollection('avatar');
        $user->save();

        return response()->json([
            'message' => 'Avatar removed successfully',
            'user' => $user->fresh(),
        ]);
    }
}
