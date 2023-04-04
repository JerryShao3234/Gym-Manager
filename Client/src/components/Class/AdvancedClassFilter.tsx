import * as React from 'react';
import { ChangeEvent, useCallback, useState } from 'react';
import { SemanticClassificationFormat } from 'typescript';
import "./AdvancedClassFilter.scss"
export interface IAdvancedClassFilterProps {
    setFilter: React.Dispatch<React.SetStateAction<any>>;
}

export function AdvancedClassFilter ({setFilter}: IAdvancedClassFilterProps) {
    const [classWithExerciseInput, setClassWithExerciseInput] = useState<string>("")
    
    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setClassWithExerciseInput(event.target.value)
    }, [])

    const handleSubmit = useCallback(() =>{
        setFilter(classWithExerciseInput)
    }, [setFilter, classWithExerciseInput])

    return (
    <div className = "add-class-filter">
        <div className="">Select classes that teach:</div>
        <div className="add-class-filter_input-button-container">
            <input type="text" value={classWithExerciseInput} onChange={handleInputChange} />
            <button className = "btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
    </div>
    );
}
