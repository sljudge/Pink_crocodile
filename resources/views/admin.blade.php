@extends('layouts/admin_layout')

@section('admin')
    <div class="card mb-2">
        <h5 class="card-header">Overviews</h5>

        <div class="card-body">
            <a href="{{action('AdminController@finished_events')}}"><button class="btn btn-primary">Show Finished Events</button></a>
            <a href="{{action('AdminController@logs')}}"><button class="btn btn-primary">Show Users</button></a>                       
        </div>
    </div>

    <div class="card mb-2">
        <h5 class="card-header">Events</h5>

        <div class="card-body">
            <a href="{{action('EventController@index')}}"><button class="btn btn-primary">Show Events</button></a>
            <a href="{{action('EventController@create')}}"><button class="btn btn-outline-primary">Add New Event</button></a>
        </div>
    </div>
    
    <div class="card mb-2">
        <h5 class="card-header">Items</h5>

        <div class="card-body">
            <a href="{{action('ItemController@index')}}"><button class="btn btn-primary">Show Items</button></a>
            <a href="{{action('ItemController@create')}}"><button class="btn btn-outline-primary">Add New Item</button></a>
        </div>
    </div>
    
    <div class="card mb-2">
        <h5 class="card-header">Donors</h5>

        <div class="card-body">
            <a href="{{action('DonerController@index')}}"><button class="btn btn-primary">Show Donors</button></a>
            <a href="{{action('DonerController@create')}}"><button class="btn btn-outline-primary">Register New Donor</button></a>
        </div>
    </div>
@endsection
