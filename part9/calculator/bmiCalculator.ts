
const calculateBmi = (height: number, weight: number): string => {
    height = height / 100
    const bmi = weight / (height * height);

    if (bmi >= 40){
        return "Obese Class III (Very severely obese)";
    } else if (bmi >= 35) {
        return "Obese Class II (Severely obese)";
    } else if (bmi >= 30) {
        return "Obese Class I (Moderately obese)";
    } else if (bmi >= 25) {
        return "Overweight";
    } else if (bmi >= 18.5) {
        return "Normal (healthy weight)";
    } else if (bmi >= 16) {
        return "Underweight";
    } else if (bmi >= 15) {
        return "Severely underweight";
    } else if (bmi < 15) {
        return "Very severely underweight";
    }
}

interface MultiplyValues {
    value1: number;
    value2: number;
  }

const parse = (args: Array<string>): MultiplyValues => {
    if (args.length > 4) throw new Error("Too many arguments.");
    if (args.length < 4) throw new Error("Not enough arguments.");

    if ( !isNaN(Number(args[2])) && !isNaN(Number(args[3])) ) {
        return {
         value1: Number(args[2]),
         value2: Number(args[3])
        }      
    } else {
        throw new Error("Arguments must be numbers.");
    }
}

try {
    const {value1, value2} = parse(process.argv);
    console.log(calculateBmi(value1, value2))
} catch (error) {
    console.log(error.message)
}