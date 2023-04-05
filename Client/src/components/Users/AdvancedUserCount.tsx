import * as React from 'react';
import { useEffect } from 'react';

export interface IAdvancedUserCountProps {
  memberCountInfo: any
}

export function AdvancedUserCount ({memberCountInfo}: IAdvancedUserCountProps) {

    return (
      <div>
        {memberCountInfo.length === 2 ? (
          `Number of ${memberCountInfo[0].type} and ${memberCountInfo[1].type} memberships: ${memberCountInfo[0].numMembers + memberCountInfo[1].numMembers}`  
        ) : (
          `Number of ${memberCountInfo[0].type} memberships: ${memberCountInfo[0].numMembers}`  
        )}  
        {/* {memberCountInfoNumber of members {memberCountInfo}: {memberCount.toString()}} */}
      </div>
    );
}
