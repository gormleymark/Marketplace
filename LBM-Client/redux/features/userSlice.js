import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const serverURL = import.meta.env.VITE_SERVER_URL;
const userURL = `${serverURL}user`

const initialState = {
  currentUser: {
    savedProperties: [], 
  },  
  allUsers: [],
  status: "idle",
  error: undefined,
};

export const fetchCurrentUser = createAsyncThunk(
  "fetch/fetchCurrentUser",
  async (userData) => {
    const response = await fetch(userURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  }
);

export const fetchAllUsers = createAsyncThunk(
  "fetch/fetchAllUsers",
  async () => {
    const response = await fetch(userURL);
    return await response.json();
  }
);

export const saveProperty = createAsyncThunk(
  "user/saveProperty",
  async (propertyData, { getState }) => {
    try {
      const userId = getState().user.currentUser.ID_user;
      const propertyId = propertyData.propertyId;
      const response = await fetch(`${userURL}/update?userId=${userId}&saved=${propertyId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      });
      if (!response.ok) {
        throw new Error("Failed to save property on the server");
      }
      return propertyData;
    } catch (error) {     
      console.error("Error saving property:", error.message);
      throw error;
    }
  }
);

// export const deleteProperty = createAsyncThunk(
//   "user/deleteProperty",
//   async (propertyId, { getState }) => {
//     try {
//       const userId = getState().user.currentUser.ID_user;
//       const response = await fetch(`${userURL}/update?userId=${userId}&saved=false`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ propertyId }),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to delete property on the server");
//       }
//       return propertyId;
//     } catch (error) {
//       console.error("Error deleting property:", error.message);
//       throw error;
//     }
//   }
// );

export const deleteProperty = createAsyncThunk(
  "user/deleteProperty",
  async (propertyId, { getState }) => {
    try {
      const userId = getState().user.currentUser.ID_user;
      const updatedProperties = getState().user.currentUser.savedProperties.filter(
        (property) => property.propertyId !== propertyId
      );
      const response = await fetch(`${userURL}/update?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ savedProperties: updatedProperties }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete property on the server");
      }

      return propertyId;
    } catch (error) {
      console.error("Error deleting property:", error.message);
      throw error;
    }
  }
);



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const commonPendingAction = (state) => {
      state.status = "loading";
    };
    const commonFulfilledAction = (state, action) => {
      state.status = "succeeded";
    };
    const commonRejectedAction = (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    };
    builder

      .addCase(fetchAllUsers.pending, commonPendingAction)
      .addCase(fetchAllUsers.rejected, commonRejectedAction)
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        commonFulfilledAction(state, action);
        state.allUsers = action.payload;
      })

      .addCase(fetchCurrentUser.pending, commonPendingAction)
      .addCase(fetchCurrentUser.rejected, commonRejectedAction)
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        commonFulfilledAction(state, action);
        state.currentUser = action.payload;
      })

      .addCase(saveProperty.pending, commonPendingAction)      
      .addCase(saveProperty.rejected, commonRejectedAction)
      .addCase(saveProperty.fulfilled, commonFulfilledAction)

      .addCase(deleteProperty.pending, commonPendingAction)      
      .addCase(deleteProperty.rejected, commonRejectedAction)
      .addCase(deleteProperty.fulfilled, (state, action) => {
        commonFulfilledAction(state, action);
      state.currentUser.savedProperties = state.currentUser.savedProperties.filter(
        (property) => property.propertyId !== action.payload
      );
    })
  },
});

export const selectCurrentUser = (state) => state.user.currentUser;

// export const {
// saveProperty
// } = userSlice.actions;

export default userSlice.reducer;

