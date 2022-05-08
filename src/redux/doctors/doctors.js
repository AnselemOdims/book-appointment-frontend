import Axios from 'axios';

// URLs
const BASE_URL = 'http://localhost:3000/api/v1';

// conts
const FETCH_DOCTORS = 'BOOK-APPOINTMENT/DOCTORS/FETCH_DOCTORS';
const CREATE_DOCTOR = 'BOOK-APPOINTMENT/DOCTORS/CREATE_DOCTOR';

// actions
const fetchDoctors = (payload) => ({
  type: FETCH_DOCTORS,
  payload,
});

const createDoctor = (payload) => ({
  type: CREATE_DOCTOR,
  payload,
});

// state
const doctorsState = [];

//   APIs-functions

export const fetchDoctorsApi = (accessToken) => async (dispatch) => {
  const returnValue = await Axios.get(`${BASE_URL}/doctors`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const { doctors } = returnValue.data.data;
  dispatch(fetchDoctors(doctors));
};

export const createDoctorApi = (accessToken, data) => async (dispatch) => {
  await Axios.post(`${BASE_URL}/doctors/create`, data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  dispatch(createDoctor(data));
};

// reducer
const reducer = (state = doctorsState, action) => {
  switch (action.type) {
    case FETCH_DOCTORS:
      return action.payload;
      case CREATE_DOCTOR:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default reducer;
