
/*
 * Get string data from Python object.
 */

static Py_ssize_t get_buffer(PyObject *obj, unsigned char **buf_p, PyObject **tmp_obj_p)
{
	PyObject *str = NULL;
	Py_ssize_t res;

	/* check for None */
	if (obj == Py_None) {
		PyErr_Format(PyExc_TypeError, "None is not allowed");
		return -1;
	}

	/* quick path for bytes */
	if (PyBytes_Check(obj)) {
		if (PyBytes_AsStringAndSize(obj, (char**)buf_p, &res) < 0)
			return -1;
		return res;
	}

	/* convert to bytes */
	if (PyUnicode_Check(obj)) {
		/* no direct string access in abi3 */
		*tmp_obj_p = PyUnicode_AsUTF8String(obj);
	} else if (PyMemoryView_Check(obj) || PyByteArray_Check(obj)) {
		/* no direct buffer access in abi3 */
		*tmp_obj_p = PyBytes_FromObject(obj);
	} else {
		/* Not a string-like object, run str() or it. */
		str = PyObject_Str(obj);
		if (str == NULL)
			return -1;
		*tmp_obj_p = PyUnicode_AsUTF8String(str);
		Py_CLEAR(str);
	}
	if (*tmp_obj_p == NULL)
		return -1;
	if (PyBytes_AsStringAndSize(*tmp_obj_p, (char**)buf_p, &res) < 0)
		return -1;
	return res;
}

