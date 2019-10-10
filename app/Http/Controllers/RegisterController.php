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
    public function store(Request $request){
        
        $validator = Validator::make($request->all(), [
            'type' => 'required|numeric|max:3|min:1',
        ]);
            
        if ($validator->fails()) {
            return response("Nie je zadaný typ alebo má zlú hodnotu.",400);
        };
        
            
            
        if($request->type == 1){
                
            $validator = Validator::make($request->all(), [
                'categories' => 'required|array',
                'email' => 'required|email|unique:companies',
                'name' => 'required|string',
                'ico' => 'required|string',
                'phone' => 'required|string',
                'ready' => 'required|date',
                'password' => 'required'
            ]);
             
            if ($validator->fails()) {
                $error = $validator->messages();
                return response($error,400);            
            };

            $success = false;

            DB::beginTransaction();

            try {
        
                $company= new Company;
                $company->name = $request->name;
                $company->ico = $request->ico;
                $company->email = $request->email;
                $company->phone = $request->phone;
                $company->nastup = $request->ready;
                $company->password = \Hash::make($request->password);
                

                if($company->save()){

                    $token = \Auth::guard('companies')->attempt(['email' => $request->email, 'password' => $request->password]);
                    if (!is_string($token))  return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);
                    $company = Company::where('email', $request->email)->get()->first();
                    $company->auth_token = $token;
                    $company->save();
        
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
                    return response(200);
                } else {
                    DB::rollback();
                    return response("Nastala chyba.. =(", 400);
                }
            }

        
        else{

            $validator = Validator::make($request->all(), [
                'categories' => 'required|array',
                'driving_licence' => 'required|boolean',
                'email' => 'required|email|unique:users',
                'firstName' => 'required|string',
                'languages' => 'required|array',
                'lastName' => 'required|string',
                'phone' => 'required|string',
                'ready' => 'required|date',
                'password' => 'required'
            ]);
             
            if ($validator->fails()) {
                $error = $validator->messages();
                return response($error);
                
            };
            
            
            $success = false;

            DB::beginTransaction();

            try {
        
                $user= new User;
                $user->name = $request->firstName;
                $user->lastname = $request->lastName;
                $user->email = $request->email;
                $user->phone = $request->phone;
                $user->driving_license = $request->driving_licence;
                $user->nastup = $request->ready;
                $user->password = \Hash::make($request->password);

                if($user->save()){
                    $token = \Auth::guard('users')->attempt(['email' => $request->email, 'password' => $request->password]);
                    if (!is_string($token))  return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);
                    $user = User::where('email', $request->email)->get()->first();
                    $user->auth_token = $token;
                    $user->save();

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
                        if($request->categories[$i]['practise'] > 0){
                            $user->branches()->syncWithoutDetaching($branch_arr[$i]);
                            $user->branches()->updateExistingPivot($branch_arr[$i], ['years' => $request->categories[$i]['practise']]);
                        }
                    }
            
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
                    return response(200);
                } else {
                    DB::rollback();
                    return response("Nastala chyba.. =(", 400);
                }
            }

        }

}
