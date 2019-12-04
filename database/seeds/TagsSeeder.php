<?php

use Illuminate\Database\Seeder;

class TagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $factory->define(App\Tag::class, function (Faker $faker) {
            return [
                'name'=> $faker->word,
            ];
        });
        
    }
}
