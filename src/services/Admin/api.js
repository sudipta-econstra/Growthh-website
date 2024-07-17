import axios from 'axios';

const BASE_URL = 'http://localhost:5500';

export const adminLogin = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/admin-login`, {
      email: username,
      password: password
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to login');
    }
  } catch (error) {
    throw new Error('Failed to login');
  }
};
export const createModule = async (token, moduleData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/module/create-module`, moduleData, {
      headers: {
        Authorization: `${token}`
      }
    });
    return response.data;
    
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create module');
  }
};
export const createPlan = async (token, planData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/create-plan`, planData, {
      headers: {
        Authorization: `${token}`
      }
    });
    return response.data;

  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create module');
  }
};

export const getAllCompanies = async (token, current_page, limit, search_field, search_input, start_date, end_date) => {
  console.log(search_field, search_input, start_date, end_date);
  try {
    const response = await axios.get(`${BASE_URL}/api/dashboard/all-company-list`, {
      headers: {
        Authorization: `${token}`
      },
      params: {
        page: current_page,
        limit: limit,
        search_field: search_field || undefined,
        search_input: search_input || undefined,
        start_date: start_date ? start_date.split('T')[0] : undefined,
        end_date: end_date ? end_date.split('T')[0] : undefined
      }
    });
    return response;
  } catch (error) {
    throw new Error('Failed to fetch active companies');
  }
};

export const getActiveCompanies = async (token, current_page, limit, search_field, search_input, start_date, end_date) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/dashboard/all-active-company`, {
      headers: {
        Authorization: `${token}`
      },
      params: {
        page: current_page,
        limit: limit,
        search_field: search_field || undefined,
        search_input: search_input || undefined,
        start_date: start_date ? start_date.split('T')[0] : undefined,
        end_date: end_date ? end_date.split('T')[0] : undefined
      }
    });
    return response;
  } catch (error) {
    throw new Error('Failed to fetch active companies');
  }
};
export const getSuspendedCompanies = async (token, current_page, limit, search_field, search_input, start_date, end_date) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/dashboard/all-suspended-company`, {
      headers: {
        Authorization: `${token}`
      },
      params: {
        page: current_page,
        limit: limit,
        search_field: search_field || undefined,
        search_input: search_input || undefined,
        start_date: start_date ? start_date.split('T')[0] : undefined,
        end_date: end_date ? end_date.split('T')[0] : undefined
      }
    });
    return response;
  } catch (error) {
    throw new Error('Failed to fetch active companies');
  }
};

export const getOrderHistory = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/dashboard/order-history`, {
      headers: {
        Authorization: `${token}`
      },
    });
    return response;
  } catch (error) {
    throw new Error('Failed to fetch orderhistory');
  }
};
export const getPurchaseList = async (token, current_page, limit, search_field, search_input, start_date, end_date) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/dashboard/purchase-list`, {
      headers: {
        Authorization: `${token}`
      },
      params: {
        page: current_page,
        limit: limit,
        search_field: search_field || undefined,
        search_input: search_input || undefined,
        start_date: start_date ? start_date.split('T')[0] : undefined,
        end_date: end_date ? end_date.split('T')[0] : undefined
      }
    });
    return response;
  } catch (error) {
    throw new Error('Failed to fetch active companies');
  }
};

export const getAllPlan = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/all-plans`, {
      headers: {
        Authorization: `${token}`
      }
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch active plan');
    }
  } catch (error) {
    throw new Error('Failed to fetch active plan');
  }
};

export const getAllModule = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/module/all-modules`, {
      headers: {
        Authorization: `${token}`
      }
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch active companies');
    }
  } catch (error) {
    throw new Error('Failed to fetch active companies');
  }
};

export const editModule = async (token, moduleId, updatedData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/module/edit-module/${moduleId}`,
      updatedData,
      {
        headers: {
          Authorization: `${token}`
        }
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to edit module');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to edit module');
  }
};

export const editPlan = async (token, planId, updatedData) => {
  console.log(token, planId,updatedData);
  try {
    const response = await axios.put(
      `${BASE_URL}/api/update-plan/${planId}`,updatedData,
      {
        headers: {
          Authorization: `${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to edit module');
  }
};
export const changeCompanyStatus = async (token, companyId, status) => {
  console.log(token, companyId, status);
  try {
    const response = await axios.put(
      `${BASE_URL}/api/dashboard/update-company-status`,
      { id: companyId, status: status },
      {
        headers: {
          Authorization: `${token}`
        }
      }
    );

    return response.data;
    //if (response.status === 200) {
    //} else {
    //  throw new Error(response.data.message || 'Failed to change module status');
    //}
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to change module status');
  }
};
export const changeModuleStatus = async (token, moduleId, status) => {
  console.log(token, moduleId, status);
  try {
    const response = await axios.put(
      `${BASE_URL}/api/module/change-status/${moduleId}`,
      { status },
      {
        headers: {
          Authorization: `${token}`
        }
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to change module status');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to change module status');
  }
};

export const changePlanStatus = async (token, moduleId, status) => {
  console.log(token, moduleId, status);
  try {
    const response = await axios.put(
      `${BASE_URL}/api/plan/update-status`,
      { id:moduleId,status:status },
      {
        headers: {
          Authorization: `${token}`
        }
      }
    );
    
    return response.data;
    //if (response.status === 200) {
    //} else {
    //  throw new Error(response.data.message || 'Failed to change module status');
    //}
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to change module status');
  }
};

export const deleteCompany = async (token, companyId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/dashboard/delete-company`,
      {
        data: { id: companyId }, // Correct place for payload data
        headers: {
          Authorization: `${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete module');
  }
};

export const deleteModule = async (token, moduleId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/module/delete-module/${moduleId}`,
      {
        headers: {
          Authorization: `${token}`
        }
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to delete module');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete module');
  }
};
export const deletepPlan = async (token, moduleId) => {
  console.log(moduleId);
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/remove-plan/${moduleId}`,
      {
        headers: {
          Authorization: `${token}`
        }
      }
    );
    return response.data;
    // if (response.status === 200) {
      
    // } else {
    //   throw new Error(response.data.message || 'Failed to delete module');
    // }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete module');
  }
};
export const getAllActivePlans = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/all-plans`, {
      headers: {
        Authorization: `${token}`
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch active plans');
    }
  } catch (error) {
    throw new Error('Failed to fetch active plans');
  }
};

export const resetPassword = async (token, oldPassword, newPassword) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/admin-change-password`,
      {
        oldPassword: oldPassword,
        newPassword: newPassword
      },
      {
        headers: {
          Authorization: `${token}`
        }
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to change password');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to change password');
  }
};

export const sendOTPEmail = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/admin/forgget-password/sent-otp`, {
      email: email
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to send OTP');
    }
  } catch (error) {
    throw new Error('Failed to send OTP');
  }
};

export const verifyOTP = async (email, otp, newPassword) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/admin/forgget-password/verify-otp`, {
      email: email,
      otp: otp,
      newPassword: newPassword
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to verify OTP and reset password');
    }
  } catch (error) {
    throw new Error('Failed to verify OTP and reset password');
  }
};