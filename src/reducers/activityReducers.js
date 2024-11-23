import { v4 as uuidv4 } from 'uuid';

const LOAD_ACTIVITIES = 'load-activities';
const ADD_ACTIVITY = 'add-activity';
const DELETE_ACTIVITY = 'delete-activity';
const UPDATE_ACTIVITY = 'update-activity';
const SET_ACTIVE_ID = 'set-activeId';
const RESTART_APP = 'restart-app';

const getActivitiesFromLocalStorage = () => {
    const storedActivities = localStorage.getItem('activities');
    return storedActivities ? JSON.parse(storedActivities) : [];
};

export const initialState = {
    activities: getActivitiesFromLocalStorage(),
    activeId: null,
};

export function activityReducer(state, action) {
    switch (action.type) {
        case LOAD_ACTIVITIES:
            return { ...state, activities: getActivitiesFromLocalStorage() };

        case ADD_ACTIVITY: {
            const newActivity = { ...action.payload, id: uuidv4() };
            const newActivities = [...state.activities, newActivity];
            localStorage.setItem('activities', JSON.stringify(newActivities));
            return { ...state, activities: newActivities };
        }

        case DELETE_ACTIVITY: {
            const newActivities = state.activities.filter(activity => activity.id !== action.payload.id);
            localStorage.setItem('activities', JSON.stringify(newActivities));
            return { ...state, activities: newActivities };
        }

        case UPDATE_ACTIVITY: {
            const newActivities = state.activities.map(activity =>
                activity.id === action.payload.id ? { ...action.payload } : activity
            );
            localStorage.setItem('activities', JSON.stringify(newActivities));
            return { ...state, activities: newActivities };
        }

        case SET_ACTIVE_ID:
            return { ...state, activeId: action.payload.id };

        case RESTART_APP: {
            localStorage.removeItem('activities'); // Limpiar el localStorage
            return { activities: [], activeId: null };
        }

        default:
            return state;
    }
}
