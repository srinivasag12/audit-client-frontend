(function () {
	'use strict';

	angular
		.module('app.centralLog')
		.controller('CentralLogController', CentralLogController);
	function CentralLogController($window, BASE_URL_LOGIN, toaster, BASE_URL, RMI_URL_LOG) {

		var log = this;

		log.error = error;

		log.errorlog = errorlog;
		
		log.logArray = [{ select: 'log1', value: '.1' }, { select: 'log2', value: '.2' }, { select: 'log3', value: '.3' }, { select: 'log4', value: '.4' }, { select: 'log5', value: '.5' },
		{ select: 'log6', value: '.6' }, { select: 'log7', value: '.7' }, { select: 'log8', value: '.8' }, { select: 'log9', value: '.9' }, { select: 'log10', value: '.10' }, { select: 'log11', value: '.11' },
		{ select: 'log12', value: '.12' }, { select: 'log13', value: '.13' }, { select: 'log14', value: '.14' }, { select: 'log15', value: '.54' }];

		function error(type, view) {

			if (type == 'error' && view == 'DOWNLOAD') {
				$window.location.href = BASE_URL_LOGIN + 'download/loggers/errorlogs.log/' + view + '/' + type;
			}
			else if (type == 'error' && view == 'VIEW') {
				$window.location.href = BASE_URL_LOGIN + 'download/loggers/errorlogs.log/' + view + '/' + type;
			}
			else if (type == 'info' && view == 'DOWNLOAD') {
				$window.location.href = BASE_URL_LOGIN + 'download/loggers/infologs.log/' + view + '/' + type;
			}
			else if (type == 'info' && view == 'VIEW') {
				$window.location.href = BASE_URL_LOGIN + 'download/loggers/infologs.log/' + view + '/' + type;
			}
			else if (type == 'all' && view == 'DOWNLOAD') {
				$window.location.href = BASE_URL_LOGIN + 'download/loggers/all.log/' + view + '/' + type;
			}
			else if (type == 'all' && view == 'VIEW') {
				$window.location.href = BASE_URL_LOGIN + 'download/loggers/all.log/' + view + '/' + type;
			}
			else if (type == 'rmi' && view == 'DOWNLOAD') {
				$window.location.href = RMI_URL_LOG + 'nohup.out/' + view;
			}
			else if (type == 'rmi' && view == 'VIEW') {
				$window.location.href = RMI_URL_LOG + 'nohup.out/' + view;
			}

		}

		function errorlog(type, view) {

			if (type == 'error' && view == 'DOWNLOAD') {
				$window.location.href = BASE_URL_LOGIN + 'download/loggers/errorlogs' + log.logval + '.log/' + view + '/' + type;
			}
			else if (type == 'error' && view == 'VIEW') {
				$window.location.href = BASE_URL_LOGIN + 'download/loggers/errorlogs' + log.logval + '.log/' + view + '/' + type;
			}
			else if (type == 'info' && view == 'DOWNLOAD') {
				$window.location.href = BASE_URL_LOGIN + 'download/loggers/infologs' + log.infoval + '.log/' + view + '/' + type;
			}
			else if (type == 'info' && view == 'VIEW') {
				$window.location.href = BASE_URL_LOGIN + 'download/loggers/infologs' + log.infoval + '.log/' + view + '/' + type;
			}
			else if (type == 'all' && view == 'DOWNLOAD') {
				$window.location.href = BASE_URL_LOGIN + 'download/loggers/all' + log.completeval + '.log/' + view + '/' + type;
			}
			else if (type == 'all' && view == 'VIEW') {
				$window.location.href = BASE_URL_LOGIN + 'download/loggers/all' + log.completeval + '.log/' + view + '/' + type;
			}
			/*else if (type == 'rmi' && view == 'DOWNLOAD') {
				$window.location.href = RMI_URL_LOG + 'RMI' + log.rmival + '.log/' + view + '/' + type;
			}
			else if (type == 'rmi' && view == 'VIEW') {
				$window.location.href = RMI_URL_LOG + 'RMI' + log.rmival + '.log/' + view + '/' + type;
			}*/

		}
	}

})();