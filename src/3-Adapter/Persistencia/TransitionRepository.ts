import { ITransitionRepository } from "../../2-Domain/Core/Interfaces/Transition/ITransitionRepository";

export class TransitionRepository implements ITransitionRepository{


    searchStatus(numberRequest: string): StatusTransition {
        throw new Error("Method not implemented.");
    }


}