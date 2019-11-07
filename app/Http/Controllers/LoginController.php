<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Arr;
use DB;
use JWTAuth;
use JWTAuthException;
use App\Branch;
use App\Business;
use App\User;
use App\Language;
use Mail;

class LoginController extends Controller
{
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'login' => 'required',
            'passwordL' => 'required'
        ]);   
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'data' => [],
                'messages' => $validator->messages()->all()
            ]);           
        };

        $user = false;
        $business = false;

        if($findUser = User::where('email',$request->login)->first()){
            $user = $findUser;
        }
        else if($findUser = User::where('username',$request->login)->first()){
            $user = $findUser;
        }
        else if($findBusiness = Business::where('username',$request->login)->first()){
            $business = $findBusiness;
        }
        else if($findBusiness = Business::where('email',$request->login)->first()) {
            $business = $findBusiness;
        }

        if($user){
            
            if (\Hash::check($request->passwordL, $user->password)){
                $token = \Auth::guard('users')->attempt(['email' => $user->email,
                                                         'password' => $request->passwordL]);
                $user->auth_token = $token;
                $user->save();
                $response = ['success'=>true, 
                             'data'=>['type' => 'user',
                                      'id' => $user->id,
                                      'auth_token' => $user->auth_token,
                                      'name' => $user->name, 
                                      'lastName' => $user->lastname,
                                      'phone' => $user->phone,
                                      'email'=> $user->email,
                                      'active' => $user->active,
                                      'drivingLicense' => $user->driving_license,
                                      'username' => $user->username,
                                      'profile_pic' => $user->profile_pic
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
        else if($business){
            if (\Hash::check($request->passwordL, $business->password)){
                $token = \Auth::guard('businesses')->attempt(['email' => $business->email,
                                                             'password' => $request->passwordL]);
                $business->auth_token = $token;
                $business->save();
                $response = ['success'=>true, 
                            'data'=>['type' => 'business',
                                    'id' => $business->id,
                                    'auth_token' => $business->auth_token,
                                    'name' => $business->name, 
                                    'bussinesId' => $business->ico,
                                    'phone' => $business->phone,
                                    'ready' => $business->nastup,
                                    'email'=> $business->email,
                                    'active' => $business->active,
                                    'username' => $business->username,
                                    'profile_pic' => $business->profile_pic
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

    public function passResetEmail(Request $request){
        $validator = Validator::make($request->all(), [
            'login' => 'required',
        ]);   
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'data' => [],
                'messages' => $validator->messages()->all()
            ]);           
        };

        $user = false;
        $business = false;

        if($findUser = User::where('email',$request->login)->first()){
            $user = $findUser;
        }
        else if($findUser = User::where('username',$request->login)->first()){
            $user = $findUser;
        }
        else if($findBusiness = Business::where('username',$request->login)->first()){
            $business = $findBusiness;
        }
        else if($findBusiness = Business::where('email',$request->login)->first()) {
            $business = $findBusiness;
        }

        if($user){
            $data=$user;
        }
        else if($business){
            $data=$business;
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

        $link = url("/reset-password?token=".$data->auth_token );
        $name = $data->active?$data->username:$data->email;
        Mail::send("email.passReset", ['action_url'=>$link,'name'=>$name,'time'=>config('jwt.ttl')], function($message) use($data) {
            $message->to($data->email);
            $message->subject('Tyzdnovky.sk | Password reset');
            $message->from('tyzdnovky@azet.sk');
        });
        if(count(Mail::failures()) > 0){
            return response()->json([
                'success' => false,
                'data' => [],
                'messages' => trans('messages.emailFailed')
            ]); 
        }
        else{
            return response()->json([
                'success' => true,
                'data' => [],
                'messages' => trans('messages.emailSent')
            ]); 
        }
    }

    public function passResetDo(Request $request){
        $validator = Validator::make($request->all(), [
            'token' => 'required',
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

        if($findUser = User::where('auth_token',$request->token)->first()){
            $user = $findUser;
        }
        else if($findCompany = Company::where('auth_token',$request->token)->first()) {
            $company = $findCompany;
        }

        if($user){
            $token = \Auth::guard('users')->fromUser($user);
            $user->auth_token = $token;
            $user->password = \Hash::make($request->password);
            $response;
            if($user->save()){
                $response = [
                    'success' => true,
                    'data' => [ 'type' => 'user',
                                'id' => $user->id,
                                'auth_token' => $user->auth_token,
                                'name' => $user->name, 
                                'lastName' => $user->lastname,
                                'phone' => $user->phone,
                                'email'=> $user->email,
                                'active' => $user->active,
                                'drivingLicense' => $user->driving_license,
                                'username' => $user->username
                             ],
                    'messages' => trans('messages.passwordChanged')
                ];
            }
            else{
                $response = [
                    'success' => false,
                    'data' => [],
                    'messages' => trans('messages.passwordFail')
                ];
            }
            return response()->json($response);
        }
        else if($company){
            $token = \Auth::guard('companies')->fromUser($company);
            $company->auth_token = $token;
            $company->password = \Hash::make($request->password);

            if($company->save()){
                $response = [
                    'success' => true,
                    'data' => [ 'type' => 'company',
                                'id' => $company->id,
                                'auth_token' => $company->auth_token,
                                'name' => $company->name, 
                                'bussinesId' => $company->ico,
                                'phone' => $company->phone,
                                'email'=> $company->email,
                                'active' => $company->active,
                                'username' => $company->username
                            ],
                    'messages' => trans('messages.passwordChanged')
                ];
            }
            else{
                $response = [
                    'success' => false,
                    'data' => [],
                    'messages' => trans('messages.passwordFail')
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
