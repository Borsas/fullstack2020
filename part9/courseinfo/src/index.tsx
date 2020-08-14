import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

interface CourseDescription extends CoursePartBase {
    description: string;
}
  
  interface CoursePartOne extends CourseDescription{
    name: "Fundamentals";
  }
  
  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
  interface CoursePartThree extends CourseDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }

  interface CoursePartFour extends CourseDescription {
      name: "I dont like this";
  }
  
export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

ReactDOM.render(<App />, document.getElementById("root"));