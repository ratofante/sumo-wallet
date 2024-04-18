<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AvatarController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $user = auth()->user();

        if ($user->avatar) {
            Storage::delete($user->avatar);
        }

        $path = $request->file('avatar')->store('public/avatars');
        $user->avatar = $path;
        $user->save();

        return new JsonResponse([
            'success' => true
        ]);
    }

    public function get()
    {
        $avatar = auth()->user()->avatar;
        $url = $avatar ? Storage::url($avatar) : null;

        return new JsonResponse([
            'url' => $url
        ]);
    }
}
