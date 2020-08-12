import diagnoseData from "../data/diagnosesData";
import { Diagnose } from "../types";

const getEntries = (): Array<Diagnose> => {
    return diagnoseData;
};


export default {
    getEntries
};