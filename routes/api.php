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
        //AD CREATE
        Route::post("/advertisement","AdvertisementController@store");
        //USER EDIT
        Route::post("/user","UserController@update");
        //BUSINESS EDIT
        Route::post("/business","BusinessController@update");
        //AD EDIT
        Route::put("/advertisement","AdvertisementController@update");
        //USER GET
        Route::get("/user/{id}","UserController@getOne");
        Route::get("/user","UserController@get");
        //BUSINESS GET
        Route::get("/business/{id}","BusinessController@getOne");
        Route::get("/business","BusinessController@get");
        //AD GET
        Route::get("/advertisement","AdvertisementController@getAll");
        Route::get("/advertisement/{id}","AdvertisementController@getOne");
        //USER DELETE
        Route::delete("/user/{id}","UserController@delete");
        //BUSINESS DELETE
        Route::delete("/business/{id}","BusinessController@delete");
        //AD DELETE
        Route::delete("/advertisement/{id}","AdvertisementController@delete");
        
    });
    
});

