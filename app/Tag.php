<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    //
    public function advertisements(){
        return $this->belongsToMany('App\Advertisement', 'advertisement_tag');
    }
}
