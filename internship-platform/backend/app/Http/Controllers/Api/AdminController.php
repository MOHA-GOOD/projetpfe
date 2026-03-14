<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Internship;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function stats()
    {
        return response()->json([
            'students' => User::where('role', 'student')->count(),
            'companies' => User::where('role', 'company')->count(),
            'internships' => Internship::count(),
            'active_internships' => Internship::where('is_active', true)->count(),
        ]);
    }

    public function users()
    {
        return response()->json(User::with(['student', 'company'])->paginate(15));
    }

    public function internships()
    {
        return response()->json(Internship::with('company')->paginate(15));
    }

    public function deleteUser(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }
}
