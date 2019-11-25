import React, {useEffect, useState} from 'react';
import axios from "axios";

export const Advertisement = ({createAd = f =>f, region}) =>{

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    const [data, setData] = useState({});
    const [categories, setCategories] = useState([]);
    const [branches, setBranches] = useState([]);
    const [type, setType] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'api/register-additional',{
                    headers:{
                        "X-localization" : region,
                    }
                }
            );
            setCategories(result.data.branches);

        };
        fetchData();
    }, [region]);

    const submit = () => {
        createAd({...data, branches: branches});
    };

    const handleWork = (value) => {
        let array = [...branches];
        array.includes(value) ? array=array.filter(work => value !== work) : (branches.length >1 ? "" : array.push(value));
        if(array.length==0){
            setType("");
        }
        if(array.length==1){
            if(categories[array[0]].free_time==0){
                setType("full");
            }
            else {
                setType("free");
            }
        }
        setBranches(array);

    };


    const handleSalary=(salary)=>{
        let tmp = salary.split("");
        let salary_filtered = '';
        let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", '.', ','];
        console.log(tmp);
        for (let i =0; i<tmp.length; i++){
            if(tmp[i]=="."||tmp[i]==","){
                salary_filtered+=tmp[i];
            }
            if(tmp[i] in numbers){
                salary_filtered+=tmp[i];
            }
        }
        setData({...data, salary: salary_filtered});
    };

    return(
        <div>
            <input
                id={`title`}
                type={`text`}
                name={`title`}
                placeholder="title"
                onChange={(e) => setData({...data, title: e.target.value})}
                value={data.title ? data.title  : ``}
                className={` pl-xl-2 pl-lg-2 pl-md-2 pl-sm-3 pl-3 py-2 col-xl-10 col-lg-10 col-md-10 col-12`}
            />
            <input
                id={`description`}
                type={`text`}
                name={`description`}
                placeholder="description"
                onChange={(e) => setData({...data, description: e.target.value})}
                value={data.description ? data.description  : ``}
                className={` pl-xl-2 pl-lg-2 pl-md-2 pl-sm-3 pl-3 py-2 col-xl-10 col-lg-10 col-md-10 col-12`}
            />
            <input
                id={`when`}
                type={`date`}
                name={`when`}
                placeholder="when"
                min={today}
                onChange={(e) => setData({...data, when: e.target.value})}
                value={data.when ? data.when : ``}
                className={` pl-xl-2 pl-lg-2 pl-md-2 pl-sm-3 pl-3 py-2 col-xl-10 col-lg-10 col-md-10 col-12`}
            />
            <input
                id={`where`}
                type={`text`}
                name={`where`}
                placeholder="where"
                onChange={(e) => setData({...data, where: e.target.value})}
                value={data.where ? data.where  : ``}
                className={` pl-xl-2 pl-lg-2 pl-md-2 pl-sm-3 pl-3 py-2 col-xl-10 col-lg-10 col-md-10 col-12`}
            />
            <input
                id={`salary`}
                type={`text`}
                name={`salary`}
                placeholder="salary"
                onChange={(e) => handleSalary(e.target.value)}
                value={data.salary ? data.salary  : ``}
                className={` pl-xl-2 pl-lg-2 pl-md-2 pl-sm-3 pl-3 py-2 col-xl-10 col-lg-10 col-md-10 col-12`}
            />
            <h1>Fulltime</h1>
            {

                categories.map( ({id,free_time,name}) => {
                    if(free_time===0&&(type=="full"||type=="")){
                        return  <div className={`category col-auto mx-2 my-2 py-2 shadow-sm ${branches.includes(id) ? `on` : ``}`} onClick={() =>handleWork(id)}>
                            {name}
                        </div>;
                    }
                })
            }
            <h1>Freetime</h1>
            {
                categories.map( ({id,free_time,name}) => {
                    if(free_time===1&&(type=="free"||type=="")){
                        return  <div className={`category col-auto mx-2 my-2 py-2 shadow-sm `} onClick={() =>handleWork(id)}>
                            {name}
                        </div>;
                    }
                })
            }




            <button
                className={`submit-button sign-in-button col-xl-5 col-lg-6 col-md-9 col-11 text-center py-2 mb-5 mt-3 `}
                onClick={submit}><span>posli</span>
            </button>


        </div>

    );

};