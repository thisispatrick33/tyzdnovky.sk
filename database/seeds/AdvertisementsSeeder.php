<?php

use Illuminate\Database\Seeder;

class AdvertisementsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
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
        $advertisements = factory(App\Advertisement::class, 5)
           ->create()
           ->each(function ($advertisement) {
                $advertisement->tags()->save(factory(App\Tag::class,rand(1,10))->make());
                $advertisement->branches()->save(App\Branch::find(rand(1,18))->get());
            });
    }
}
