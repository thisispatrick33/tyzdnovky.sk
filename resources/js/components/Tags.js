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
        let valuex = value;

        let tag = valuex.trim();

        tag = tag.replace(/,/g, "");

        if (!tag) {
            return;
        }
        addTags([...tags, tag]);
        setTags([...tags, tag]);
        setValue('');
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
        <div className="form">
            <div className="tags">
                    {tags.map((tag, i) => (
                       <div className={'tag'}>
                            {tag}
                       </div>
                    ))}
                <input
                    type="text"
                    placeholder="Add tag..."
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