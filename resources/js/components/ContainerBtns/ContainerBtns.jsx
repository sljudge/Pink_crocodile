import React from 'react';

const ContainerBtns = props => {
    const {setDisplayTypeBtn, display} = props

    return (
        <div className="container-btns">
            <div className={`container-btn btn ${display === 'show' ? 'current-btn' : 'silent-btn'}`}>
                <i id="show" className="far fa-circle" onClick={setDisplayTypeBtn}></i>
            </div>
            <div className={`container-btn btn ${display === 'list' ? 'current-btn' : 'silent-btn'}`} >
                <i id="list" className="fas fa-ellipsis-v" onClick={setDisplayTypeBtn}></i>
            </div>
        </div>
    )
}

export default ContainerBtns;