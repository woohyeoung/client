import {
    SELECTED_CHANGE_SAVE,
    ITEM_CHANGE_SAVE,
    LIST_ITEM_ROOM_DELETE,
    LIST_ITEM_VEHICLE_DELETE,
    PROFILE_CHANGE_SAVE,
    GO_ADMIN_PAGE,
    SELECTED_CHANGE_SAVE2,
    ALL_TIMER_MESSAGE,
    CHANGE_TIMER_MESSAGE,
    CHANGE_DELETE_ITEM_FLAG
} from '../actions/ChangeAction';

const initialState = {
    selected: 0,
    selected2: 1,
    roomItem: {},
    vehicleItem: {},
    deleteRoomId: -1,
    deleteVehicleId: -1,
    profileChange: {},
    adminPage: false,
    allMessage: {
        message: '',
        message2: '',
        message3: '',
        message4: ''
    },
    changeCount: 0,
    changeDeleteCount: 0
};

export default function changeReducer(state = initialState, action) {
    switch (action.type) {
        case SELECTED_CHANGE_SAVE:
            return { ...state, selected: action.selected };
        case SELECTED_CHANGE_SAVE2:
            return { ...state, selected2: action.selected2 };
        case ITEM_CHANGE_SAVE:
            if (action.item && state.selected === 0) {
                return { ...state, roomItem: action.item };
            } else if (action.item && state.selected === 1) {
                return { ...state, vehicleItem: action.item };
            }
            return state;
        case LIST_ITEM_ROOM_DELETE:
            if (action.deleteId > 0) {
                return { ...state, deleteRoomId: action.deleteId };
            }
            return state;
        case LIST_ITEM_VEHICLE_DELETE:
            if (action.deleteId > 0) {
                return { ...state, deleteVehicleId: action.deleteId };
            }
            return state;
        case PROFILE_CHANGE_SAVE:
            return { ...state, profileChange: action.data };
        case GO_ADMIN_PAGE:
            return { ...state, adminPage: !state.adminPage };
        case ALL_TIMER_MESSAGE:
            return {
                ...state,
                allMessage: action.allMessage
            };
        case CHANGE_TIMER_MESSAGE:
            return {
                ...state,
                changeCount: initialState.changeCount + action.plus
            };
        case CHANGE_DELETE_ITEM_FLAG:
            return {
                ...state,
                changeDeleteCount: initialState.changeDeleteCount + action.plus
            };
        default:
            return state;
    }
}
