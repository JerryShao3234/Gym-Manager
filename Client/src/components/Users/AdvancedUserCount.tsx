import * as React from 'react';

export interface IAdvancedUserCountProps {
  memberCount: Number
}

export function AdvancedUserCount ({memberCount}: IAdvancedUserCountProps) {
    return (
      <div>
        Number of members: {memberCount.toString()}
      </div>
    );
}
