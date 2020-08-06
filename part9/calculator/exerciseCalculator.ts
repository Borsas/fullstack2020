interface excerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (days: Array<number>, target: number): excerciseResult => {
    const trainingDays: number = days.filter(d => d !== 0).length

    const average:number = days.reduce((a: number, b: number) => {return a + b}, 0) / days.length;

    const calc = (): number => {
        if (target - average <= 0) {
            return 3;
        } else if (target - average <= 0.1) {
            return 2;
        } else if (target - average <= 0.5) {
            return 1;
        } else {
            return 0;
        }
    }
    const rating: number = calc()

    const description = (): string => {
        switch (rating) {
            case 3:
                return "Excellent job!"
            case 2:
                return "Not too bad but could be better"
            case 1:
                return "Need to work more!"
            case 0:
                return "Did you even try?"
            default:
                break;
        }
    }

    let result: excerciseResult = <excerciseResult> {
        periodLength: days.length,
        trainingDays,
        success: average >= target ? true : false,
        rating,
        ratingDescription: description(),
        target,
        average
    } 

    return result
}

interface DaysAndTarget {
    days: Array<number>;
    target: number;
  }

const parseArgs = (args: Array<string>): DaysAndTarget => {
    if (args.length < 4) throw new Error("Not enough arguments.");

    let days: Array<number> = [];
    let target: number = 0;

    try {
        if (!isNaN(Number(args[2]))) {
            target = Number(args[2])
        }
    
        for (let i = 3; i < args.length; i++) {
            if (!isNaN(Number(args[i]))) {
                days.push(Number(args[i]));
            }
        }
    } catch(err) {
            throw new Error("Invalid arguments, must be numbers")
        }
    return {days, target}
    
}

try {
    const {days, target} = parseArgs(process.argv);
    console.log(calculateExercises(days, target))
} catch (error) {
    console.log(error.message)
}
