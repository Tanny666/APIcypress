const user = require('../fixtures/body.json');

describe('API Test', () => {
  const createUserAndValidate = (userData) => {
    return cy.createUser(userData).then((response) => {
      cy.log(response);
      const requestBody = JSON.parse(response.requestBody);
      expect(response.status).to.eq(200);
      expect(requestBody.username).to.eq(userData.username);
      expect(requestBody.id).to.eq(userData.id);
    });
  };

  const getUserAndValidate = (username, expectedId) => {
    return cy.getUser(username).then((response) => {
      cy.log(response);
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(expectedId);
      expect(response.body.username).to.eq(username);
    });
  };

  const changeUserAndValidate = (username, userData) => {
    return cy.changeUser(username, userData).then((response) => {
      cy.log(response);
      const requestBody = JSON.parse(response.requestBody);
      expect(response.status).to.eq(200);
      expect(requestBody.id).to.eq(userData.id);
      expect(requestBody.username).to.eq(userData.username);
    });
  };

  const deleteUserAndValidate = (username) => {
    return cy.deleteUser(username).then(({ status }) => {
      expect(status).to.eq(200);
    });
  };

  const getRemoteUserAndValidate = (username) => {
    return cy.getRemoteUser(username).then(({ status }) => {
      expect(status).to.eq(404);
    });
  };

  it('create user', () => {
    createUserAndValidate(user.user1);
    getUserAndValidate(user.user1.username, user.user1.id);
  });

  it('user edits', () => {
    createUserAndValidate(user.user2);
    changeUserAndValidate(user.user2.username, user.userPUT);
    getUserAndValidate(user.userPUT.username, user.userPUT.id);
  });

  it('delete user', () => {
    createUserAndValidate(user.user3);
    getUserAndValidate(user.user3.username, user.user3.id);
    deleteUserAndValidate(user.user3.username);
    getRemoteUserAndValidate(user.user3.username);
  });
});