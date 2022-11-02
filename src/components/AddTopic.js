import React, { createRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Tooltip from '../Tooltip';

function AddTopic() {
    const [state, setValue] = useState({ value: "" });
    const [selectedText, setSelectedText] = useState([])
    const [topicDescription, setTopicDescription] = useState([])
    const myRef = createRef()
    const [data, setData] = useState()
    const [finalList, setFinalList] = useState([])

    useEffect(() =>{
        
        if(data && data.length > 0){
            const updatedData = {myText: data[0], myAction: data[1], points: data[2]}
            console.log(updatedData);
            setFinalList([...finalList, {updatedData: updatedData }])
        }
        console.log(finalList.length);
    },[data])


    const inputsHandler = (event) => {
        let textArray = (event.target.value).split('-').join(', ').split('.').join(', ').split('{').join(', ').split('}').join(', ').split('(').join(', ').split(')').join(', ').split('[').join(', ').split(']').join(', ').split('/').join(', ').split(',')
        setTopicDescription(textArray)
        setValue({ value: event.target.value })
    }


    return (
        <div>
            {/* Heading of this page */}
            <div>AddTopic</div>

            {/* move to dashboard */}
            <Link to='/dashboard'>Dashboard</Link>

            {/* TextArea */}
            <textarea
                type="text"
                ref={myRef}
                rows={10}
                cols={60}
                onChange={inputsHandler}
                value={state.value} />

            {/* Button */}
            <button onClick={() => {
                let textVal = myRef.current;
                let cursorStart = textVal.selectionStart;
                let cursorEnd = textVal.selectionEnd;
                let stext = state.value.substring(cursorStart, cursorEnd)
                console.log(stext)
                setSelectedText([...selectedText, { text: stext }]);

            }}>Select and Give Action</button>

            {/* Display all selected item with actions */}
            {selectedText && selectedText.length > 0
                ? selectedText.map((i, index) => <li key={index}>
                    <Tooltip
                        setHoverPosition='top'
                        setDataValue={setData}
                        text={i.text} />
                    {finalList && finalList.length>0 ?finalList.map((i,index) => console.log(index+1,i)): []}
                    
                </li>)
                : []
            }

        </div>
    )
}

export default AddTopic