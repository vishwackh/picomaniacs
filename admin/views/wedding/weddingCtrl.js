(function () {
    'use strict';

    angular
        .module('emsAdmin')
        .controller('weddingCtrl', weddingCtrl);

    weddingCtrl.$inject = ['$scope', '$http', '$rootScope', 'localStorageService', 'toaster', '$state'];

    /* @ngInject */
    function weddingCtrl($scope, $http, $rootScope, localStorageService, toaster, $state) {
        var count=0;
        $scope.ldata = {};
        $scope.myFile = [];
        $scope.getFileDetails = function (e) {
            $scope.myFile = [];
            $scope.$apply(function () {
                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    $scope.myFile.push(e.files[i])
                }
            });
        };

        function dataURLtoFile(dataurl) {
            if (dataurl) {
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {
                    type: mime
                });
            }
        }


        $scope.addImage = function (location, userForm) {
            count=0
            $scope.submitted = true;
            $scope.message = "Uploading......";

            if (userForm.$valid) {
                var file = $scope.myFile;

                console.log("Hello", $scope.imageList1);


                for (var index = 0; index < $scope.imageList1.length; index++) {
                    file = dataURLtoFile($scope.imageList1[index].compressed.dataURL);
                    var fd = new FormData();
                    var imageName = $scope.imageList1[index].file.name.split(".");
                    $scope.imageList1[index].fileName = imageName[0] + btoa(Math.random()).substring(0, 12) + "." + imageName[1];
                    //  btoa(Math.random()).substring(0,12);
                    fd.append("file", file, $scope.imageList1[index].fileName);
                        fd.append('name', location.name);
                    console.log($scope.imageList1[index]);

                    $http.post($rootScope.ApiUrl + 'addWeddingImage', fd, {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    }).then(function (data) {
                        if (data.data.status) {
                            count++;
                            $scope.ldata.name = '';
                            $scope.myFile = '';
                            userForm.$setPristine();
                            $scope.getImageList()
                        } else {
                            toaster.pop('error', "Error", "Rename image name & try again.");
                        }
                        if($scope.imageList1.length == count){
                            toaster.pop('success', "Success", "Image addded successfully.");
                        }
                    });


                }

                // var fd = new FormData();
                // fd.append('file', file);
                // fd.append('name', location.name);


            }
        };
        $scope.deleteImage = function (x) {
            $scope.delobj = x;
            $('#deletemodel').modal('show');
        };

        $scope.viewImage = function (x) {
            $scope.image = '../api/upload/' + x.url;

            $('#viewmodel').modal('show');
        }
 
        $scope.getImageList = function () {
            $http.get($rootScope.ApiUrl + 'weddingList').then(function (data) {
                if (data) {
                    $scope.imageList = angular.copy(data.data.data);
                }
            });
        };


        $scope.deleteImagerecord = function (customer) {
            $http.post($rootScope.ApiUrl + 'deleteweddingImage', customer).then(function (data) {

                if (data.data.status) {
                    toaster.pop('success', "Success", "Image Deleted successfully.");
                    $scope.getImageList()
                } else {
                    toaster.pop('error', "Error", "Error While deleting Image.");
                }
                $('#deletemodel').modal('hide');
            });
        };
 
        $scope.getImageList()

    }
})();