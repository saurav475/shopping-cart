import { useState, useCallback } from 'react';

export const useFetch = (fetchFn) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFn(...args);
        setData(result.data);
        return result.data;
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchFn]
  );

  return { data, loading, error, execute };
};

export const usePagination = (initialPage = 1, initialLimit = 12) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const goToPage = useCallback((pageNum) => {
    setPage(Math.max(1, pageNum));
  }, []);

  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1));
  }, []);

  return {
    page,
    limit,
    setLimit,
    goToPage,
    nextPage,
    prevPage,
  };
};

export const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (err) {
        if (err.response?.data?.errors) {
          const errorObj = {};
          err.response.data.errors.forEach((error) => {
            errorObj[error.param] = error.msg;
          });
          setErrors(errorObj);
        } else if (err.response?.data?.message) {
          setErrors({ submit: err.response.data.message });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
  };
};
