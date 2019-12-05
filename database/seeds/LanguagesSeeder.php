<?php

use Illuminate\Database\Seeder;
use App\Language;

class LanguagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $languages_sk = [
            'česky',
            'španielsky',
            'anglicky',
            'maďarsky',
            'arabsky',
            'portugalsky',
            'rusky',
            'japonsky',
            'nemecky',
            'kórejsky',
            'francúzsky',
            'turecky',
            'vietnamsky' 
        ];
        
        

        for($i=0;$i<sizeof($languages_sk);$i++){
            $language = new Language;
            $language->name = $languages_sk[$i];
            $language->lang = "SK";
            $language->basic = true;
            $language->save();
        }
    }
}
