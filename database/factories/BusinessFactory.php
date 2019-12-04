<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Business;
use Faker\Generator as Faker;

$factory->define(App\Business::class, function (Faker $faker) {
    return [
        'name'=> $faker->firstName,
        'ico'=> $faker->isbn13,
        'email'=> $faker->email,
        'username'=> $faker->userName,
        'password'=> Hash::make("password"),
        'phone'=> $faker->phoneNumber,
        'profile_pic'=> null,
        'active'=> 1
    ];
});
