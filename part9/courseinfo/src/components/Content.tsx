import React from "react";
import Part from "./Part";
import {CoursePart} from "../index";

interface ContentProps {
    courseParts: CoursePart[];
} 

const Content:React.FC<ContentProps> = ({courseParts}) => {

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };


    return (
        <div>
            {courseParts.map(part => {
                switch (part.name) {
                    case "Fundamentals":
                        return <Part key={part.name} part={part}/>
                    case "Using props to pass data":
                        return <Part key={part.name} part={part}/>
                    case "Deeper type usage":
                        return <Part key={part.name} part={part}/>
                    case "I dont like this":
                        return <Part key={part.name} part={part}/>
                    default:
                        return assertNever(part);
                }
            })}
        </div>
    )
}

export default Content;