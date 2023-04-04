import * as React from 'react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { SemanticClassificationFormat } from 'typescript';
import "./AdvancedClassFilter.scss"
export interface IAdvancedClassFilterProps {
    setFilter: React.Dispatch<React.SetStateAction<any>>;
}

export function AdvancedClassFilter ({setFilter}: IAdvancedClassFilterProps) {
    const [classWithExerciseInput, setClassWithExerciseInput] = useState<string>("")
    const [nameChecked, setNameChecked] = useState(true)
    const [priceChecked, setPriceChecked] = useState(true)
    const [startTimeChecked, setStartTimeChecked] = useState(true)
    const [endTimeChecked, setEndTimeChecked] = useState(true)
    const [instructorNameChecked, setinstructorNameChecked] = useState(true)
    const [classID, setClassIDChecked] = useState(true)
    const [exerciseNameChecked, setExerciseNameChecked] = useState(true)

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setClassWithExerciseInput(event.target.value)
    }, [])

    useEffect(() => {
        if(!nameChecked && !priceChecked && !startTimeChecked && !endTimeChecked && !instructorNameChecked && !classID && !exerciseNameChecked) {
            alert("At least one checkbox should be checked off.")
            setNameChecked(true)
            setPriceChecked(true)
            setStartTimeChecked(true)
            setEndTimeChecked(true)
            setinstructorNameChecked(true)
            setClassIDChecked(true)
            setExerciseNameChecked(true)
        } else {
            setFilter({
                name: nameChecked,
                price: priceChecked,
                startTime: startTimeChecked,
                endTime: endTimeChecked,
                instructorName: instructorNameChecked,
                classID: classID,
                exerciseName: exerciseNameChecked,
                classWithExerciseInput: classWithExerciseInput //need special keyword
            })
        }
    }, [nameChecked, priceChecked, startTimeChecked, endTimeChecked, instructorNameChecked, classID, exerciseNameChecked])

    const handleSubmit = useCallback(() =>{
        setFilter({
            name: nameChecked,
            price: priceChecked,
            startTime: startTimeChecked,
            endTime: endTimeChecked,
            instructorName: instructorNameChecked,
            classID: classID,
            exerciseName: exerciseNameChecked,
            classWithExerciseInput: classWithExerciseInput
        })
    }, [classWithExerciseInput, setFilter, nameChecked, priceChecked, startTimeChecked, endTimeChecked, instructorNameChecked, classID, exerciseNameChecked])

    return (
    <div className = "add-class-filter">
        <div className="">Select classes that teach:</div>
        <div className="add-class-filter_input-button-container">
            <input type="text" value={classWithExerciseInput} onChange={handleInputChange} />
            <button className = "btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
        <div className="check-box-container">
            <label>
                <input 
                    type="checkbox"
                    checked = {nameChecked}
                    onChange = {() => {
                        setNameChecked(!nameChecked)
                    }}
                /> 
                Name
            </label>
            <label>
                <input 
                    type="checkbox" 
                    checked = {priceChecked}
                    onChange = {() => {
                        setPriceChecked(!priceChecked)
                    }}
                /> 
                Price
            </label>
            <label>
                <input 
                    type="checkbox"
                    checked = {startTimeChecked}
                    onChange = {() => {
                        setStartTimeChecked(!startTimeChecked)
                    }}
                /> 
                Start time
            </label>
            <label>
                <input 
                    type="checkbox"
                    checked = {endTimeChecked}
                    onChange = {() => {
                        setEndTimeChecked(!endTimeChecked)
                    }}
                /> 
                End time
            </label>
            <label>
                <input 
                    type="checkbox"
                    checked = {instructorNameChecked}
                    onChange = {() => {
                        setinstructorNameChecked(!instructorNameChecked)
                    }}
                /> 
                Instructor name
            </label>
            <label>
                <input 
                    type="checkbox"
                    checked = {classID}
                    onChange = {() => {
                        setClassIDChecked(!classID)
                    }}
                /> 
                Class ID
            </label>
            <label>
                <input 
                    type="checkbox"
                    checked = {exerciseNameChecked}
                    onChange = {() => {
                        setExerciseNameChecked(!exerciseNameChecked)
                    }}
                /> 
                Exercise Name
            </label>
        </div>
    </div>
    );
}
