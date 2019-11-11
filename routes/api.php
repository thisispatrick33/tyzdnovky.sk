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
    //TEXT
    Route::get("/register-additional","TextController@additionalInfoText");

    //LOGIN-REGISTER
    Route::post("/register","RegisterController@register");
    Route::post("/login","LoginController@login");
    //PASSWORD RESET
    Route::post("/password-reset-mail","LoginController@passResetEmail");
    Route::post("/password-reset","LoginController@passResetDo");
    
    Route::group(['middleware' => ['jwt-auth']], function () {
        //REG.ADDITIONAL
        Route::post("/register-additional","RegisterController@additionalInfo");
        //USER EDIT

        //USER GET

        //USER DELETE
    });
    
});

