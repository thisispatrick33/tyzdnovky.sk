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
            <h1 className={`col-12 text-center`}>registrácia<span>.</span></h1>
            <div className={`content-frame row col-10 shadow rounded p-0`}>
                <div className="row side-bar col-3 m-0">
                    {
                        data.type ? Object.values(data).map(function(value, index) {
                            return <div className={`col-12`}>{value}</div>;
                        }) : "logo"
                    }
                    {
                        categories ? categories.map(category => <div>{category.value} {category.practise}</div>) : ``
                    }
                </div>
                <form className="row col-9 m-0">
                    {(() => {
                        switch (slide) {
                        case 1 : return <div>koho registrujeme ?</div>;
                        case 2 : return <div>všeobecné informácie</div>;
                        case 3 : return <div>doplňujuce informácie</div>;
                    }
                    })()}
                    {(() => {
                        switch(slide) {
                            case 1 :
                                return <div className={'data col-12 row'}>
                                    <div className={`col-12`} onClick={() => choose(1)}>firma</div>
                                    <div className={`col-12`} onClick={() => choose(2)}>jednotlivec</div>
                                    <div className={`col-12`} onClick={() => choose(3)}>skupina / kolega</div>
                                </div>;
                            case 2 :
                                return <div className={`col-12 row`}>
                                            <div className="field col-6">
                                                <input
                                                    id={`firstName`}
                                                    type={`text`}
                                                    name={`firstName`}
                                                    placeholder={data.type === 1 ? `Zadajte názov firmy` : `Napíšte vaše meno`}
                                                    onChange={(e) => setData({ ...data, firstName : e.target.value})}
                                                    value={data.firstName ? data.firstName : ``}
                                                />
                                                <label htmlFor="firstName">{data.type === 1 ? `názov` : `meno`}</label>
                                            </div>
                                            <div className="field col-6">
                                                <input
                                                    id={`lastName`}
                                                    type={`text`}
                                                    name={`lastName`}
                                                    placeholder={data.type === 1 ? `Zadajte ičo firmy` : `Napíšte vaše priezvisko`}
                                                    onChange={(e) => setData({ ...data, lastName : e.target.value})}
                                                    value={data.lastName ? data.lastName : ``}
                                                />
                                                <label htmlFor={"lastName"}>{data.type === 1 ? `ičo` : `priezvisko`}</label>
                                            </div>
                                            <div className="field col-6">
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
                                            <div className="field col-6">
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
                                            return <div className={`col-12 row`}>
                                                    {categories.map((input,i) => {
                                                        return   <div key={i} className={`row col-12`}>
                                                            <div className="field col-9">
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
                                                    <div className="add col-12" onClick={() => handleAdd()}>+ pridat</div>
                                                    <div className="field col-3">
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
                                                    {
                                                        data.type !== 1 ? <div>
                                                            <p>jazykove shopnosti</p>
                                                            <ul>
                                                                {lan.map((language, i) => {
                                                                    return <li onClick={() => addLanguage(language,i)}>{language}</li>
                                                                })}
                                                            </ul>
                                                        </div> : ``
                                                    }
                                                {
                                                    data.type !== 1 ? <div>
                                                        <p onClick={() => setData({...data, driving_licence : (data.driving_licence === undefined ? true : !data.driving_licence) } )}>vodicak</p>
                                                        <ul>
                                                            {lan.map((language, i) => {
                                                                return <li onClick={() => addLanguage(language,i)}>{language}</li>
                                                            })}
                                                        </ul>
                                                    </div> : ``
                                                }
                                            </div>;


                        }
                    })()}
                    <div className="navigators col-12">
                        <div onClick={() => setSlide(slide-1)} disabled={slide - 1 < 1}>prev</div>
                        <div onClick={() => slide + 1 > 3 ? submit() : setSlide(slide+1) } disabled={slide + 1 > 3}>next</div>
                    </div>
                </form>
            </div>
        </div>
    )

};
