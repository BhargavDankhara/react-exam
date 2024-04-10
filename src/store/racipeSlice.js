import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

export const fetchrecipes = createAsyncThunk(
	'recipes/fetchrecipes',
	async () => {
		return [];
	}
);

export const addStudent = createAsyncThunk(
	'recipes/addStudent',
	async (studentData) => {
		return studentData;
	}
);

export const updateStudent = createAsyncThunk(
	'recipes/updateStudent',
	async (studentData) => {
		return studentData;
	}
);

export const deleteStudent = createAsyncThunk(
	'recipes/deleteStudent',
	async (studentId) => {
		return studentId;
	}
);

const recipeslice = createSlice({
	name: 'recipes',
	initialState: {
		recipes: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers (builder) {
		builder
			.addCase(fetchrecipes.pending,(state) => {
				state.status = 'loading';
			})
			.addCase(fetchrecipes.fulfilled,(state,action) => {
				state.status = 'succeeded';
				state.recipes = action.payload;
			})
			.addCase(fetchrecipes.rejected,(state,action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(addStudent.fulfilled,(state,action) => {
				state.status = 'succeeded';
				state.recipes.push(action.payload);
			})
			.addCase(updateStudent.fulfilled,(state,action) => {
				state.status = 'succeeded';
				const updatedStudent = action.payload;
				const index = state.recipes.findIndex(student => student.id === updatedStudent.id);
				if (index !== -1)
				{
					state.recipes[ index ] = updatedStudent;
				}
			})
			.addCase(deleteStudent.fulfilled,(state,action) => {
				state.status = 'succeeded';
				const deletedStudentId = action.payload;
				state.recipes = state.recipes.filter(student => student.id !== deletedStudentId);
			});
	},
});

export default recipeslice.reducer;
