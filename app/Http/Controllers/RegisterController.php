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

class RegisterController extends Controller
{
    public function branchesCount()
    {
        return sizeOf(Branch::all());
    }
    public function branches()
    {
        return Branch::all();
    }
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
                'email' => 'required|email|unique:users|unique:business',
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
                $business= new Business;

                $business->email = $request->email;
                $business->password = \Hash::make($request->passwordR);

                if($business->save()){

                    $token = \Auth::guard('businesses')->attempt(['email' => $request->email, 'password' => $request->passwordR]);
                    if (!is_string($token))  return response()->json(['success'=>false,'data'=>[],'messages'=>trans('messages.tokenFailed')]);
                    $business = Business::where('email', $request->email)->get()->first();
                    $business->auth_token = $token;
                    $business->save();
                    $success = true;

                }
                else{
                    $success = false;
                }
            } catch (\Exception $e) {
                // maybe log this exception, but basically it's just here so we can rollback if we get a surprise
                return $e;
            }

            if ($success) {
                DB::commit();
                return response()->json([
                    'success' => true,
                    'data'=>['type' => 'business',
                        'id' => $business->id,
                        'auth_token' => $business->auth_token,
                        'name' => $business->name,
                        'bussinesId' => $business->ico,
                        'phone' => $business->phone,
                        'email'=> $business->email,
                        'active' => $business->active,
                        'username' => $business->username,
                        'profile_pic' => $business->profile_pic
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
                'email' => 'required|email|unique:users|unique:business',
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

                $user->email = $request->email;
                $user->phone = $request->phone;

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
                        'email'=> $user->email,
                        'active' => $user->active,
                        'drivingLicense' => $user->driving_license,
                        'username' => $user->username,
                        'profile_pic' => $user->profile_pic
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
                'messages' => $validator->messages()->all()
            ]);
        };
        if($user = User::where('email',$request->email)->where('active',false)->first()){
            $validator = Validator::make($request->all(), [
                'categories' => 'required|array',
                'drivingLicense' => 'required|string',
                'languages' => 'required|array',
                'username' => 'required|unique:users|unique:business',
                'name' => 'required|string',
                'lastName' => 'required|string',
                'phone' => 'required|string',
                'email' => 'required|email',
                'profile_pic' => 'required'
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
                $user->driving_license = ($request->drivingLicense == "true")?1:0;
                $user->username = $request->username;
                $user->name = $request->name;
                $user->lastname = $request->lastName;
                $user->phone = $request->phone;
                $user->email = $request->email;

                if($request->hasFile('profile_pic')){
                    $image_file = $request->profile_pic;

                    $image_name = $user->username.".".$image_file->getClientOriginalExtension();
                    $image_file->move(public_path('images/profile_pics/'),$image_name);
                    $user->profile_pic = public_path('images/profile_pics/'.$image_name);
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
                            $NewLanguage->lang = ($request->hasHeader('X-localization')) ? $request->header('X-localization') : 'EN';
                            if ($NewLanguage->save()) {
                                array_push($language_arr,$NewLanguage->id);
                            }
                        }
                    }

                   
                    $user->languages()->detach();
                    $user->branches()->detach();


                    $user->languages()->attach($language_arr);
                    $user->branches()->attach($request->categories);

                    $user->active = true;

                    if($user->save()){
                        $success = true;
                    }

                }
                else{
                    $success = false;
                }
            } catch (\Exception $e) {
                return $e;
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
        else if($business = Business::where('email',$request->email)->where('active',false)->first()){
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'username' => 'required|unique:users|unique:business',
                'name' => 'required|string',
                'ico' => 'required|string',
                'phone' => 'required|string',
                'profile_pic' => 'required'
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

                $business->username = $request->username;
                $business->name = $request->name;
                $business->ico = $request->ico;
                $business->phone = $request->phone;
                $business->email = $request->email;

                if($request->hasFile('profile_pic')){
                    $image_file = $request->profile_pic;

                    $image_name = $business->username.".".$image_file->getClientOriginalExtension();
                    $image_file->move(public_path('images/profile_pics/'),$image_name);
                    $business->profile_pic = public_path('images/profile_pics/'.$image_name);
                }

                if($business->save()){
                    $business->active = true;

                    if($business->save()){
                        $success = true;
                    }


                }
                else{
                    $success = false;
                }
            } catch (\Exception $e) {
                return $e;
                // maybe log this exception, but basically it's just here so we can rollback if we get a surprise
            }

            if ($success) {
                DB::commit();
                return response()->json([
                    'success' => true,
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