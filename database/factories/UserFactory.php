<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name'=> $faker->firstName,
        'lastname'=> $faker->lastName,
        'email'=> $faker->email,
        'username'=> $faker->userName,
        'password'=> Hash::make("password"),
        'phone'=> $faker->phoneNumber,
        'profile_pic'=> null,
        'driving_license'=> $faker->boolean($chanceOfGettingTrue = 50),
        'active'=> 1
    ];
});