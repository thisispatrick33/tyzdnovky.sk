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

class RegisterController extends Controller
{
    public function register(Request $request){
        
        $validator = Validator::make($request->all(), [
            'type' => 'required|numeric|max:2|min:1',
        ]);
            
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'data' => [],
                'messages' => $validator->messages()->all()
            ]);
        };
        
            
            
        if($request->type == 1){
                
            $validator = Validator::make($request->all(), [
                'email' => 'sometimes|email|unique:users|unique:companies',
                'phone' => 'sometimes|string|unique:users|unique:companies',
                'passwordR' => 'required'
            ]);
             
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'data' => [],
                    'messages' => $validator->messages()->all()
                ]);           
            };

            $success = false;

            DB::beginTransaction();

            try {
        
                $company= new Company;
                if($request->email){
                    $company->email = $request->email;
                }
                else{
                    $company->phone = $request->phone;
                }
                $company->password = \Hash::make($request->passwordR);
                

                if($company->save()){

                    $token = \Auth::guard('companies')->attempt(['email' => $request->email, 'password' => $request->passwordR]);
                    if (!is_string($token))  return response()->json(['success'=>false,'data'=>[],'messages'=>trans('messages.tokenFailed')]);
                    $company = Company::where('email', $request->email)->get()->first();
                    $company->auth_token = $token;
                    $company->save();
                    $success = true;
            
                }
                else{
                    $success = false;
                }
                } catch (\Exception $e) {
                // maybe log this exception, but basically it's just here so we can rollback if we get a surprise
                }

                if ($success) {
                    DB::commit();
                    return response()->json([
                        'success' => true,
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
                        'messages' => trans('messages.accountCreated')
                    ]);
                } else {
                    DB::rollback();
                    return response()->json([
                        'success' => false,
                        'data' => [],
                        'messages' => trans('messages.error')
                    ]);
                }
            }

        
        else{

            $validator = Validator::make($request->all(), [
                'email' => 'sometimes|email|unique:users|unique:companies',
                'phone' => 'sometimes|string|unique:users|unique:companies',
                'passwordR' => 'required'
            ]);
             
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'data' => [],
                    'messages' => $validator->messages()->all()
                ]);
            };
            
            
            $success = false;

            DB::beginTransaction();

            try {
        
                $user= new User;
                if($request->email){
                    $user->email = $request->email;
                }
                else{
                    $user->phone = $request->phone;
                }
                $user->password = \Hash::make($request->passwordR);

                if($user->save()){
                    $token = \Auth::guard('users')->attempt(['email' => $request->email, 'password' => $request->passwordR]);
                    if (!is_string($token))  return response()->json(['success'=>false,'data'=>[],'messages'=>trans('messages.tokenFailed')]);
                    $user = User::where('email', $request->email)->get()->first();
                    $user->auth_token = $token;
                    $user->save();
                    $success = true;
            
                }
                else{
                    $success = false;
                }
            } catch (\Exception $e) {
                // maybe log this exception, but basically it's just here so we can rollback if we get a surprise
            }

            if ($success) {
                DB::commit();
                return response()->json([
                    'success' => true,
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
                    'messages' => trans('messages.accountCreated')
                ]);
            } else {
                DB::rollback();
                return response()->json([
                    'success' => false,
                    'data' => [],
                    'messages' => trans('messages.error')
                ]);
            }
        }

    }




    public function additionalInfo(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);
         
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'data' => [],
                'messages' => $validator->messages()
            ]);
        };

        if($user = User::where('email',$request->email)->where('active',false)->first()){
            $validator = Validator::make($request->all(), [
                'categories' => 'required|array',
                'drivingLicense' => 'required|boolean',
                'languages' => 'required|array',
                'username' => 'required|unique:users|unique:companies',
                'name' => 'required|string',
                'lastName' => 'required|string',
                'phone' => 'required|string',
                'email' => 'required|email'
            ]);
             
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'data' => [],
                    'messages' => $validator->messages()->all()
                ]);
            };
            
            
            $success = false;

            DB::beginTransaction();

            try {  
                $user->driving_license = $request->drivingLicense;
                $user->username = '@'.$request->username;
                $user->name = $request->name;
                $user->lastname = $request->lastName;
                $user->phone = $request->phone;
                $user->email = $request->email;

                if($user->save()){

                    $language_arr = [];
                    foreach( $request->languages as $language){
                    
                        $language_id = Language::where('name','=',$language)->first();
                        if ($language_id) {
                            array_push($language_arr,$language_id->id);
                        }
                        else {
                            $NewLanguage = new Language;
                            $NewLanguage->name = $language;
                            $NewLanguage->lang = ($request->hasHeader('X-localization')) ? $request->header('X-localization') : 'en';
                            if ($NewLanguage->save()) {
                                array_push($language_arr,$NewLanguage->id);
                            }
                        } 
                    }
        
                    $branch_arr = [];
                    foreach( $request->categories as $branch){
                        $branch_id = Branch::where('name','=',$branch['value'])->first();
                        if ($branch_id) {
                            array_push($branch_arr,$branch_id->id);
                        }
                        else {
                            $NewBranch = new Branch;
                            $NewBranch->name = $branch['value'];
                            $NewBranch->lang = ($request->hasHeader('X-localization')) ? $request->header('X-localization') : 'en';
                            if ($NewBranch->save()) {
                                array_push($branch_arr,$NewBranch->id);
                            }
                        }
                    }   
            
                    $user->languages()->syncWithoutDetaching($language_arr);
            
                    for($i = 0 ; $i< sizeof($branch_arr);$i++){
                        if($request->categories[$i]['practise'] > 0 && $request->categories[$i]['ready']){
                            $user->branches()->syncWithoutDetaching($branch_arr[$i]);
                            $user->branches()->updateExistingPivot($branch_arr[$i], ['years' => $request->categories[$i]['practise'],
                                                                                     'ready' => $request->categories[$i]['ready']]);
                        }
                    }
                    
                    $user->active = true;

                    if($user->save()){
                        $success = true;
                    }
            
                }
                else{
                    $success = false;
                }
            } catch (\Exception $e) {
                // maybe log this exception, but basically it's just here so we can rollback if we get a surprise
            }

            if ($success) {
                DB::commit();
                return response()->json([
                    'success' => true,
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
                    'messages' => trans('messages.dataAdded')
                ]);
            } else {
                DB::rollback();
                return response()->json([
                    'success' => false,
                    'data' => [],
                    'messages' => trans('messages.error')
                ]);
            }
        }
        else if($company = Company::where('email',$request->email)->where('active',false)->first()){
            $validator = Validator::make($request->all(), [
                'categories' => 'required|array',
                'email' => 'required|email',
                'username' => 'required|unique:users|unique:companies',
                'name' => 'required|string',
                'ico' => 'required|string',
                'phone' => 'required|string'
            ]);
             
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'data' => [],
                    'messages' => $validator->messages()->all()
                ]);           
            };

            $success = false;

            DB::beginTransaction();

            try {        

                $company->username = '@'.$request->username;
                $company->name = $request->name;
                $company->ico = $request->ico;
                $company->phone = $request->phone;
                $company->email = $request->email;

                if($company->save()){
                    $branch_arr = [];
                    foreach( $request->categories as $branch){
                        $branch_id = Branch::where('name','=',$branch['value'])->first();
                        if ($branch_id) {
                            array_push($branch_arr,$branch_id->id);
                        }
                        else {
                            $NewBranch = new Branch;
                            $NewBranch->name = $branch['value'];
                            $NewBranch->lang = ($request->hasHeader('X-localization')) ? $request->header('X-localization') : 'en';
                            if ($NewBranch->save()) {
                                array_push($branch_arr,$NewBranch->id);
                            }
                        }
                    }   
                    $company->branches()->attach($branch_arr);
                    
                    $company->active = true;

                    if($company->save()){
                        $success = true;
                    }

            
                }
                else{
                    $success = false;
                }
            } catch (\Exception $e) {
                // maybe log this exception, but basically it's just here so we can rollback if we get a surprise
            }

            if ($success) {
                DB::commit();
                return response()->json([
                    'success' => true,
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
                    'messages' => trans('messages.dataAdded')
                ]);
            } else {
                DB::rollback();
                return response()->json([
                    'success' => false,
                    'data' => [],
                    'messages' => trans('messages.error')
                ]);
            }

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
