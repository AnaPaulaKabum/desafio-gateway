import { StatusTransition } from "../../3-Domain/Core/Interfaces/Transition/Enum/StatusTransition.js";
import { ITransitionRepository } from "../../3-Domain/Core/Interfaces/Transition/ITransitionRepository.js";


export class TransitionRepository implements ITransitionRepository{

    searchStatus(numberRequest: string): StatusTransition {
       
        return StatusTransition.READY;
    }
}