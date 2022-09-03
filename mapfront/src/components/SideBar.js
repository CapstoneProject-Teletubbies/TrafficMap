import React from 'react';
import styles from '../css/SideBar.css'
import { useState, useEffect, useRef } from 'react';

const SideBar =({width=310, children})=>{
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(width);
    const [boxShadow, setBoxShadow] = useState();
    const side = useRef();

    const toggleMenu = () => {
        if(xPosition > 0){
            setX(0);
            setBoxShadow('1px 3px 15px 1px gray');
            setOpen(true);
        }else{
            setX(width);
            setBoxShadow('none');
            setOpen(false);
        }
    }
    const handleClose = async e => {
        console.log("클릭");
        console.log(isOpen);
        let sideArea = side.current;
        let sideCildren = side.current.contains(e.target);
        if (isOpen && (!sideArea || !sideCildren)) {
            await setX(width); 
            await setOpen(false);
        }
    }

    useEffect(()=>{
        window.addEventListener('click', handleClose);
        return () => {
            window.removeEventListener('click', handleClose);
        };
    })

    useEffect(()=>{
        console.log(children);
    }, [children])


    return(
        <div className="sidebarmain">
            <div ref={side}  className="innersidbar" style={{ width: `${width}px`, height: window.innerHeight,  transform: `translatex(${-xPosition}px)`, boxShadow: boxShadow}}>
                <button  onClick={() => toggleMenu()}
                className="sidebarbutton" >
                상세
                </button>
                <div className="sidebarcontent" style={{position: "relative", height: "89%", overflowY: "scroll"}}>
                    <div className='list-group' style={{overflowY: "scroll"}}>
                    {children && children.map((obj, index)=>{
                        return(
                            <li className='list-group-item'>
                                {obj}
                            </li>
                        );
                    })}  
                    </div>  
                </div> 
            </div>
      </div>
    );
}

export default SideBar; 
