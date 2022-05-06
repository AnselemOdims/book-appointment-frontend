import Axios from 'axios';

// URLs
const BASE_URL = 'http://localhost:3000/api/v1';

// conts
const FETCH_RESERVATIONS = 'BOOK-APPOINTMENT/RESERVATIONS/FETCH_RESERVATIONS';
const CREATE_RESERVATION = 'BOOK-APPOINTMENT/DOCTORS/CREATE_RESERVATION';
const CANCEL_RESERVATION = 'BOOK-APPOINTMENT/DOCTORS/CANCEL_RESERVATION';

// actions
const fetchReservations = (payload) => ({
  type: FETCH_RESERVATIONS,
  payload,
});

const createReservation = (payload) => ({
  type: CREATE_RESERVATION,
  payload,
});

const cancelReservation = (payload) => ({
  type: CANCEL_RESERVATION,
  payload,
});

// state
const reservationsState = [];

//   APIs-functions
export const fetchReservationsApi = (accessToken, doctors) => async (dispatch) => {
  const returnValue = await Axios.get(`${BASE_URL}/reservations`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const appointments = [];
  const { reservations } = returnValue.data.data;
  for (let i = 0; i < reservations.length; i += 1) {
    const data = { };
    data.city = reservations[i].city;
    data.date = reservations[i].date;
    data.id = reservations[i].id
    for (let j = 0; j < doctors.length; j += 1) {
      if (reservations[i].doctor_id === doctors[j].id) {
        data.doctor = doctors[j];
      }
    }
    appointments.push(data);
  }
  dispatch(fetchReservations(appointments));
};

export const createReservationApi = (accessToken, data) => async (dispatch) => {
  const { city, date, doctor } = data;
  const newReservation = { doctor_id: doctor.id, city, date };
  await Axios.post(`${BASE_URL}/reservations/create`, newReservation,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  dispatch(createReservation(data));
};

export const cancelReservationApi = (accessToken, id) => async (dispatch) => {
  await Axios.delete(`${BASE_URL}/reservations/delete`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      reservation_id: id
    }
  });
  dispatch(cancelReservation(id));
};

// reducer
const reducer = (state = reservationsState, action) => {
  switch (action.type) {
    case FETCH_RESERVATIONS:
      return action.payload;
    case CREATE_RESERVATION:
      return [...state, action.payload];
      case CANCEL_RESERVATION:
      return state.filter((reservation) => reservation.id !== action.payload);
    default:
      return state;
  }
};

export default reducer;
