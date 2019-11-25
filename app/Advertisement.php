<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    //
    public function business()
    {
        return $this->belongsTo('App\Business');
    }

    public function users()
    {
        return $this->belongsTo('App\User');
    }

    public function branches(){
        return $this->belongsToMany('App\Branch', 'advertisement_branch');
    }

    public function tags(){
        return $this->belongsToMany('App\Tag', 'advertisement_tag');
    }
}
