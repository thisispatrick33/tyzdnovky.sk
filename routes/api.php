<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//,'jwt.auth'





Route::group(['middleware' => ['api-header','localization']], function () {
    //Route::get("/register","TextController@formData");
    Route::post("/register","RegisterController@register");
    Route::post("/login","LoginController@login");
});