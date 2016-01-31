'use strict';
// export default function($firebaseArray) {
// 	'ngInject';
//
// 	let ref = new Firebase('https://easyissues.firebaseio.com/random');
// 	const randomArray = $firebaseArray(ref);
//
// 	this.sendNew = function() {
// 		randomArray.$add({
// 			name: 'Cool',
// 			color: 'Blue'
// 		})
// 	}
//
// 	let welcome = "Hello Logan";
//
//   this.welcome = welcome;
//
// };

class MainController {

    /*@ngInject*/
    constructor($firebaseArray, base_url, Auth, $http) {
		  const self = this;
			let ref = new Firebase(base_url + 'random');
			const randomArray = $firebaseArray(ref);

			this.sendNew = function() {
				randomArray.$add({
					name: 'Cool',
					color: 'Blue'
				})
			}

			let welcome = "Hello Logan";

			this.welcome = welcome;

			this.login = Auth.login;

			this.issues = [];

			this.getIssues = function() {
				$http.get('https://api.github.com/repos/wya-app/wya-app.github.io/issues').then(function(data){
					angular.forEach(data.data, function(val, i){
						self.issues.push({
							title: val.title,
							content: val.body,
							url: val.url
						});
					});
				})
			}
    }

}

export { MainController }
