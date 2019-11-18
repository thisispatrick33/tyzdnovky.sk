<?php

use Illuminate\Database\Seeder;
use App\Branch;
use App\Business;
use App\User;
use App\Language;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $branches_sk = [
            'name' => [
                'automobilový priemysel',
                'gastronómia a hoteliérstvo',
                'účtovníctvo',
                'elektrotechnika a energetika',
                'IT',
                'pomocné práce',
                'služby',
                'stavebníctvo',
                'výroba',
                'sociálna starostlivosť',
                'Bývanie, stavba, záhrada',
                'Brigáda',
                'Biznis služby',
                'Auto moto',
                'Služby pre teba',
                'Oslavy, Eventy',
                'Hodiny a lekcie',
                'Hobby'
            ],
            'placeholder' => [
                'Ja som placeholder',
                'Ja som placeholder',
                'Ja som placeholder',
                'Ja som placeholder',
                'Ja som placeholder',
                'Ja som placeholder',
                'Ja som placeholder',
                'Ja som placeholder',
                'Ja som placeholder',
                'Ja som placeholder',
                'Ja som placeholder',
                'Ja som placeholder',
                'Ja som placeholder',
                'Ja som placeholder',
                'Ja som placeholder',
                'Ja som placeholder',
                'Ja som placeholder',
                'Ja som placeholder'
            ],
            'free_time' => [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true
            ]
        ];

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
        
        for($i=0;$i<sizeof($branches_sk['name']);$i++){
            $branch = new Branch;
            $branch->name = $branches_sk['name'][$i];
            $branch->placeholder = $branches_sk['placeholder'][$i];
            $branch->lang = "sk";
            $branch->free_time = $branches_sk['free_time'][$i];
            $branch->save();
        }

        for($i=0;$i<sizeof($languages_sk);$i++){
            $language = new Language;
            $language->name = $languages_sk[$i];
            $language->lang = "SK";
            $language->basic = true;
            $language->save();
        }
    }
}