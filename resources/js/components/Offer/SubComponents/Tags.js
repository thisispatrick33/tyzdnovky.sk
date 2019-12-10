import React, {useEffect, useState} from 'react';

export const Tags = ({addTags = f => f, list}) => {
    const ENTER_KEY = 13;
    const COMMA_KEY = 188;
    const BACKSPACE_KEY = 8;
    const [tags, setTags] = useState([]);
    const [value, setValue] = useState('');

    const handleChange = e => setValue(e.target.value);

    useEffect(() => {
        setTags(list)
    }, [list]);

    const handleKeyUp = e => {
        const key = e.keyCode;
        if (key === ENTER_KEY || key === COMMA_KEY) {
            addTag();
        }
    };

    const handleKeyDown = e => {
        const key = e.keyCode;
        if (key === BACKSPACE_KEY && !value) {
            editPrevTag();
        }
    };

    const addTag = () => {
        if(tags.length < 10){
            let valuex = value;

            let tag = valuex.trim();

            tag = tag.replace(/,/g, "");

            if (!tag) {
                return;
            }
            addTags([...tags, tag]);
            setTags([...tags, tag]);
            setValue('');
        }

    };

    const editPrevTag = () => {
        let tagx = tags;

        const tag = tagx.pop();
        addTags(tagx);
        setTags(tagx);
        setValue(tag);
    };

    if(tags == undefined){
        return "loading"
    }

    return (
        <div className="ml-4 tags col-11  my-2 my-xl-0 mx-0 px-0"
            
        >
            <div className="input px-3 row align-items-start col-12"
            style={{
                height:"auto"
            }}>
                    {tags.map((tag, i) => (
                       <span className="col-auto input-tag text-capitalize mt-1 px-2 shadow mx-2">
                            {tag}
                       </span>
                    ))}
                    
                <input
                    className=""
                    type="text"
                    placeholder="Pridajte tagy… napríklad : záhrada, Nemecko, les"
                    style={{
                        width:"100%"
                    }}
                    value={value}
                    onChange={(e) => handleChange(e)}
                    className="tag-input"
                    onKeyUp={(e) => handleKeyUp(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
            </div>
        </div>
    );
};