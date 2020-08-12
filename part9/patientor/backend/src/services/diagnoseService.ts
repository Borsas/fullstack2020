import diagnoseData from "../data/diagnosesData";
import { DiagnoseType } from "../types";

const getEntries = (): Array<DiagnoseType> => {
    return diagnoseData;
};


export default {
    getEntries
};