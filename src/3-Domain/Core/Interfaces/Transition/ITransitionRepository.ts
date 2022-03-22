import { StatusTransition } from "./Enum/StatusTransition";

export interface ITransitionRepository{

    searchStatus(numberRequest: string):StatusTransition;
}