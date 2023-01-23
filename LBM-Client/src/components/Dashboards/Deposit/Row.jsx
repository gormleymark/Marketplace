import { useState } from "react";
import "./Deposit.scss";
import BTC from "./assets/BTC.svg"
import LTC from "./assets/LTC.svg"
import ETH from "./assets/ETH.svg"
import ModalDeposit from "../ModalDeposit/ModalDeposit";

export default function Row({img,name, amount, value}) {

    const [render , setRender] = useState(value)
    const [active, setActive] =useState({
        supply: false,
        borrow: false
    });

   var urlImg

    if(img === 'BTC') {
        urlImg = BTC
    }
    else if(img ==='LTC') {
        urlImg = LTC
    }
    else if(img==='ETH') {
        urlImg = ETH
    }

    const handleClick = () => {
        setRender(!render)
    };

    const handleButton = (e) => {
        e.preventDefault()
    };

    return (
            <div className="row" >
                <div className="innerRow2" onClick={handleClick}>
                    <img src={urlImg} />
                    <p>{name}</p>
                </div>
                {render && <div className="innerRow3" onClick={handleClick}>
                    <p>{amount}</p>
                </div>}
                {!render &&<div className="innerRow">                      
                    <ModalDeposit name='Supply'/>
                    <ModalDeposit name='Withdraw'/>
                </div>}
            </div>
    )
};
