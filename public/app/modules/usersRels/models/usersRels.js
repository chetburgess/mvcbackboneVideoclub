define([
  'app/common/baseModel'
], function (BaseModel) {

  var UsersRels = BaseModel.extend({
    urlRoot: '/usersRels',
    
    defaults: {
      _id: undefined,
      idReg: '',
      typeReg: '',
      idUser: '',
      name: '',
      lastName: ''
    }
  });
  
  return UsersRels;
});