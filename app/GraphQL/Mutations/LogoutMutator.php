<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;

class LogoutMutator
{
    public function resolve($rootValue, array $args, $context, $info)
    {
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            throw new \Exception('Unauthenticated');
        }

        $user->tokens()->delete();

        return [
            'message' => 'Logged out successfully'
        ];
    }
}
