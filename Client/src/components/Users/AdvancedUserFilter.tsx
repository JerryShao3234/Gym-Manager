import * as React from 'react';
import { useState, useEffect } from 'react';
import { MembershipType } from './Users';

export interface IAdvancedUserFilterProps {
    setFilter: React.Dispatch<React.SetStateAction<any>>
}

export function AdvancedUserFilter ({setFilter}: IAdvancedUserFilterProps) {
    const [proChecked, setProChecked] = useState(true)
    const [basicChecked, setBasicChecked] = useState(true)

    useEffect(() => {
        if(proChecked && basicChecked) {
            setFilter(null)
        } else if (!proChecked && !basicChecked) {
            alert("One membership checkbox should be checked off.")
            setBasicChecked(true)
            setProChecked(true)
        } else {
            proChecked ? setFilter({membershipType: MembershipType.PRO}) : setFilter({membershipType: MembershipType.BASIC})
        }
        
    }, [proChecked, basicChecked, setFilter])
    return (
    <div>
        Show all members with Basic and/or Pro memberships: 
        <label>
            <input 
                type="checkbox"
                checked = {basicChecked}
                onChange = {() => {
                    setBasicChecked(!basicChecked)
                    
                }} 
            /> 
            Basic
        </label>
        <label>
            <input 
                type="checkbox" 
                checked = {proChecked}
                onChange = {() => {
                    console.log('hhere')
                    setProChecked(!proChecked)
                }}
            /> 
            Pro
        </label>
    </div>
    );
}
