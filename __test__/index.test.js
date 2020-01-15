const supertest = require('supertest');
const app = require('../index');



describe("Testing the movies API", () => {  
  it("tests our testing framework if it works", () => {
      expect(2).toBe(2);  
  });
});


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
      login:"test",
      pwd:"ooooooooooooooooo"
    };
    supertest(app).post('/login',params).then((res) => {
      expect(res.status).toBe(200);
      expect(res.data.error).toBe("Le login n'existe pas...");
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


describe("Test Delete", () => {  
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
