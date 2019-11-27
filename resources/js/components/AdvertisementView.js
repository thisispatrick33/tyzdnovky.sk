import React, {useEffect, useState} from 'react';
import axios from "axios";

export const AdvertisementView = ({id, region}) =>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;


    const [data, setData] = useState({});

    const[date, setDate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'api/advertisement/'+id,{
                    headers:{
                        "X-localization" : region,
                        "Authorization" : 'Bearer '+JSON.parse(localStorage.appState).user.auth_token
                    }
                }
            );
            console.log("get");
            console.log(result);
            setData(result.data);
            setDate(result.data.created_at.substring(0, result.data.created_at.indexOf('T')));

        };
        fetchData();
    }, [region]);

    if(data.title==undefined){
        return (
            <div>
                loading
            </div>
        )
    }
    return (
        <div>
            <h1>{data.title}</h1>
            <h1>{data.description}</h1>
            <h1>{data.salary}</h1>
            <h1>{data.address}</h1>
            <h1>{data.date}</h1>
            {
               date >= today ? "new" : 'top'
            }
            {
                data.branches.map( ({name}) => {
                        return <div>{name}</div>;
                })
            }
            {
                data.tags.map( (value) => {
                    return <div>{value}</div>;
                })
            }


        </div>
    )
};