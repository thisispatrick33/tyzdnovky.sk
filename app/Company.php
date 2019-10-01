<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    public function branches(){
        return $this->belongsToMany('App\Branch', 'branch_company');
    }
}
