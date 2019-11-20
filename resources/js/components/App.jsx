import React, { useState, useEffect } from 'react';
import Nav from './Nav/Nav.jsx';
import Login from './Login/Login.jsx';
import Auction from './Auction/Auction.jsx';
import ContainerBtns from './ContainerBtns/ContainerBtns.jsx';
import ItemsList from './ItemsList/ItemsList.jsx';

const App = () => {

    /////AUTH//////
    const [token, setToken] = useState(window.localStorage.getItem('_token'))
    const [loggedIn, setLoggedIn] = useState(token ? true : false)
    const [userId, setUserId] = useState(11)
    /////ITEMS//////
    const [items, setItems] = useState([])
    const [currentItemId, setCurrentItemId] = useState()
    /////DISPLAY//////
    const [display, setDisplay] = useState(loggedIn ? 'show': null)


    //////////////////////////////////////////////////////
                    // AUTHORISATION //
    ///////////////////////////////////////////////////////

    function getToken (type, input) {

        fetch(`/api/auth/${type}`, {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token,
                'Accept' : 'application/json'
            },
            body: input
        })
        .then((response) => response.json())
        .then((response) => {
            console.log('login resonse ',response)
            if(!response.error){
                setToken(response.token)
                window.localStorage.setItem('_token', response.token)
                setLoggedIn(true)
                setUserId(response.id)
                setDisplay('show')
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    function checkToken () {
        fetch(`/api/auth/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token,
                'Accept' : 'application/json'
            },
        })
        .then((response) => response.json())
        .then((response) => {
            // console.log('response ', response)
        })
    }

    //////////////////////////////////////////////////////
                        // DISPLAY //
    ///////////////////////////////////////////////////////

    const getItems = (url) => {
        fetch(`/api/${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token,
                'Accept' : 'application/json'
            },
        })
        .then((response) => response.json())
        .then((response) => {
            setItems(response.map(auctionItem => auctionItem))
            setItems(response)
        })
    }

    const setDisplayTypeBtn = (e) => {
        const type = e.target.id
        setDisplay(type)
    }

    const changeIndex = (e) => {
        if(currentItemId === items.length - 1 && e.target.id === 'next'){
            setCurrentItemId(0)
        }else if(currentItemId === 0 && e.target.id === 'previous'){
            setCurrentItemId(items.length-1)
        }else if(e.target.id === 'previous'){
            setCurrentItemId(i => --i)
        }else if(e.target.id === 'next'){
            setCurrentItemId(i => ++i)
        }
    }

    const handleShow = (e) => {
        console.log('E: ', e.target.id)
        setCurrentItemId(e.target.id - 1)
        setDisplay('show')
    }

    
    useEffect(() => {
        getItems('landing')
        setCurrentItemId(0)
        console.log('Items CompDidMount: ',items)
    }, [])
    
    //////////////////////////////////////////////////////
                        // RETURN //
    ///////////////////////////////////////////////////////
    
    token && checkToken()

    // token && console.log('TOKEN ', token)
        // token && console.log('LOCAL STORAGE: ',window.localStorage.getItem('_token'))
    
    console.log('USER_ID: ', userId)

    return (
        <>
        <Nav/>
        
        <div className="main-container">
            
            <ContainerBtns setDisplayTypeBtn={loggedIn ? setDisplayTypeBtn : null} display={display} />

            <div className="main">
                {
                    display === 'show' && 
                        <div id='previous' className="direction-btn direction-btn_left" onClick={changeIndex} >&lt;</div>
                }
                <div className="display">
                    {!loggedIn && <Login getToken={getToken} />}
                    {display === 'list' && <ItemsList items={items} handleShow={handleShow}/>}
                    {display === 'show' && items.length > 0 && <Auction item={items[currentItemId]} userId={userId} token={token}/>}
                </div>
                {
                    display === 'show' &&
                        <div id='next' className="direction-btn direction-btn_right" onClick={changeIndex}>&gt;</div>
                }

            </div>
        </div>
        </>
    )
}


export default App;




