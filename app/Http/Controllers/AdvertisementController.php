<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Advertisement;
use App\Tag;
use DB;

class AdvertisementController extends Controller
{
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'date' => 'required|date',
            'address' => 'required|string',
            'salary' => 'required|string',
            'business_id' => Rule::requiredIf(function () use ($request) {
                return $request->user_id==null?true:false;
            }),
            'user_id' => Rule::requiredIf(function () use ($request) {
                return $request->business_id==null?true:false;
            }),
            'branches' => 'required|array',
            'tags' => 'required|array',
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
            $ad = new Advertisement;

            $ad->title = $request->title;
            $ad->description = $request->description;
            $ad->date = $request->date;
            $ad->address = $request->address;
            $ad->salary = $request->salary;
            if($request->user_id){
                $ad->user_id = $request->user_id;
            }
            else{       
                $ad->business_id = $request->business_id;
            }
            if($ad->save()){
                $tag_arr = [];

                foreach($request->tags as $tag){  
                    if(strlen($tag) > 0 && $tag != " "){
                        $tag_id = Tag::where('name','=',$tag)->first();
                        if ($tag_id) {
                            array_push($tag_arr,$tag_id->id);
                        }
                        else {
                            $NewTag = new Tag;
                            $NewTag->name = $tag;
                            if ($NewTag->save()) {
                                array_push($tag_arr,$NewTag->id);
                            }
                        }
                    }  
                }

                $ad->tags()->attach($tag_arr);
                $ad->branches()->attach($request->branches);
                $success = true;
            }   
            else{
                $success = false;
            }
        
        }catch (\Exception $e) {
            // maybe log this exception, but basically it's just here so we can rollback if we get a surprise
            return $e;
        }
        
        if ($success) {
            DB::commit();
            return response()->json([
                'success' => true,
                'data'=>[],
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

    public function update(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'title' => 'required|string',
            'description' => 'required|string',
            'date' => 'required|date',
            'address' => 'required|string',
            'salary' => 'required|string',
            'branches' => 'required|array',
            'tags' => 'required|array',
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
            $ad = Advertisement::where('id',$request->id)->first();

            $ad->title = $request->title;
            $ad->description = $request->description;
            $ad->date = $request->date;
            $ad->address = $request->address;
            $ad->salary = $request->salary;
            if($ad->save()){
                $tag_arr = [];

                foreach($request->tags as $tag){   
                    if(strlen($tag) > 0 && $tag != " "){
                        $tag_id = Tag::where('name','=',$tag)->first();
                        if ($tag_id) {
                            array_push($tag_arr,$tag_id->id);
                        }
                        else {
                            $NewTag = new Tag;
                            $NewTag->name = $tag;
                            if ($NewTag->save()) {
                                array_push($tag_arr,$NewTag->id);
                            }
                        }
                    }
                }

                $ad->tags()->detach();
                $ad->branches()->detach();

                $ad->tags()->attach($tag_arr);
                $ad->branches()->attach($request->branches);

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
                'data'=>[],
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
        if($ad = Advertisement::find($id)){
            $ad->delete();
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

    public function getAll(){
        $ads = Advertisement::with(['tags','branches'])->get();

        $res=[];

        foreach($ads as $ad){
            $tags=[];
            $branches=[];

            foreach($ad->tags as $tag){
                array_push($tags,$tag->name);
            }
    
            foreach($ad->branches as $branch){
                $branchNew['id']=$branch->id;
                $branchNew['free_time']=$branch->free_time;
                $branchNew['name']=$branch->name;
                array_push($branches,$branchNew);
            }

            $adNew = [
                'id' => $ad->id,
                'title' => $ad->title,
                'description' => $ad->description,
                'user_id' => $ad->user_id,
                'business_id' => $ad->business_id,
                'date' => $ad->date,
                'salary' => $ad->salary,
                'address' => $ad->address,
                'created_at' => $ad->created_at,
                'branches' => $branches,
                'tags' => $tags
            ];

            array_push($res, $adNew);
        };

        return response()->json($res);
    }

    public function getOne($id){
        $ad = Advertisement::with(['tags','branches'])->find($id);

        $tags=[];
        $branches=[];

        foreach($ad->tags as $tag){
            array_push($tags,$tag->name);
        }

        foreach($ad->branches as $branch){
            $branchNew['id']=$branch->id;
            $branchNew['free_time']=$branch->free_time;
            $branchNew['name']=$branch->name;
            array_push($branches,$branchNew);
        }

        $res = [
            'id' => $ad->id,
            'title' => $ad->title,
            'description' => $ad->description,
            'user_id' => $ad->user_id,
            'business_id' => $ad->business_id,
            'date' => $ad->date,
            'salary' => $ad->salary,
            'address' => $ad->address,
            'created_at' => $ad->created_at,
            'branches' => $branches,
            'tags' => $tags,
        ];

        return response()->json($res);
    }

}