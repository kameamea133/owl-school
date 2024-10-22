import  {apiSlice}  from "./apiSlice";

const USERS_URL = "/api/users";


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),
        register: builder.mutation({
  query: (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    
    
    if (data.profileImage) {
      formData.append('profileImage', data.profileImage);
    }

    return {
      url: `${USERS_URL}`,
      method: 'POST',
      body: formData,  
    };
  },
}),

        logout: builder.mutation({
            query: () => ({
              url: `${USERS_URL}/logout`,
              method: 'POST',
            }),
          }),
          updateUser: builder.mutation({
  query: (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    
    
    if (data.profileImage) {
      formData.append('profileImage', data.profileImage);
    }

    return {
      url: `${USERS_URL}/profile`,
      method: 'PUT',
      body: formData,  
    };
  },
}),

    }),
});


export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation } = usersApiSlice