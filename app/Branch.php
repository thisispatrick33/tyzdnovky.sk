<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    public function users(){
        return $this->belongsToMany('App\User', 'branch_user');
    }

}
