import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import { FaSpinner } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { signup } from '../store/actions/thunk';

const SignupPage = () => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Clear any saved credentials when component mounts
  useEffect(() => {
    localStorage.removeItem('rememberedEmail');
    localStorage.removeItem('rememberedPassword');
    localStorage.removeItem('rememberMe');
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role_id: '2', // Default to Customer role
    },
  });

  const password = watch('password');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get('/roles');
        setRoles(response.data);
      } catch (error) {
        setError('Failed to fetch roles');
      }
    };
    fetchRoles();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      const userData = {
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
        role_id: data.role_id
      };
      if (data.role_id === '3') {
        userData.store = {
          name: data.store_name,
          phone: data.store_phone,
          tax_no: data.tax_no,
          bank_account: data.bank_account,
        };
      }
      await dispatch(signup(userData));
      navigate(-1, { state: { message: 'You need to click link in email to activate your account!' } });
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Join our community today</p>
          </div>

          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="off"
                {...register('name', {
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters',
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-white"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="surname"
                type="text"
                autoComplete="off"
                {...register('surname', {
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters',
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-white"
              />
              {errors.surname && (
                <p className="mt-1 text-sm text-red-600">{errors.surname.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="off"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-white"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Password must be at least 8 characters and include uppercase, lowercase, number and special character',
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-white"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match',
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-white"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                id="role"
                {...register('role_id', { required: 'Role is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-white"
              >
                <option value="1">Admin</option>
                <option value="2">Customer</option>
                <option value="3">Store</option>
              </select>
              {errors.role_id && (
                <p className="mt-1 text-sm text-red-600">{errors.role_id.message}</p>
              )}
            </div>

            {watch('role_id') === '3' && (
              <div className="space-y-4 sm:space-y-6 border-t border-gray-200 pt-4 sm:pt-6">
                <h3 className="text-lg font-semibold text-gray-900">Store Information</h3>
                
                <div>
                  <label htmlFor="store_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Store Name
                  </label>
                  <input
                    id="store_name"
                    type="text"
                    autoComplete="off"
                    {...register('store_name', {
                      required: 'Store name is required',
                      minLength: {
                        value: 3,
                        message: 'Store name must be at least 3 characters',
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-white"
                  />
                  {errors.store_name && (
                    <p className="mt-1 text-sm text-red-600">{errors.store_name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="store_phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Store Phone
                  </label>
                  <input
                    id="store_phone"
                    type="tel"
                    autoComplete="off"
                    {...register('store_phone', {
                      required: 'Store phone is required',
                      pattern: {
                        value: /^(\+90|0)?[0-9]{10}$/,
                        message: 'Please enter a valid Turkish phone number',
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-white"
                  />
                  {errors.store_phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.store_phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="tax_no" className="block text-sm font-medium text-gray-700 mb-1">
                    Tax Number
                  </label>
                  <input
                    id="tax_no"
                    type="text"
                    autoComplete="off"
                    {...register('tax_no', {
                      required: 'Tax number is required',
                      pattern: {
                        value: /^T\d{4}V\d{6}$/,
                        message: 'Tax number must match the pattern TXXXXVXXXXXX',
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-white"
                  />
                  {errors.tax_no && (
                    <p className="mt-1 text-sm text-red-600">{errors.tax_no.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="bank_account" className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Account (IBAN)
                  </label>
                  <input
                    id="bank_account"
                    type="text"
                    autoComplete="off"
                    {...register('bank_account', {
                      required: 'Bank account is required',
                      pattern: {
                        value: /^TR\d{2}\s?(\d{4}\s?){5}\d{2}$/,
                        message: 'Please enter a valid IBAN',
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-white"
                  />
                  {errors.bank_account && (
                    <p className="mt-1 text-sm text-red-600">{errors.bank_account.message}</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                    <span>Signing up...</span>
                  </div>
                ) : (
                  'Sign up'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 