<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Company;

class CompanyController extends Controller
{
    public function get(){
        $companies = Company::all();
    }

    public function getOne($id){
        $company = Company::find($id);
    }

    public function update(){

    }

    public function delete(Request $request){
        Company::destroy($request->id);
    }
}
