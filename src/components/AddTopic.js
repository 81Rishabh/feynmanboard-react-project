import React, { createRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Tooltip from '../Tooltip';
import { addTopicApi } from '../utils/apiUtils';

function AddTopic() {
    const [topicName, setTopicName] = useState()
    const [state, setValue] = useState({ value: "" });
    const [selectedText, setSelectedText] = useState([])
    const [topicDescription, setTopicDescription] = useState([])
    const myRef = createRef()
    const [data, setData] = useState()
    const [finalList, setFinalList] = useState([])


    // calculate percentage accorging to points
    const findPercentage =() =>{
        let sum = 0
        finalList.map(item => {
            sum += Number(item.points)
        });
        // percentage formula
        const percent = (sum/((topicDescription.length-1)*4))*100
        // console.log(sum, topicDescription, percent);
        return percent
    }


    // save the data into backend using api
    const onAddTopic =async() =>{

        const topicData = {
            topicName: topicName,
            textArray: finalList,
            percentage: findPercentage()
        }

        const apiResponce = await addTopicApi(topicData)
        if (apiResponce.status === 200) {
            // success(apiResponce.data.message)
            console.log("responcemessage", apiResponce.data.message);
        } else {
            console.log("error");
        }
        
    }

    useEffect(() =>{
        
        if(data && data.length > 0){
            // const updatedData = 
            // console.log(updatedData);
            setFinalList([...finalList, {myText: data[0], myAction: data[1], points: data[2]}])
        }
        // console.log(finalList.length);
    },[data])


    const onTopicHandle=(event) =>{
        setTopicName(event.target.value)
        // console.log(topicName);
    }


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


            <input 
            type='text'
            placeholder='Enter topic'
            name='topicName'
            onChange={(e) =>onTopicHandle(e)} />


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

            <button onClick={() => onAddTopic()}>Add</button>


        </div>
    )
}

export default AddTopic