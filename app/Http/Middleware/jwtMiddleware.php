<?php
namespace App\Http\Middleware;
use Closure;

class jwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {   
        $response;
        if($request->hasHeader("Authorization")){
            $token = explode(" ",$request->header("Authorization"))[1];
            if(\App\User::where("auth_token",$token)->first()){
                $response = $next($request);
            }
            elseif(\App\Company::where("auth_token",$token)->first()){
                $response = $next($request);
            }
            //ADMIN TODO
            else{
                $response = response('Unauthorized.', 401);
            }
            
        }
        else{   
            $response = response('Unauthorized.', 401);
        }
        return $response;
    }
}