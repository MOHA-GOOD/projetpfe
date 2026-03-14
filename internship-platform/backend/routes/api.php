<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\InternshipController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AdminController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/internships', [InternshipController::class, 'index']);
Route::get('/internships/{internship}', [InternshipController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Profile Management
    Route::put('/profile', [UserController::class, 'updateProfile']);
    
    // Student Routes
    Route::post('/internships/{internship}/apply', [ApplicationController::class, 'store']);
    Route::get('/student/applications', [ApplicationController::class, 'studentIndex']);
    
    // Company Routes
    Route::post('/company/internships', [InternshipController::class, 'store']);
    Route::put('/company/internships/{internship}', [InternshipController::class, 'update']);
    Route::delete('/company/internships/{internship}', [InternshipController::class, 'destroy']);
    Route::get('/company/applications', [ApplicationController::class, 'companyIndex']);
    Route::put('/applications/{application}/status', [ApplicationController::class, 'updateStatus']);
    
    // Messaging
    Route::get('/messages/{user_id}', [MessageController::class, 'conversation']);
    Route::post('/messages', [MessageController::class, 'sendMessage']);

    // Admin
    Route::get('/admin/stats', [AdminController::class, 'stats']);
    Route::get('/admin/users', [AdminController::class, 'users']);
    Route::delete('/admin/users/{user}', [AdminController::class, 'deleteUser']);
    Route::get('/admin/internships', [AdminController::class, 'internships']);
});
