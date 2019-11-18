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

class TextController extends Controller
{
    public function additionalInfoText(Request $request){
        $branches = Branch::select(['id','name','free_time'])->where('lang',($request->hasHeader('X-localization')) ? $request->header('X-localization') : 'en')->get();
        $languages = Language::select('name')->where('lang',($request->hasHeader('X-localization')) ? $request->header('X-localization') : 'en')->where('basic',1)->get();
        $branches_arr = [];
        $languages_arr = [];

        foreach($branches as $branch){
            array_push($branches_arr,['id'=>$branch->id,
                                      'name'=>$branch->name,
                                      'free_time'=>$branch->free_time]);
        }
        foreach($languages as $language){
            array_push($languages_arr,$language->name);
        }

        $text =  [
            
        ];

        return response()->json([
            'branches' => $branches_arr,
            'languages' => $languages_arr,
            'text' => $text
        ]);

    }
}
