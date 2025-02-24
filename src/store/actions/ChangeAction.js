export const SELECTED_CHANGE_SAVE = 'SELECTED_CHANGE_SAVE';
export const SELECTED_CHANGE_SAVE2 = 'SELECTED_CHANGE_SAVE2';
export const ITEM_CHANGE_SAVE = 'ITEM_CHANGE_SAVE';
export const LIST_ITEM_ROOM_DELETE = 'LIST_ITEM_ROOM_DELETE';
export const LIST_ITEM_VEHICLE_DELETE = 'LIST_ITEM_VEHICLE_DELETE';
export const ALL_TIMER_MESSAGE = 'ALL_TIMER_MESSAGE';
export const CHANGE_TIMER_MESSAGE = 'CHANGE_TIMER_MESSAGE';
export const CHANGE_DELETE_ITEM_FLAG = 'CHANGE_DELETE_ITEM_FLAG';

//오윤성
export const PROFILE_CHANGE_SAVE = 'PROFILE_CHANGE_SAVE';
export const GO_ADMIN_PAGE = 'GO_ADMIN_PAGE';

export const ChangeDeleteItemFlag = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: CHANGE_DELETE_ITEM_FLAG,
                plus: 1
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const ChangeTimerMessage = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: CHANGE_TIMER_MESSAGE,
                plus: 1
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const AllTimerMessage = (message) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ALL_TIMER_MESSAGE,
                allMessage: message
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const SelectedChangeSave = (selected) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SELECTED_CHANGE_SAVE,
                selected: selected
            });
        } catch (err) {
            console.log(err);
        }
    };
};
export const Selected2ChangeSave = (selected2) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SELECTED_CHANGE_SAVE2,
                selected2: selected2.value
            });
        } catch (err) {
            console.log(err);
        }
    };
};
export const ItemChangeSave = (item) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ITEM_CHANGE_SAVE,
                item: item
            });
        } catch (err) {
            console.log(err);
        }
    };
};
export const RoomItemDelete = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: LIST_ITEM_ROOM_DELETE,
                deleteId: id
            });
        } catch (err) {
            console.log(err);
        }
    };
};
export const VehicleItemDelete = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: LIST_ITEM_VEHICLE_DELETE,
                deleteId: id
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const ProfileChangeSave = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: PROFILE_CHANGE_SAVE,
                data: data
            });
        } catch (err) {
            console.log(err);
        }
    };
};
export const goAdminPage = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: GO_ADMIN_PAGE
            });
        } catch (err) {
            console.log(err);
        }
    };
};
