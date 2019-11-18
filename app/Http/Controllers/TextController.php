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
            'slide1_title1' => trans('additional-info.slide1_title1'),
            'slide1_subtitle1' => trans('additional-info.slide1_subtitle1'),
            'slide1_placeholder1' => trans('additional-info.slide1_placeholder1'),
            'slide1_placeholder2' => trans('additional-info.slide1_placeholder2'),
            'slide1_subtitle2' => trans('additional-info.slide1_subtitle2'),
            'slide1_placeholder3' => trans('additional-info.slide1_placeholder3'),
            'slide2_title1' => trans('additional-info.slide2_title1'),
            'slide2_placeholder1' => trans('additional-info.slide2_placeholder1'),
            'slide3_title1' => trans('additional-info.slide3_title1'),
            'slide3_subtitle1' => trans('additional-info.slide3_subtitle1'),
            'slide4_title1' => trans('additional-info.slide4_title1'),
            'slide4_subtitle1' => trans('additional-info.slide4_subtitle1'),
            'slide5_placeholder1' => trans('additional-info.slide5_placeholder1'),
            'slide5_checkbox1' => trans('additional-info.slide5_checkbox1'),
            'slide5_checkbox2' => trans('additional-info.slide5_checkbox2'),
            'slide5_submit' => trans('additional-info.slide5_submit')
        ];

        return response()->json([
            'branches' => $branches_arr,
            'languages' => $languages_arr,
            'text' => $text
        ]);

    }
}
