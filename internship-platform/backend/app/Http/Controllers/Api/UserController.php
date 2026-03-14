<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'student') {
            $student = $user->student;
            $student->update($request->only([
                'first_name', 'last_name', 'phone', 'city', 'education', 'skills', 'portfolio_url'
            ]));

            if ($request->has('skills') && is_string($request->skills)) {
                $student->skills = json_decode($request->skills, true);
                $student->save();
            }

            return response()->json($student);
        }

        if ($user->role === 'company') {
            $company = $user->company;
            $company->update($request->only([
                'name', 'description', 'industry', 'city', 'website'
            ]));

            return response()->json($company);
        }

        return response()->json(['message' => 'Profile type not supported.'], 400);
    }
}
