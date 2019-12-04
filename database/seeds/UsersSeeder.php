<?php

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
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

        $users = factory(App\User::class, 5)
           ->create()
           ->each(function ($user) {
                $user->languages()->save(App\Language::find(rand(1,13))->get());
                $user->branches()->save(App\Branch::find(rand(1,18))->get());

            });
    }
}
