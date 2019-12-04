<?php

use Illuminate\Database\Seeder;
use App\Branch;

class BranchesSeeder extends Seeder
{
    /**
     * Run the database seeds.
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

        for($i=0;$i<sizeof($branches_sk['name']);$i++){
            $branch = new Branch;
            $branch->name = $branches_sk['name'][$i];
            $branch->placeholder = $branches_sk['placeholder'][$i];
            $branch->lang = "sk";
            $branch->free_time = $branches_sk['free_time'][$i];
            $branch->save();
        }
    }
}
