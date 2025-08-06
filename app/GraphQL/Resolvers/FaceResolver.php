<?php

namespace App\GraphQL\Resolvers;

use App\Models\User;

class FaceResolver {
    public function register($_, array $args): bool
    {
        $user = User::findOrFail($args['user_id']);
        $user->face_descriptors = json_encode($args['descriptor']);
        $user->save();

        return true;
    }

    public function recognize($_, array $args)
    {
        $input = $args['descriptor'];

        $users = User::whereNotNull('face_descriptors')->get();

        foreach ($users as $user) {
            $dbVector = json_decode($user->face_descriptors);
            $distance = $this->euclideanDistance($input, $dbVector);

            if ($distance < 0.45) { // strict threshold for matching
                return $user;
            }
        }

        return null;
    }

    private function euclideanDistance($a, $b): float
    {
        return sqrt(array_sum(array_map(fn($x, $y) => pow($x - $y, 2), $a, $b)));
    }
}
