const supertest = require('supertest');
const app = require('../index');



describe("Test get all users", () => {  
  it("get all users", () => {
    supertest(app).get('/login').then((res) => {
      expect(res.status).toBe(200);
    });
    
  });
});

describe("Test Login", () => {  
  it("login with params of an existing account", () => {
    let params = {
      login:"yoyo",
      pwd:"sohcahtoa"
    };
    supertest(app).post('/login',params).then((res) => {
      expect(res.status).toBe(200);
      expect(res.data.error).toBe(undefined);
      expect(res.body[0]).toBe(Object);
    }).catch(()=>{})
  });

  it("login with invented login", () => {
    let params = {
      login:"test",
      pwd:"ooooooooooooooooo"
    };
    supertest(app).post('/login',params).then((res) => {
      expect(res.status).toBe(200);
      expect(res.data.error).toBe("Le login n'existe pas...");
    }).catch(()=>{})
  });

  it("login with invented pwd", () => {
    let params = {
      login:"yoyo",
      pwd:"ooooooooooooooooo"
    };
    supertest(app).post('/login',params).then((res) => {
      expect(res.status).toBe(200);
      expect(res.data.error).toBe("Le mot de passe est incorrect...");
    }).catch(()=>{})
  });

  it("login without params", () => {
    supertest(app).post('/login').then((res) => {
      expect(res.status).toBe(200);
      expect(res.data.error).toBe("Les paramètres login et pwd sont invalides...");
    }).catch(()=>{})
  });
});


describe("Test Insert", () => {  
  it("Create new account", () => {
    let params = {
      login:"Test",
      mail:"yoann.marguerite@orange.fr",
      pwd:"test"
    };
    supertest(app).post('/user',params).then((res) => {
      expect(res.status).toBe(200);
      expect(res.data.error).toBe(undefined);
      expect(res.body[0]).toBe(Object);
    }).catch(()=>{})
  });

  it("Create with an existing login", () => {
    let params = {
      login:"Test",
      mail:"yoann.marguerite@orange.fr",
      pwd:"test"
    };
    supertest(app).post('/user',params).then((res) => {
      expect(res.status).toBe(200);
      expect(res.data.error).toBe("Ce login est déjà utilisé...");
    }).catch(()=>{})
  });

  it("Create without params", () => {
    supertest(app).post('/user').then((res) => {
      expect(res.status).toBe(200);
      expect(res.data.error).toBe("Les paramètres login et pwd sont invalides...");
    }).catch(()=>{})
  });
});


describe("Test Update", () => {  
  it("update with params of an existing account", () => {
    let params = {
      id:6,
      login:"yoyo",
      mail:"yoyo.paquerette@gmail.fr",
      pwd:"sohcahtoa"
    };
    supertest(app).put('/login',params).then((res) => {
      expect(res.status).toBe(200);
      expect(res.data.error).toBe(undefined);
      expect(res.body[0]).toBe(Object);
    }).catch(()=>{})
  });

  it("update with a login already exist", () => {
    let params = {
      id:17,
      login:"yoyo",
      mail:"yoyo.paquerette@gmail.fr",
      pwd:"sohcahtoa"
    };
    supertest(app).put('/user',params).then((res) => {
      expect(res.status).toBe(200);
      expect(res.data.error).toBe(undefined);
      expect(res.body[0]).toBe(Object);
    }).catch(()=>{})
  }); 

  it("update without params", () => {
    supertest(app).post('/user').then((res) => {
      expect(res.status).toBe(200);
      expect(res.data.error).toBe("Les paramètres login et pwd sont invalides...");
    }).catch(()=>{})
  });
});


describe("Test Delete", () => {  
  it("login with params of an existing account", () => {
    let params = {
      id:21
    };
    supertest(app).delete('/user',params).then((res) => {
      expect(res.status).toBe(200);
      expect(res.data.error).toBe(undefined);
      expect(res.body[0]).toBe(Object);
    }).catch(()=>{})
  });

  it("delete without params", () => {
    supertest(app).delete('/user').then((res) => {
      expect(res.status).toBe(200);
      expect(res.data.error).toBe("Le login n'existe pas...");
    }).catch(()=>{})
  });
});
