import React, { createContext, useState, useContext, useEffect } from "react";
import {
    createTeacherRequest,
    updateTeacherRequest,
    deleteTeacherRequest,
    getTeacherRequest
} from "../../api/teacherAPI/teacher";

export const TeachersContext = createContext();

export const useTeachers = () => {
    const context = useContext(TeachersContext);
    if (!context) {
        throw new Error("useTeachers debe ser utilizado dentro de un TeachersProvider");
    }
    return context;
};

export const TeacherProvider = ({ children }) => {
    const [teachers, setTeachers] = useState([]);
    const [errors, setErrors] = useState([]);
    const [teachersUpdated, setTeachersUpdated] = useState(false);
    const [messages, setMessages] = useState([]);

    const getTeachers = async () => {
        try {
            const response = await getTeacherRequest();
            setTeachers(response.data);
        } catch (error) {
            setErrors(["Hubo un error al cargar los profesores"]);
        }
    };


    const handleError = (error) => {
        const errorMessage = error.response?.data?.message || 'An error occurred';
        setErrors([errorMessage]);
    };

    const addTeacher = async (teacher) => {
        try {
            const response = await createTeacherRequest(teacher);
            setTeachers([...teachers, response.data]);
            setTeachersUpdated(true);
        } catch (error) {
            setErrors(["Hubo un error al agregar el profesor"]);
        }
    };

    const updateTeacher = async (id, updatedTeacher) => {
        try {
            const response = await updateTeacherRequest(id, updatedTeacher);
            setTeachers(teachers.map(teacher => teacher._id === id ? response.data : teacher));
            setTeachersUpdated(true);
        } catch (error) {
            setErrors(["Hubo un error al actualizar el profesor"]);
        }
    };

    // const toggleTeacherStatus = async (id, state) => {
    //     try {
    //         const res = await toggleUserStatusRequest(id, state);
    //         setTeachers(teachers.map(teacher => teacher._id === id ? res.data.teacher : teacher ));
    //         handleResponse(res);
    //         return { success: true };
    //     } catch (error) {
    //         handleError(error);
    //         return { success: false, error: error.response?.data?.message };
    //     }
    // };

    const toggleTeacherStatus = async (id, newState) => {
        try {
            const response = await updateTeacherRequest(id, { state: newState });
            setTeachers(teachers.map(teacher =>
                teacher._id === id ? { ...teacher, state: newState } : teacher
            ));
            setTeachersUpdated(true);
        } catch (error) {
            setErrors([error.message || "Hubo un error al actualizar el estado del profesor"]);
        }
    };

    const deleteTeacher = async (id) => {
        try {
            await deleteTeacherRequest(id);
            setTeachers(teachers.filter(teacher => teacher._id !== id));
            setTeachersUpdated(true);
        } catch (error) {
            setErrors([error.message || "Hubo un error al eliminar el profesor"]);
        }
    };

    useEffect(() => {
        getTeachers();
    }, []);

    useEffect(() => {
        if (teachersUpdated) {
            getTeachers();
            setTeachersUpdated(false);
        }
    }, [teachersUpdated]);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const clearMessages = () => setMessages([]);
    const clearErrors = () => setErrors([]);

    return (
        <TeachersContext.Provider value={{
            teachers,
            getTeachers,
            errors,
            addTeacher,
            updateTeacher,
            toggleTeacherStatus,
            deleteTeacher,
            messages,
            clearMessages,
            clearErrors
        }}>
            {children}
        </TeachersContext.Provider>
    );
};
