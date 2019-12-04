<?php

use Illuminate\Database\Seeder;

class BusinessesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
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

        $businesses = factory(App\Business::class, 3)->create();
           
    }
}
