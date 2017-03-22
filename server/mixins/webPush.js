module.exports = function(Model, options) {
  'use strict';
  Model.observe('after save', function event(ctx, next) { //Observe any insert/update event on Model
    switch (ctx.Model.modelName) {
        case "ServiceRequest":
            notifyOwnerOnNewRequest(ctx.instance);
            break;
    
        default:
            break;
    }
   
    next();
  });

  function notifyOwnerOnNewRequest(instance){
    console.log("Send web push notification for serviceReuqest - "+ instance.__data.id);
  }
};