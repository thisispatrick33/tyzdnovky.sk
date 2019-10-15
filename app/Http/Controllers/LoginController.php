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
            'login' => 'required',
            'password' => 'required'
        ]);   
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'data' => [],
                'messages' => $validator->messages()->all()
            ]);           
        };

        $user = false;
        $company = false;

        if($findUser = User::where('email',$request->login)->first()){
            $user = $findUser;
        }
        else if($findUser = User::where('username',$request->login)->first()){
            $user = $findUser;
        }
        else if($findCompany = Company::where('username',$request->login)->first()){
            $company = $findCompany;
        }
        else if($findCompany = Company::where('email',$request->login)->first()) {
            $company = $findCompany;
        }

        if($user){
            
            if (\Hash::check($request->password, $user->password)){
                $token = \Auth::guard('users')->attempt(['email' => $user->email,
                                                         'password' => $request->password]);
                $user->auth_token = $token;
                $user->save();
                $response = ['success'=>true, 
                             'data'=>['type' => 'user',
                                      'id' => $user->id,
                                      'auth_token' => $user->auth_token,
                                      'name' => $user->name, 
                                      'lastName' => $user->lastname,
                                      'phone' => $user->phone,
                                      'ready' => $user->nastup,
                                      'email'=> $user->email,
                                      'active' => $user->active,
                                      'drivingLicense' => $user->driving_license,
                                      'username' => $user->username
                                    ],
                             'messages' => trans('messages.loginSuccessful')
                            ];           
            }
            else{
              $response = ['success'=>false, 
                           'data' => [],
                           'messages' => trans('auth.failed')
                          ];
            }    
            return response()->json($response);
        }
        else if($company){
            if (\Hash::check($request->password, $company->password)){
                $token = \Auth::guard('companies')->attempt(['email' => $company->email,
                                                             'password' => $request->password]);
                $company->auth_token = $token;
                $company->save();
                $response = ['success'=>true, 
                'data'=>['type' => 'company',
                         'id' => $company->id,
                         'auth_token' => $company->auth_token,
                         'name' => $company->name, 
                         'bussinesId' => $company->ico,
                         'phone' => $company->phone,
                         'ready' => $company->nastup,
                         'email'=> $company->email,
                         'active' => $company->active,
                         'username' => $company->username
                       ],
                'messages' => trans('messages.loginSuccessful')
               ];           
            }
            else{
                $response = ['success'=>false, 
                             'data' => [],
                             'messages' => trans('auth.failed')
                            ];
            }  
            return response()->json($response);
        }
        /*else if(){
            TODO admin verification
        }*/
        else{
            return response()->json([
                'success' => false,
                'data' => [],
                'messages' => trans('messages.userNotFound')
            ]);
        }
    }
}
