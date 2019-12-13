import React, {useEffect, useState} from 'react';
import {Tags} from './SubComponents/Tags';
import {Loader} from "../Others/Loader";

export const Offer = ({data, edit, createOffer = f => f, user, updateOffer = f => f, closeOffer, clearOffer}) => {
    const [offer , setOffer] = useState(data);
    const [tags, setTags] = useState([]);
    const [branches, setBranches] = useState([]);
    const [brancheType, setBrancheType] = useState(true);

    useEffect(() => {
        setOffer(data);
        if(data !== null && edit){
            setTags(data.tags);
            let array = [];
            data.branches.map(({id})=>{
                array.push(id);
            });
            setBranches(array);
            setBrancheType(data.branches[0].free_time === 0);
        }
    }, [data]);

    const close = () =>{
        closeOffer();
        clearOffer();
    };

    const submit = async () => {
       if(edit){
           if(await updateOffer({...offer, branches: branches, tags: tags})){
               close();
           }
       }else {
            if(user.type === "user"){
                if(await createOffer({...offer, branches: branches, user_id: user.id, tags: tags})){
                    close();
                }
            }
            else {
                if(await createOffer({...offer, branches: branches, business_id: user.id, tags: tags})){
                    close();
                }
            }
       }
    };

    const handleSalary=(salary)=>{
        let tmp = salary.split("");
        let salary_filtered = '';
        let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", '.', ',', '$', '€', '£'];
        for (let i =0; i<tmp.length; i++){
            if(tmp[i]=="."||tmp[i]==","||tmp[i]=="$"||tmp[i]=="€"||tmp[i]=="£"){
                salary_filtered+=tmp[i];
            }
            if(tmp[i] in numbers){
                salary_filtered+=tmp[i];
            }
        }
        setOffer({...offer, salary: salary_filtered});
    };

    const handleWork = (value) => {
        let array = [...branches];
        array.includes(value) ? array=array.filter(work => value !== work) : ( branches.length >2? "" : array.push(value));
        setBranches(array);

    };

    const changeType = (bool) => {
        setBranches([]);
        setBrancheType(bool)
    };


    if(edit && offer === null){
        return <Loader />;
    }
    return (
        <div className="offer-create-wrapper">
            <div className="container-fluid row justify-content-center m-0 p-0">
                <div className="offer-create-box col-11 m-0 p-0 mt-5 shadow row pb-5 pb-xl-0">
                    <div className="col-12 row justify-content-center pb-0">
                        <div className={"col-12 row justify-content-center py-5"}>
                            <div className={"col-12 col-lg-10 h10 order-2 order-lg-1"}>
                                <h1 className="text-center text-uppercase ">{ edit ? `editácia inzerátu` : `vytvorenie inzerátu`}</h1>
                            </div>
                            <div className={"col-12 col-lg-2  h10 order-1 order-lg-2"}>
                                <div className={"cross float-right"}>
                                    <svg onClick={close} className="ml-3" style={{transform:"scale(.8)"}} width="42" height="42" viewBox="0 0 42 42"><path d="M42,2.467,23.467,21,42,39.534,39.533,42,21,23.468,2.467,42,0,39.534,18.533,21,0,2.467,2.467,0,21,18.534,39.533,0Z" transform="translate(0 -0.001)" fill="#2c393f"/></svg>
                                </div>
                            </div>

                            <div className="row justify-content-center col-12 h90 pt-5 order-3">
                                <div className="col-xl-3 col-lg-6 pr-3">
                                    <div className={"border-r pt-2 justify-content-center row branches"}>
                                        <div className="branch py-2  mt-1 mb-5 px-4 shadow col-6 col-lg-8 col-xl-11 text-uppercase ml-4 ml-lg-0">
                                            <span className={`float-left  bold  ${brancheType ? `colorful-text` : ``}`} onClick={()=>changeType(true)}>
                                                fulltime
                                            </span>
                                            <span className={`float-right  bold  ${brancheType ? `` : `colorful-text` }`} onClick={()=>changeType(false)}>
                                                freetime
                                            </span>
                                        </div>
                                        <div className="list row justify-content-start col-11 col-xl-12 text-uppercase text-center d-lg-flex d-inline scroll ml-2 ml-lg-0 ">
                                            {
                                                JSON.parse(localStorage.branches).map(({id, name, free_time}) => {
                                                    if((brancheType && free_time === 0) || (!brancheType && free_time === 1)){
                                                        return(
                                                            <div className={`py-2 mx-3 mt-1 mb-3 px-4 shadow col-lg-10 col-auto ${branches.includes(id) ? `submit-button sign-in-button` : `branch`}`} onClick={() =>handleWork(id)}>
                                                        <span className={`${branches.includes(id) ? `` : `colorful-text`}`}>
                                                            {name}
                                                        </span>
                                                            </div>
                                                        )
                                                    }

                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-9 col-lg-6 text-uppercase pt-5 row justify-content-center">
                                    <input className="col-11 px-3 my-2 my-xl-0"
                                           type="text"
                                           placeholder="Aké povolanie vyhľadávate ?"
                                           onChange={e => setOffer({...offer, title : e.target.value})}
                                           value={edit ? (offer.title ? offer.title : ``) : (offer !== null ? offer.title : ``)}
                                    />
                                    <Tags addTags={(list) => setTags(list)} list={tags}/>
                                    <textarea className="col-11 px-3 py-3 my-2 my-xl-0" cols="30" rows="5" placeholder="Pridajte popis a podmienky práce" onChange={e => setOffer({...offer, description : e.target.value})}
                                              value={edit ? (offer.description ? offer.description : ``) : (offer !== null ? offer.description : ``)}></textarea>
                                    <div className="col-11 row justify-content-between p-0 pt-4">
                                        <input className="col-xl-3 col-lg-12 px-3 my-2 my-xl-0"
                                               type="text" placeholder="Zadajte miesto práce"
                                               onChange={e => setOffer({...offer, address : e.target.value})}
                                               value={edit ? (offer.address ? offer.address : ``) : (offer !== null ? offer.address : ``)}
                                        />

                                        <input className="col-xl-3 col-lg-12 px-3 my-2 my-xl-0"
                                               type="date" placeholder="Zadajte dátum nástupu"
                                               onChange={e => setOffer({...offer, date : e.target.value})}
                                               value={edit ? (offer.date ? offer.date : ``) : (offer !== null ? offer.date : ``)}
                                        />

                                        <input className="col-xl-3 col-lg-12 px-3 my-2 my-xl-0"
                                               type="text" placeholder="Zadajte plat"
                                               onChange={e => handleSalary(e.target.value)}
                                               value={edit ? (offer.salary ? offer.salary : ``) : (offer !== null ? offer.salary : ``)}
                                        />
                                    </div>

                                    <button className="my-2 mb-3 submit-button sign-in-button px-5 d-block text-uppercase py-3 py-xl-1" onClick={submit}>
                                        <span> { edit ? 'uložiť' : 'vytvoriť'}  <span className={"strong"}>{ edit ? 'zmeny !' : 'inzerát !'}</span></span>
                                    </button>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

};
