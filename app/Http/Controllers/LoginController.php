<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Arr;
use DB;
use JWTAuth;
use JWTAuthException;
use App\Branch;
use App\Company;
use App\User;
use App\Language;

class LoginController extends Controller
{
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);   
        if ($validator->fails()) {
            return response(400);
        };

        if($user = User::where('email',$request->email)->first()){
            if (\Hash::check($request->password, $user->password)){
                $token = \Auth::guard('users')->attempt(['email' => $request->email,
                                                         'password' => $request->password]);
                $user->auth_token = $token;
                $user->save();
                $response = ['success'=>true, 'data'=>['id'=>$user->id,'auth_token'=>$user->auth_token,'name'=>$user->name, 'email'=>$user->email]];           
            }
            else{
              $response = ['success'=>false, 'data'=>'Record doesnt exists'];
            }
          
            return response()->json($response, 201);
        }
        else if($company = Company::where('email',$request->email)->first()){
            if (\Hash::check($request->password, $company->password)){
                $token = \Auth::guard('companies')->attempt(['email' => $request->email,
                                                             'password' => $request->password]);
                $company->auth_token = $token;
                $company->save();
                $response = ['success'=>true, 'data'=>['id'=>$company->id,'auth_token'=>$company->auth_token,'name'=>$company->name, 'email'=>$company->email]];           
            }
            else{
              $response = ['success'=>false, 'data'=>'Record doesnt exists'];
            }
            return response()->json($response, 201);
        }
        /*else if(){
            TODO admin verification
        }*/
        else{
            return "pixi";
        }
    }
}
