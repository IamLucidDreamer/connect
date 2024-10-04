import server from "../helpers/apiCall";

export const getUsersOrganizations = async () => {
  return new Promise((resolve, reject) => {
    server
      .get(`/organizations/user`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getOrganization = async (organizationId) => {
  return new Promise((resolve, reject) => {
    server
      .get(`/organizations/${organizationId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export const getAllOrganizationsNames = async () => {
  return new Promise((resolve, reject) => {
    server
      .get(`/organizations/names`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export const createOrganizationsInBulk = async (organizations) => {
  return new Promise((resolve, reject) => {
    server
      .post(`/organizations/bulk-create`, { organizations })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const sendOtpForAdminAssignment = async (email, organizationId, password) => {
  return new Promise((resolve, reject) => {
    server
      .post(`/organizations/send-otp`, { email, organizationId, password })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const verifyOtpAndAssignAdmin = async (email, organizationId, otp, otpVerificationId) => {
  return new Promise((resolve, reject) => {
    server
      .post(`/organizations/verify-otp`, { email, organizationId, otp, otpVerificationId })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateOrganization = async (organizationId, updates) => {
  return new Promise((resolve, reject) => {
    server
      .put(`/organizations/update`, { organizationId, updates })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const joinOrganization = async (organizationId, role = "member") => {
  return new Promise((resolve, reject) => {
    server
      .post(`/organizations/join`, { organizationId, role })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
