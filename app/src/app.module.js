
(function ()
{
    'use strict';
    /****
     * Main module of the Vessel Inspection
     */
    angular
        .module('central', [
            'app.core',
            //Modules
           'certificateViewer',
            'login',
            'app.audit',
            'app.template.menubar',
            'app.userSearch',
            'app.centralLog',
            'app.master',
            'app.dashboard',
            'app.carMaintenance',
            'app.certificate',
            'app.auditCycle',
            'app.config',
            'app.support',
            'app.vesselStatement',
            'app.vesselHistory',
          'HtmlTemplateCache',
          'ja.qr'
            

        ]);
        
})();