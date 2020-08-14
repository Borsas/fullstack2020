import React from "react";
import {CoursePart} from "../index";

const Part: React.FC<{part: CoursePart }> = ({part}) => {
    const values = Object.values(part);
    return (
        <div>
            {values.map(e => {
                return e + " "
            })}
        </div>
    )
};

export default Part;