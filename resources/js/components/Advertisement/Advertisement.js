import React, {useEffect, useState} from 'react';
import {Tags} from './SubComponents/Tags';
import axios from "axios";

export const Advertisement = ({id, createAd = f => f, region, updateAd = f =>f, closeAd}) =>{

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    const [data, setData] = useState({tags: [""]});
    let categories = JSON.parse(localStorage.branches);
    const [branches, setBranches] = useState([]);
    const [type, setType] = useState(true);
    const [tags, setTags] = useState([]);


    useEffect(() => {
        if(id !=null){
            const getAd = async () => {
                const result = await axios(
                    'api/advertisement/'+id,{
                        headers:{
                            "X-localization" : region,
                            "Authorization" : 'Bearer '+JSON.parse(localStorage.appState).user.auth_token
                        }
                    }
                );
                console.log(result);
                setData({...data, title: result.data.title, description: result.data.description, date: result.data.date, salary: result.data.salary, id: result.data.id, user_id:result.data.user_id, business_id: result.data.business_id, address: result.data.address});
                let array = [];
                for(let i=0; i<result.data.branches.length; i++){
                    array.push(result.data.branches[i].id);
                }
                setBranches(array);
                setTags(result.data.tags);
                if(result.data.branches[0].free_time==0){
                    setType(true);
                }
                else {
                    setType(false);
                }
            };
            getAd();
        }
    }, [region]);

    const submit = () => {
        if(id==null){
            if(JSON.parse(localStorage.appState).user.type == "user"){
                createAd({...data, branches: branches, user_id: JSON.parse(localStorage.appState).user.id, tags: tags});
            }
            else {
                createAd({...data, branches: branches, business_id: JSON.parse(localStorage.appState).user.id, tags: tags});
            }
        }
        else {
            updateAd({...data, branches: branches, id: id, tags: tags});
        }


    };

    const handleWork = (value) => {
        let array = [...branches];
        array.includes(value) ? array=array.filter(work => value !== work) : (branches.length >2 ? "" : array.push(value));
        setBranches(array);

    };


    const handleSalary=(salary)=>{
        let tmp = salary.split("");
        let salary_filtered = '';
        let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", '.', ',', '$', '€', '£'];
        console.log(tmp);
        for (let i =0; i<tmp.length; i++){
            if(tmp[i]=="."||tmp[i]==","||tmp[i]=="$"||tmp[i]=="€"||tmp[i]=="£"){
                salary_filtered+=tmp[i];
            }
            if(tmp[i] in numbers){
                salary_filtered+=tmp[i];
            }
        }
        setData({...data, salary: salary_filtered});
    };

    const _tags = (list) =>{
        setTags(list);
    };

    if((id!=null&&data.user_id==undefined&&data.business_id==undefined)){
        return <div >loading</div>
    }
    else {
        return(
            <div className="advertisement-create-wrapper">
                    <div className="container-fluid row justify-content-center m-0 p-0">
                        <div className="advertisement-create-box col-11 m-0 p-0 mt-5 shadow row pb-5 pb-xl-0">
                            <div className="col-12 row justify-content-center pb-0">
                                <div className={"col-12 row justify-content-center py-5"}>
                                    <div className={"col-12 col-lg-10 h10 order-2 order-lg-1"}>
                                        <h1 className="text-center text-uppercase ">vytvorenie inzeratu</h1>
                                    </div>
                                    <div className={"col-12 col-lg-2  h10 order-1 order-lg-2"}>
                                        <div className={"cross float-right"}>
                                            <svg onClick={closeAd} className="ml-3" style={{transform:"scale(.8)"}} width="42" height="42" viewBox="0 0 42 42"><path d="M42,2.467,23.467,21,42,39.534,39.533,42,21,23.468,2.467,42,0,39.534,18.533,21,0,2.467,2.467,0,21,18.534,39.533,0Z" transform="translate(0 -0.001)" fill="#2c393f"/></svg>
                                        </div>
                                    </div>

                                    <div className="row justify-content-center col-12 h90 pt-5 order-3">
                                        <div className="col-xl-3 col-lg-6 pr-3">
                                            <div className={"border-r pt-2 justify-content-start row branches"}>
                                                <div className="branch py-2  mt-1 mb-5 px-4 shadow col-11 text-uppercase">
                                                    <span className="float-left  bold colorful-text">
                                                        fulltime
                                                    </span>
                                                    <span className="float-right  bold">
                                                        freetime
                                                    </span>
                                                </div>
                                                <div className="list row justify-content-start col-12 text-uppercase text-center d-lg-flex d-inline scroll">
                                                    <div className="py-2 mx-3 mt-1 mb-3 px-4 shadow col-lg-11 col-auto submit-button sign-in-button ">
                                                        <span className="">
                                                            ATTAChinterupt
                                                        </span>
                                                    </div>
                                                    <div className="branch py-2 mx-3 mt-1 mb-3 px-4 shadow col-lg-11 col-auto">
                                                        <span className="colorful-text">
                                                            ATTAChinterupt
                                                        </span>
                                                    </div>
                                                    <div className="branch py-2 mx-3 mt-1 mb-3 px-4 shadow col-lg-11 col-auto">
                                                        <span className="colorful-text">
                                                            ATTAChinterupt
                                                        </span>
                                                    </div>
                                                    <div className="branch py-2 mx-3 mt-1 mb-3 px-4 shadow col-lg-11 col-auto">
                                                        <span className="colorful-text">
                                                            ATTAChinterupt
                                                        </span>
                                                    </div>
                                                    <div className="branch py-2 mx-3 mt-1 mb-3 px-4 shadow col-lg-11 col-auto">
                                                        <span className="colorful-text">
                                                            ATTAChinterupt
                                                        </span>
                                                    </div>
                                                    <div className="branch py-2 mx-3 mt-1 mb-3 px-4 shadow col-lg-11 col-auto">
                                                        <span className="colorful-text">
                                                            ATTAChinterupt
                                                        </span>
                                                    </div>
                                                    <div className="branch py-2 mx-3 mt-1 mb-3 px-4 shadow col-lg-11 col-auto">
                                                        <span className="colorful-text">
                                                            ATTAChinterupt
                                                        </span>
                                                    </div>
                                                    <div className="branch py-2 mx-3 mt-1 mb-3 px-4 shadow col-lg-11 col-auto">
                                                        <span className="colorful-text">
                                                            ATTAChinterupt
                                                        </span>
                                                    </div>
                                                    <div className="branch py-2 mx-3 mt-1 mb-3 px-4 shadow col-lg-11 col-auto">
                                                        <span className="colorful-text">
                                                            ATTAChinterupt
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-9 col-lg-6 text-uppercase pt-5 row justify-content-center">
                                            <input className="col-11 px-3 my-2 my-xl-0" type="text" placeholder="Aké povolanie vyhľadávate ? "/>
                                            <Tags addTags={_tags} list={tags}/>
                                            <textarea className="col-11 px-3 py-3 my-2 my-xl-0" cols="30" rows="5" placeholder="Pridajte popis a podmienky práce"></textarea>
                                            <div className="col-11 row justify-content-between p-0 pt-4">
                                                <input className="col-xl-3 col-lg-12 px-3 my-2 my-xl-0" type="text" placeholder="Zadajte miesto práce"/>

                                                <input className="col-xl-3 col-lg-12 px-3 my-2 my-xl-0" type="text" placeholder="Zadajte dátum nástupu"/>

                                                <input className="col-xl-3 col-lg-12 px-3 my-2 my-xl-0" type="text" placeholder="Zadajte plat"/>
                                            </div>

                                            <button className="my-2 mb-3 submit-button sign-in-button px-5 d-block text-uppercase py-3 py-xl-1">
                                                <span> vytvoriť  <span className={"strong"}>inzerát !</span></span>
                                            </button>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
        );
    }


};
