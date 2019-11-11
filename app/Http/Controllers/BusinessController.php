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
            'email' => 'required|email',
            'username' => 'required|string',
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
            $business = Business::where('email',$request->email)->first();
            
            $business->name = $request->name;
            $business->ico = $request->ico;
            $business->phone = $request->phone;

            if($business->email != $request->emailN){
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

                $business->email = $request->email;
            }

            if($business->username = $request->username){
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

                $business->username = $request->username;
            }
            
            
            if($request->hasFile('profile_pic')){
                if(unlink($business->profile_pic)){
                    $image_file = $request->profile_pic;
            
                    $image_name = $business->username.".".$image_file->getClientOriginalExtension();
                    $image_file->move(public_path('images/profile_pics/'),$image_name);
                    $business->profile_pic = public_path('images/profile_pics/'.$image_name);
                }
                else{
                    return response()->json([
                        'success' => false,
                        'data' => [],
                        'messages' => "Obrazok sa nepodarilo vymazat"
                        ]);
                    };
            }
            else{
                return response()->json([
                    'success' => false,
                    'data' => [],
                    'messages' => "obrazok neni"
                    ]);
            }

            if($business->save()){

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
