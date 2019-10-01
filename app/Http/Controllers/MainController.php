<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DB;
use App\Branch;
use App\Company;
use App\User;
use App\Language;

class MainController extends Controller
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
                'driving_license' => 'required|boolean',
                'email' => 'required|email|unique:users',
                'firstName' => 'required|string',
                'languages' => 'required|array',
                'lastName' => 'required|string',
                'phone' => 'required|string',
                'ready' => 'required|date',
            ]);
             
            if ($validator->fails()) {
                $error = $validator->messages();
                return response($error,400);
            };
        

            $success = false;

            DB::beginTransaction();

            try {
        
                $user= new User;
                $user->name = $request->firstName;
                $user->lastname = $request->lastName;
                $user->email = $request->email;
                $user->phone = $request->phone;
                $user->driving_license = $request->driving_license;
                $user->nastup = $request->ready;

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
