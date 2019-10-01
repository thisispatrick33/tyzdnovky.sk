import React, {useState} from 'react';

export const RegistrationForm = () => {
    const [slide, setSlide] = useState(1);
    const [data,setData] = useState({});
    const [categories,setCategories] = useState([{ value: null }]);
    const lan = ["slovensky", "nemecky", "anglicky", "holandsky", "francúzsky"];
    const [languages, setLanguages] = useState([]);
    const choose = (value) => {
        setData({type : value});
        setCategories([{ value: null }]);
        setSlide(slide + 1);
    };
    const submit = () => {
        data[`categories`] = categories;
        console.log(data);
    }
    const addLanguage = (value,i) => {
        let values = [...languages];
        values.includes(value) ? values = values.filter( x =>  x !== value) : values.push(value);
        setLanguages(values);
        setData({...data,languages : values})

    };
    function handleChange(i, event,type) {
        const values = [...categories];
        if(type === "c"){
            values[i].value = event.target.value;
        }else{
            values[i].practise = event.target.value;
        }
        setCategories(values);
    }

    function handleAdd() {
        const values = [...categories];
        values.push({ value: null });
        setCategories(values);
    }
    return (
        console.log(data),
        <div className={`registration-form container-fluid row m-0 p-0 justify-content-center`}>
            <h1 className={`col-12 text-center main-title my-4`}>registrácia<span className={`doth`}>.</span></h1>
            <div className={`content-frame row col-10 shadow rounded p-5`}>
                <div className="row side-bar col-3 m-0">
                    {
                        data.type ?Object.keys(data).map(function(key, index) {
                            return <div>{key} - {data[key]}</div>
                        }) : "logo"
                    }
                    {
                        categories ? categories.map(category => <div>{category.value} {category.practise}</div>) : ``
                    }
                </div>
                <form className="row col-9 m-0 align-items-start">
                    {(() => {
                        switch (slide) {
                        case 1 : return <div className={`col-12 title mb-3`}>koho registrujeme ?</div>;
                        case 2 : return <div className={`col-12 title mb-3`}>všeobecné informácie<span className={`doth`}>.</span></div>;
                        case 3 : return <div className={`col-12 title mb-3`}>doplňujúce informácie<span className={`doth`}>.</span></div>;
                    }
                    })()}
                    {(() => {
                        switch(slide) {
                            case 1 :
                                return <div className={'data col-12 row'}>
                                    <div className={`col-4`} onClick={() => choose(1)}>firma</div>
                                    <div className={`col-4`} onClick={() => choose(2)}>jednotlivec</div>
                                    <div className={`col-4`} onClick={() => choose(3)}>skupina / kolega</div>
                                </div>;
                            case 2 :
                                return <div className={`col-12 row align-items-start`}>
                                            <div className="field col-6 p-0">
                                                <input
                                                    id={`firstName`}
                                                    type={`text`}
                                                    name={`firstName`}
                                                    placeholder={data.type === 1 ? `Zadajte názov firmy` : `Napíšte vaše meno`}
                                                    onChange={(e) =>  setData(data.type === 1 ? { ...data, name : e.target.value} : { ...data, firstName : e.target.value})}
                                                    value={data.type === 1 ?(data.name ? data.name : `` ) : (data.firstName ? data.firstName : `` )}
                                                />
                                                <label htmlFor="firstName">{data.type === 1 ? `názov` : `meno`}</label>
                                            </div>
                                            <div className="field col-6 p-0">
                                                <input
                                                    id={`lastName`}
                                                    type={`text`}
                                                    name={`lastName`}
                                                    placeholder={data.type === 1 ? `Zadajte ičo firmy` : `Napíšte vaše priezvisko`}
                                                    onChange={(e) =>  setData(data.type === 1 ? { ...data, ico : e.target.value} : { ...data, lastName : e.target.value})}
                                                    value={data.type === 1 ?(data.ico? data.ico : `` ) : (data.lastName ? data.lastName : `` )}
                                                />
                                                <label htmlFor={"lastName"}>{data.type === 1 ? `ičo` : `priezvisko`}</label>
                                            </div>
                                            <div className="field col-6 p-0">
                                                <input
                                                    id={`phone`}
                                                    type={`text`}
                                                    name={`phone`}
                                                    placeholder={`Zadajte váš telefón`}
                                                    onChange={(e) => setData({ ...data, phone : e.target.value})}
                                                    value={data.phone ? data.phone : ``}
                                                />
                                                <label htmlFor={`phone`}>{`telefón`}</label>
                                            </div>
                                            <div className="field col-6 p-0">
                                                <input
                                                    id={`email`}
                                                    type={`email`}
                                                    name={`email`}
                                                    placeholder={`Zadajte váš email`}
                                                    onChange={(e) => setData({ ...data, email : e.target.value})}
                                                    value={data.email ? data.email : ``}
                                                />
                                                <label htmlFor={`email`}>{`email`}</label>
                                            </div>
                                </div>;
                            case 3 :
                                return <div className={`data-group-3 | col-12`}>
                                            <div className={`row p-0`}>
                                                <div className={`categories | col-12 | p-0`}>
                                                    {categories.map((input,i) => {
                                                        return <div key={i} className={`row col-12`}>
                                                                    <div className={`field ${ data.type === 1 ? `col-12` : `col-9` }`}>
                                                                        <input
                                                                            id={`category-${i}`}
                                                                            type={`text`}
                                                                            name={`category-${i}`}
                                                                            placeholder={`Zadajte váš odbor`}
                                                                            onChange={(e) => handleChange(i, e, "c")}
                                                                            value={categories[i].value}
                                                                        />
                                                                        <label htmlFor={`category-${i}`}>{`povolanie`}</label>
                                                               </div>
                                                                { data.type === 1 ? `` :
                                                                    <div className="field col-3">
                                                                        <input
                                                                            id={`practise-${i}`}
                                                                            type={`number`}
                                                                            name={`practise-${i}`}
                                                                            placeholder={`Počet rokov`}
                                                                            onChange={(e) => handleChange(i, e, "p")}
                                                                            value={categories[i].practise}
                                                                            max={`50`}
                                                                        />
                                                                        <label htmlFor={`practise-${i}`}>{`prax`}</label>
                                                                    </div>
                                                                }
                                                        </div>
                                                    })}
                                                </div>
                                                <div className="add col-12 mb-4" onClick={() => handleAdd()}>{ data.type === 1 ? `+ hľadáte viacero profesií?` : `+ ovládate viacero profesií ?`} </div>
                                                <div className={`date col-12 mb-4`}>
                                                    <div className="row p-0">
                                                        <div className="field col-12">
                                                            <input
                                                                id={`date`}
                                                                type={`date`}
                                                                name={`date`}
                                                                min={"2019-09-26"}
                                                                placeholder={`Vyberte vhodný dátum`}
                                                                onChange={(e) => setData({ ...data, ready : e.target.value})}
                                                                value={data.ready ? data.ready : ``}
                                                            />
                                                            <label htmlFor={`date`}>{`dátum nástupu`}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    data.type !== 1 ? <div className={`languages row col-12 mb-4`}>
                                                        <div className="col-12 row justify-content-center">
                                                            <div className="col-12 pl-4 title-small">jazykové znalosti</div>
                                                                <div className="row col-11 pl-4 p-2 justify-content-between">
                                                                    {lan.map((language, i) => {
                                                                        return (
                                                                            <div className={`row col-2 align-items-center p-0`} onClick={() => addLanguage(language,i)}>
                                                                                <div className="col-1 p-0">
                                                                                    <div className={`${languages.includes(language) ? `square-filled` : `square`}`}></div>
                                                                                </div>
                                                                                <p className={`mb-0 ml-2 col-10 p-0`} style={{color : languages.includes(language) ? `#00C7C7` : ``}}>{language}</p>
                                                                            </div>);
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div> : ``
                                                }

                                                {
                                                    data.type !== 1 ?
                                                        <div className={`driving_licence row col-12 my-4`}>
                                                            <div className="col-12 row justify-content-center">
                                                                <div className="col-12 pl-4 title-small">Ste držiteľom vodické oprávnenie pre skupinu b?</div>
                                                                <div className={`row col-12 pl-4 align-items-center`} onClick={() => setData({...data, driving_licence : (data.driving_licence === undefined ? true : !data.driving_licence) } )}>
                                                                    <div className="col-auto ml-3 p-0">
                                                                        <div className={`${(data.driving_licence === undefined || data.driving_licence === false  ? `circle` : `circle-filled`)}`}></div>
                                                                    </div>
                                                                    <p className={`col-11 mb-0`}>Áno, som</p>
                                                                </div>
                                                            </div>
                                                        </div> : ``
                                                }
                                            </div>
                                            </div>



                        }
                    })()}
                    { slide <= 1 ? `` :
                        <div className="navigators row col-12">
                            <div className={`col-6`} onClick={() => setSlide(slide-1)}>prev</div>
                            <div className={`col-6`} onClick={() => slide + 1 > 3 ? submit() : setSlide(slide+1) }>{slide + 1 > 3 ? "submit" : "next" }</div>
                        </div>
                    }
                </form>
            </div>
        </div>
    )

};
