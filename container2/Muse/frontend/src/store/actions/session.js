//Store Action Types
export const SET_USER = 'Muse/session/SET_USER';
export const REMOVE_USER = 'Muse/session/REMOVE_USER';
export const SET_BOARD = 'Muse/session/SET_BOARDS';
export const REMOVE_BOARD = 'Muse/session/REMOVE_BOARDS';

//Store Actions
const setUser = (user) => ({ type: SET_USER, payload: user })
const removeUser = (user) => ({ type: REMOVE_USER });

const setBoard = (board) => ({ type: SET_BOARD, payload: board })
const removeBoard = (board) => ({ type: REMOVE_BOARD });

//Login Thunk
export const loginUser = (user) => async (dispatch) => {
  const { credential, password } = user;
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credential,
        password
      })
    });

    if (res.ok) {
      const data = await res.json()
      dispatch(setUser(data.user));

      window.location.replace("/dashboard")
      return data;
    }
  } catch (e) {
    console.error(e)
  }
}

export const signupUser = (user) => async (dispatch) => {
  const { username, email, password } = user;
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (res.ok) {
      const data = await res.json()
      dispatch(setUser(data.user))
      window.location.replace("/dashboard");
      return data;
    }
  } catch (e) {
    console.error(e)
  }
};

export const restoreUser = () => async dispatch => {
  try {
    const res = await fetch('/api/auth/restore', {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const data = await res.json()
      dispatch(setUser(data.user))
      dispatch(setBoard(data.boards))


      return data
    }
  }
  catch (e) {
    console.error(e)
  }
};

export const logoutUser = () => async dispatch => {
  try {
    const res = await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      }
    })
    dispatch(removeUser())
    return res
  } catch (e) {
    console.error(e)
  }
}

export const saveBoard = (userId, sequenceData) => async dispatch => {
  try {
    const res = await fetch(`/api/board/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...sequenceData
      }),
    });

    if (res.ok) {
      const data = await res.json()
      dispatch(setBoard(data))
      return data;
    }
  } catch (e) {
    console.error(e)
  }
}

export const loadBoard = (boardId) => async dispatch => {
  try {
    const res = await fetch(`/api/board/${boardId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (res.ok) {
      const data = await res.json()

      dispatch(setBoard(data))

      return data
    }

  }
  catch (e) {
    console.error(e)
  }
}
