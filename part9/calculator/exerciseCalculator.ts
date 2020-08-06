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
    const trainingDays: number = days.filter(d => d === 0).length

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))