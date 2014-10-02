/************************************************
  *** Utilities to communicate with the server ***
  ************************************************/
;(function() {
  'use strict';
  window.textsecure = window.textsecure || {};
  window.textsecure.server = (function() {
    var URL_BASE    = "https://textsecure-service-ca.whispersystems.org:4433/v1/accounts";

    function doAjax(param) {
      if (param.path === undefined)
          param.path = "/";

      return new Promise(function(resolve, reject) {
        $.ajax(URL_BASE + param.path, {
          type        : param.method,
          data        : JSON.stringify(param.jsonData),
          contentType : 'application/json; charset=utf-8',
          dataType    : 'json',
          headers     :  { "Authorization": "Basic " + btoa(param.user + ":" + param.password) },
          success     : resolve,
          error       : function(jqXHR, textStatus, errorThrown) {
                          var code = jqXHR.status;
                          if (code == 200) {
                              // happens sometimes when we get no response
                              resolve(null);
                              return;
                          }
                          if (code > 999 || code < 100)
                              code = -1;
                          try {
                              switch (code) {
                              case -1:
                                  throw "Failed to connect to the server";
                              case 401:
                                  throw "Invalid authentication credentials";
                              case 413:
                                  throw "Rate limit exceeded";
                              default:
                                  throw code
                              }
                          } catch (e) {
                              if (jqXHR.responseJSON)
                                  e.response = jqXHR.responseJSON;
                              reject(e);
                          }
                      }
        });
      });
    };

    function errorHandler(error_messages) {
      return function(e) {
        throw error_messages[e] || e;
      };
    };

    function requestVerification(transport, number) {
      return doAjax({
        method              : 'GET',
        path                : '/' + transport + '/code/' + number,
      }).catch(
        errorHandler({
          400: "Badly formatted number",
          415: "Invalid transport"
        })
      );
    };

    function requestVerificationSMS(number) {
      return requestVerification('sms', number);
    };
    function requestVerificationVoice(number) {
      return requestVerification('voice', number);
    };

    function confirmCode(number, code, password, signaling_key, registrationId) {
      return doAjax({
        method              : 'PUT',
        path                : '/code/' + code,
        user                : number,
        password            : password,
        jsonData            : { signalingKey   : signaling_key,
                                supportsSms    : false,
                                registrationId : registrationId},
      }).catch(
        errorHandler({
          403: "Wrong verification code",
          417: "Your number is registered with a different server."
        })
      );
    };

    return {
      requestVerificationVoice : requestVerificationVoice,
      requestVerificationSMS   : requestVerificationSMS,
      confirmCode              : confirmCode
    };
  })();
})();
