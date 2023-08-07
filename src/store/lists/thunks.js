import { toast } from "react-toastify";
import Fetch from "../../api/Fetch";
import { clearActivate, setActiveList, setList } from "./toDoListSlice";

export const createList = (name, uid, setOpen) => {
    return async (dispatch) => {
        try {
            await Fetch.post("/users/list/create", {
                name,
                uid,
            }).then((res) => {
                toast.success(res.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setOpen(false);
                dispatch(startLoadingLists(uid));
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const startLoadingLists = (uid) => {
    return async (dispatch) => {
        try {
            await Fetch.get(`/lists/${uid}`).then((res) => {
                dispatch(setList(res.data.lists));
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const startLoadingListById = (id) => {
    return async (dispatch) => {
        try {
            await Fetch.get(`lists/get/${id}`).then((res) => {
                dispatch(setActiveList(res.data.list));
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const addTask = (listId, task) => {
    return async (dispatch) => {
        try {
            await Fetch.post(`/lists/task/create`, {
                listId,
                task,
            }).then((res) => {
                toast.success(res.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(startLoadingListById(listId));
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const updatedTask = (taskId, listId) => {
    return async (dispatch) => {
        try {
            await Fetch.put(`/lists/task/update/${taskId}`).then((res) => {
                toast.success(res.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(startLoadingListById(listId));
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteList = (listId, uid) => {
    return async (dispatch) => {
        try {
            await Fetch.delete(`/lists/delete/${listId}`).then((res) => {
                toast.success(res.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(startLoadingLists(uid));
                dispatch(clearActivate());
            });
        } catch (error) {
            console.log(error);
        }
    };
};
