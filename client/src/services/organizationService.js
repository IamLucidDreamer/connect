import server from "../helpers/apiCall";

export const getUsersOrganizations = async () => {
  return new Promise((resolve, reject) => {
    server
      .get(`/organization/for-users`)
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
      .get(`/organization/${organizationId}`)
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
      .get(`/organization/names`)
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
      .post(`/organization/bulk-create`, { organizations })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const sendOtpForAdminAssignment = async (
  email,
  organizationId,
  password
) => {
  return new Promise((resolve, reject) => {
    server
      .post(`/organization/send-otp`, { email, organizationId, password })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const verifyOtpAndAssignAdmin = async (
  email,
  organizationId,
  otp,
  otpVerificationId
) => {
  return new Promise((resolve, reject) => {
    server
      .post(`/organization/verify-otp`, {
        email,
        organizationId,
        otp,
        otpVerificationId,
      })
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
      .put(`/organization/update`, { organizationId, updates })
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
      .post(`/organization/join`, { organizationId, role })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getMembers = async (organizationId) => {
  return new Promise((resolve, reject) => {
    server
      .get(`/organization/members/${organizationId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getMembersToApprove = async (organizationId) => {
  return new Promise((resolve, reject) => {
    server
      .get(`/organization/members-to-approve/${organizationId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const approveMember = async (organizationId, memberId) => {
  return new Promise((resolve, reject) => {
    server
      .post(`/organization/approve-member/${organizationId}`, { memberId })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}