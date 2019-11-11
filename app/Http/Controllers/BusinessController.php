<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Business;

class BusinessController extends Controller
{
    public function get(){
        $business = Business::all();
        return response()->json([
            'success' => true,
            'data'=> $business,
            'messages' => ""
        ]);
    }

    public function getOne($id){
        if($business = Business::find($id)){
            return response()->json([
                'success' => true,
                'data'=> $business,
                'messages' => ""
            ]);
        }
        else{
            return response()->json([
                'success' => false,
                'data'=> "",
                'messages' => ""
            ]);
        }
    }

    public function update(){
        $validator = Validator::make($request->all(), [
            'categories' => 'required|array',
            'drivingLicense' => 'required|boolean',
            'languages' => 'required|array',
            'username' => 'required|unique:users|unique:business',
            'name' => 'required|string',
            'lastName' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'profile_pic' => 'required|image|mimes:jpeg,png,jpg,gif,svg'
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
            $user = User::where('email',$request->email)->first();

            $user->driving_license = $request->drivingLicense;
            $user->name = $request->name;
            $user->lastname = $request->lastName;
            $user->phone = $request->phone;
           
            
            if($user->email != $request->email){
                $validator = Validator::make($request->all(), [
                    'emailN' => 'required|email|unique:users|unique:business'
                ]);
                    
                if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'data' => [],
                    'messages' => $validator->messages()->all()
                    ]);
                };

                $user->email = $request->email;
            }
            if($user->username != $request->username){
                $validator = Validator::make($request->all(), [
                    'username' => 'required|unique:users|unique:business'
                ]);
                    
                if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'data' => [],
                    'messages' => $validator->messages()->all()
                    ]);
                };

                $user->username = $request->username;
            }
            if($request->hasFile('profile_pic')){
                $validator = Validator::make($request->all(), [
                    'profile_pic' => 'required|image|mimes:jpeg,png,jpg,gif,svg'
                ]);
                    
                if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'data' => [],
                    'messages' => $validator->messages()->all()
                    ]);
                };

                if(unlink($user->profile_pic)){
                    $image_file = $request->profile_pic;
            
                    $image_name = $user->username.".".$image_file->getClientOriginalExtension();
                    $image_file->move(public_path('images/profile_pics/'),$image_name);
                    $user->profile_pic = public_path('images/profile_pics/'.$image_name);
                }
                else{
                    return response()->json([
                        'success' => false,
                        'data' => [],
                        'messages' => "Obrazok sa nepodarilo vymazat"
                        ]);
                    };
            }
            
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
                
                $user->languages()->attach($language_arr);
                $user->branches()->attach($request->categories);
                
                $success = true;
            }
            else{
                $success = false;
            }
        }catch (\Exception $e) {
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
                                  'username' => $user->username,
                                  'profile_pic' => $user->profile_pic
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

    public function delete($id){
        if($business = Business::find($id)){
            $business->delete();
            return response()->json([
                'success' => true,
                'data'=> "",
                'messages' => ""
            ]);
        }
        else{
            return response()->json([
                'success' => false,
                'data'=> "",
                'messages' => ""
            ]);
        }
    }
}
