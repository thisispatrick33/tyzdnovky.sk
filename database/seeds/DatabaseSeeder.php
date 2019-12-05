<?php

use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
       


        $this->call([
            BranchesSeeder::class,
            LanguagesSeeder::class
        ]);

        $users = factory(App\User::class, 5)
           ->create()
           ->each(function ($user) {
                $branchesArray = range(1,18);
                $languagesArray = range(1,13);
                shuffle($languagesArray);
                shuffle($branchesArray);
                $user->languages()->attach(array_slice($languagesArray , 1, rand(1,5)));
                $user->branches()->attach(array_slice($branchesArray , 1, rand(1,5)));

            });
        $businesses = factory(App\Business::class, 3)->create();
        $tags = factory(App\Tag::class, 55)->create();
        $advertisements = factory(App\Advertisement::class, 20)
           ->create()
           ->each(function ($advertisement) {
                $branchesArray = range(1,18);
                shuffle($branchesArray);
                $tagsCount = sizeof(App\Tag::all());
                $tagsArray = range(1,$tagsCount);
                shuffle($tagsArray);
                $advertisement->tags()->attach(array_slice($tagsArray, 1, rand(1,10)));
                $advertisement->branches()->attach(array_slice($branchesArray, 1, rand(1,3)));
            });
       
    }
}