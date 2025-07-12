<?php
namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class OtpMutator
{
    public function requestOtp(null $_, array $args)
    {
        $userId = $args['user_id'];
        $sessionKey = $args['generated_session_key'];
        $clientIp = request()->ip();
        $redisKey = "$clientIp:$userId-general";

        if (Cache::has($redisKey) && Cache::get($redisKey) >= 3) {
            $ttl = Cache::getRedis()->ttl($redisKey);
            return [
                'status' => false,
                'error' => "You cannot request another OTP for another $ttl seconds",
                'expiry' => $ttl,
            ];
        }

        Cache::add($redisKey, 0, now()->addMinutes(2));

        $otp = rand(100000, 999999);
        $secret = env('OTP_SECRET_KEY');
        $hashedOtp = hash_hmac('sha256', $otp, $secret);

        // Store OTP in redis with TTL
        Cache::put($sessionKey, json_encode(['otp' => $hashedOtp, 'tries' => 1]), now()->addMinutes(5));

        // Send email
        $user = \App\Models\User::findOrFail($userId);
        Mail::to($user->email)->send(new \App\Mail\SendOtpMail($otp));

        return [
            'status' => true,
            'remarks' => "OTP has been sent",
            'expiry' => 300,
        ];
    }

    public function verifyOtp(null $_, array $args)
    {
        $userId = $args['user_id'];
        $sessionKey = $args['generated_session_key'];
        $inputHashedOtp = $args['hashed_otp'];
        $clientIp = request()->ip();
        $redisKey = "$clientIp:$userId-general";

        $otpData = Cache::get($sessionKey);
        if (!$otpData) {
            return ['status' => false, 'error' => 'Session expired or invalid', 'expiry' => 0];
        }

        $decoded = json_decode($otpData, true);
        if ($decoded['otp'] === $inputHashedOtp) {
            Cache::forget($sessionKey);
            Cache::forget($redisKey);
            return ['status' => true, 'remarks' => 'OTP verified successfully'];
        } else {
            $decoded['tries'] += 1;

            if ($decoded['tries'] >= 3) {
                Cache::forget($sessionKey);
                Cache::increment($redisKey);
                Cache::put($redisKey, Cache::get($redisKey), now()->addMinutes(2));
                return ['status' => false, 'error' => 'OTP attempts exceeded, try again later'];
            } else {
                $ttl = Cache::getRedis()->ttl($sessionKey);
                Cache::put($sessionKey, json_encode($decoded), now()->addSeconds($ttl));
                return ['status' => false, 'error' => 'Incorrect OTP', 'expiry' => $ttl];
            }
        }
    }
}
