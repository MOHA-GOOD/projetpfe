<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Internship;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function store(Request $request, Internship $internship)
    {
        $request->validate([
            'cover_letter' => 'required|string',
        ]);

        $student = $request->user()->student;

        if (!$student) {
            return response()->json(['message' => 'Only students can apply.'], 403);
        }

        if ($internship->applications()->where('student_id', $student->id)->exists()) {
            return response()->json(['message' => 'You have already applied.'], 400);
        }

        $application = $internship->applications()->create([
            'student_id' => $student->id,
            'cover_letter' => $request->cover_letter,
            // resume_path would be handled via file upload if implemented
        ]);

        return response()->json($application, 201);
    }

    public function studentIndex(Request $request)
    {
        $applications = $request->user()->student->applications()->with('internship.company')->get();

        return response()->json($applications);
    }

    public function companyIndex(Request $request)
    {
        $company = $request->user()->company;
        $internships = $company->internships()->pluck('id');
        
        $applications = Application::whereIn('internship_id', $internships)
            ->with(['student.user', 'internship'])
            ->get();

        return response()->json($applications);
    }

    public function updateStatus(Request $request, Application $application)
    {
        $request->validate([
            'status' => 'required|in:pending,accepted,rejected',
        ]);

        $company = $request->user()->company;

        if (!$company || $application->internship->company_id !== $company->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $application->update(['status' => $request->status]);

        return response()->json($application);
    }
}
