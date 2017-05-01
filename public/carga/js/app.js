var variabl;
angular
.module("phoenix-app",[])
.directive("fileread", [function () {
    return {
        scope: {
            fileread: "=",
            filetype: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader(), filetype;
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        var csv = loadEvent.target.result.split(/\r\n|\n/);
                        
                        if(filetype=='csv')
                            scope.fileread = csv;
                            scope.filetype = filetype;
                    });
                }
                filetype=changeEvent.target.files[0].name.substr(changeEvent.target.files[0].name.length - 3);
                reader.readAsText(changeEvent.target.files[0]);


            });
        }
    }
}])
.controller("controller", function ($scope, $http) {
    $scope.$watch("file", function(newValue, oldValue) {
    });
    $scope.find = function (){
                        $http.post('http://localhost:3000/find',{usuario:$scope.usuario}).then(function(res){
                            $scope.resultado=res.data;
                        });
                    };
});
