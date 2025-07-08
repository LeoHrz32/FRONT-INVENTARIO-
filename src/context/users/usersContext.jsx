import React, { createContext, useState, useContext, useEffect } from "react";
import {
    getUsersRequest,
    getUserByIdRequest,
    createUserRequest,
    updateUserRequest,
    deleteUserRequest,
    getPaginatedUsersRequest,
    searchUsersRequest,
    loginRoute
} from "../../api/userApi/usersApi";
import Cookies from "js-cookie";

export const UsersContext = createContext();

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error("useUsers debe ser utilizado dentro de un UsersProvider");
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const [messages, setMessages] = useState([]);
    const [usersUpdated, setUsersUpdated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); // Nuevo estado para el usuario logueado


    // Paginación y búsqueda
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    // Función para manejar errores
    const handleError = (error) => {
        const errorMessage = error.response?.data?.message || 'Ocurrió un error';
        setErrors([errorMessage]);
    };

    // Obtener todos los usuarios
    // const getUsers = async () => {
    //     try {
    //         const response = await getUsersRequest();
    //         setUsers(response.data);
    //     } catch (error) {
    //         handleError(error);
    //     }
    // };

    const getUsers = async () => {
        try {
            const response = await getUsersRequest();
            // GUARDA SOLO EL ARRAY:
            setUsers(response.data.users || []);
        } catch (error) {
            handleError(error);
        }
    };



    // Obtener usuario por ID
    const getUserById = async (id) => {
        try {
            const response = await getUserByIdRequest(id);
            setSelectedUser(response.data);
        } catch (error) {
            handleError(error);
        }
    };

    // Crear usuario
    const createUser = async (user) => {
        try {
            const response = await createUserRequest(user);
            setUsers([...users, response.data]);
            setUsersUpdated(true);
        } catch (error) {
            handleError(error);
        }
    };

    // Actualizar usuario
    const updateUser = async (id, updatedUser) => {
        try {
            const response = await updateUserRequest(id, updatedUser);
            setUsers(users.map(user => user.id === id ? response.data : user));
            setUsersUpdated(true);
        } catch (error) {
            handleError(error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await deleteUserRequest(id);
            setUsers(users.filter(user => user.id !== id));
            setUsersUpdated(true);
        } catch (error) {
            handleError(error);
        }
    };

    // Obtener usuarios paginados
    const getPaginatedUsers = async (page = 1, perPage = 10) => {
        try {
            const response = await getPaginatedUsersRequest(page, perPage);
            setUsers(response.data.users || []);
            setTotalPages(response.data.total_pages || 1);
            setCurrentPage(page);
        } catch (error) {
            handleError(error);
        }
    };

    const searchUsers = async (query) => {
        try {
            const response = await searchUsersRequest(query);
            // SUPONIENDO que devuelve { users: […] }
            setUsers(response.data.users || []);
            setSearchQuery(query);
            setTotalPages(1);
        } catch (error) {
            handleError(error);
        }
    };

    const loginUser = async (str_name_user, str_password) => {
        try {
            const response = await loginRoute(str_name_user, str_password);
            const { token, user } = response.data;

            if (!token) {
                console.error("❌ Token vacío en la respuesta del backend");
                return { success: false, message: "Token inválido" };
            }

            Cookies.set('token', token, { expires: 1 });
            return { success: true, user };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Error al iniciar sesión"
            };
        }
    };



    // Efectos para actualizar cuando haya cambios
    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (usersUpdated) {
            getUsers();
            setUsersUpdated(false);
        }
    }, [usersUpdated]);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    // Limpiar mensajes o errores
    const clearMessages = () => setMessages([]);
    const clearErrors = () => setErrors([]);

    return (
        <UsersContext.Provider value={{
            users,
            selectedUser,
            getUsers,
            getUserById,
            createUser,
            updateUser,
            deleteUser,
            errors,
            messages,
            clearMessages,
            clearErrors,
            getPaginatedUsers,
            currentPage,
            totalPages,
            searchUsers,
            searchQuery,
            currentUser,
            loginUser,
            setCurrentUser
        }}>
            {children}
        </UsersContext.Provider>
    );
};
