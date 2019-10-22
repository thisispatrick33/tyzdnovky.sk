<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function get(){
        $users = User::all();
    }

    public function getOne($id){
        $user = User::find($id);
    }

    public function update(){

    }

    public function delete(){
        User::destroy($request->id);
    }
}
