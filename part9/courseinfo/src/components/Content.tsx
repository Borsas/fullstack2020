import React from "react";

interface ContentProps {
    courseParts: Array<{name: string; exerciseCount: number;}>;
}

const Content:React.FC<ContentProps> = ({courseParts}) => {
    return (
        <div>
            {courseParts.map(part => {
                return <div key={part.name}>{part.name} {part.exerciseCount}</div>
                
            })}
        </div>
    )
}

export default Content;