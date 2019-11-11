<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
// Route::get('/', function () {
//     return view('react');
// });
// Route::get('/', 'ReactController@show');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/admin', 'HomeController@admin')->name('admin')->middleware('admin');

Route::resource('/doner', 'DonerController')->middleware('admin');
Route::resource('/item', 'ItemController')->middleware('admin');
Route::get('/item/orderby/{order}', 'ItemController@index')->middleware('admin');
Route::resource('/event', 'EventController')->middleware('admin');

Route::get('/log', 'AdminController@logs')->middleware('admin');
Route::get('/{id}/log', 'AdminController@log_show')->middleware('admin');

Route::get('api/landing', 'api\ItemController@landing');

