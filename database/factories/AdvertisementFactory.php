<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Advertisement;
use Faker\Generator as Faker;

$factory->define(App\Advertisement::class, function (Faker $faker) {
    return [
        'title'=> $faker->catchPhrase,
        'description'=> $faker->sentence($nbWords = 20, $variableNbWords = true),
        'date'=> $faker->date($format = 'Y-m-d', $max = '+30 years'),
        'address'=> $faker->country ,
        'salary'=> $faker->numberBetween($min = 10, $max = 10000),
        'business_id' => factory(App\Business::class)
    ];
});
