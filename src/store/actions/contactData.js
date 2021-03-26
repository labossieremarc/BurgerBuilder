import * as actionType from './actionTypes';


export const updateInput = (update, disableButton) => {
    return {
        type: actionType.INPUT_CHANGE,
        update,
        disableButton
    }
}