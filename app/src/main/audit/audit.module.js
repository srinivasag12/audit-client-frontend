
(function ()
{
    'use strict';
   
    angular
        .module('app.audit', [          
         
                              'app.audit.details',
                              'app.audit.detailsIhm',
                              'app.audit.detailsPlanApproval',
                              'app.audit.search',
                              'app.audit.findings',
                              'app.audit.prevfindings',
                              'app.audit.common',
                              'app.audit.dmlcfindings'
                              
        ]); 
    
})();