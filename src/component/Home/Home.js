import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import vehicleData from '../../fakeData/vehicleData.json';
import "./Home.css"

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    useEffect(()=>{
        setVehicles(vehicleData);
    }, []);

    const history = useHistory();
    const vehicleTag = (key) =>{
        const url = `search/${key}`;
        history.push(url);
    }

    return (
        <>
        <div className="bg"></div>
        <div className="container">
            <div className="row">
            {
                vehicles.map(vehicle =>  
                <div className="container card mt-5" style={{ width: '18rem' }}>
                    <img src={vehicle.img} onClick={()=>vehicleTag(vehicle.name)} className="card-img-top" style={{ height: '250px' }} alt=""/>
                    <div className="card-body">
                        <h5 onClick={()=>vehicleTag(vehicle.name)} className="card-title text-center">{vehicle.name}</h5>
                    </div>
                </div>
                )
            }
            </div>
        </div>
        </>
    );
};

export default Home;
