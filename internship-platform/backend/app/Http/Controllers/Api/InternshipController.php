<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Internship;
use Illuminate\Http\Request;

class InternshipController extends Controller
{
    public function index(Request $request)
    {
        $query = Internship::with('company');

        if ($request->has('city')) {
            $query->whereHas('company', function($q) use ($request) {
                $q->where('city', 'like', '%' . $request->city . '%');
            })->orWhere('location', 'like', '%' . $request->city . '%');
        }

        if ($request->has('type')) {
            $query->where('work_type', $request->type);
        }

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        return response()->json($query->latest()->paginate(10));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'duration' => 'required|integer|min:1',
            'work_type' => 'required|in:onsite,hybrid,remote',
            'requirements' => 'required|string',
            'positions_available' => 'integer|min:1'
        ]);

        $internship = $request->user()->company->internships()->create($request->all());

        return response()->json($internship, 201);
    }

    public function show(Internship $internship)
    {
        return response()->json($internship->load('company'));
    }

    public function update(Request $request, Internship $internship)
    {
        if ($request->user()->company->id !== $internship->company_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $internship->update($request->all());

        return response()->json($internship);
    }

    public function destroy(Request $request, Internship $internship)
    {
        if ($request->user()->company->id !== $internship->company_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $internship->delete();

        return response()->json(null, 204);
    }
}
