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

class TextController extends Controller
{
    public function formData(Request $request){
        $branches = Branch::select('name')->where('lang',($request->hasHeader('X-localization')) ? $request->header('X-localization') : 'en')->get();
        $languages = Language::select('name')->where('lang',($request->hasHeader('X-localization')) ? $request->header('X-localization') : 'en')->get();

        $branches_arr = [];
        $languages_arr = [];

        foreach($branches as $branch){
            array_push($branches_arr,$branch->name);
        }
        foreach($languages as $language){
            array_push($languages_arr,$language->name);
        }

        $text =  [
            'title' => trans('form.title'),
            'subtitle0' => trans('form.subtitle0'),
            'subtitle1' => trans('form.subtitle1'),
            'subtitle2' => trans('form.subtitle2'),
            'next' => trans('form.next'),
            'prev' => trans('form.prev'),
            'submit' => trans('form.submit'),
            'firstName' => trans('form.firstName'),
            'lastName' => trans('form.lastName'),
            'companyName' => trans('form.companyName'),
            'businessId' => trans('form.businessId'),
            'languagesTitle' => trans('form.languagesTitle'),
            'languages0' => trans('form.languages0'),
            'languages1' => trans('form.languages1'),
            'languages2' => trans('form.languages2'),
            'languages3' => trans('form.languages3'),
            'languages4' => trans('form.languages4'),
            'languagesAditional' => trans('form.languagesAditional'),
            'phone' => trans('form.phone'),
            'entryDate' => trans('form.entryDate'),
            'email' => trans('form.email'),
            'password' => trans('form.password'),
            'profession' => trans('form.profession'),
            'professionAditional' => trans('form.professionAditional'),
            'experience' => trans('form.experience'),
            'drivingLicenseText' => trans('form.drivingLicenseText'),
            'drivingLicense' => trans('form.drivingLicense'),
            'user' => trans('form.user'),
            'company' => trans('form.company'),
        ];

        return response()->json([
            'branches' => $branches_arr,
            'languages' => $languages_arr,
            'text' => $text
        ]);

    }
}
