angular.module('DuckieTV.directives.episodewatched', [])

.directive('episodeWatched', function($rootScope, $document) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            episode: '='
        },
        template: ['<a ng-click="markWatched()" class="glyphicon" tooltip="{{getToolTip()}}" ng-class="{ \'glyphicon-eye-open\' : episode.get(\'watched\') ==  1, \'glyphicon-eye-close\' : episode.get(\'watched\') != 1 }" ng-transclude></a>'],
        link: function($scope) {

            $scope.tooltip = null;

            $scope.getToolTip = function() {
                return $scope.episode.get('watched') == 1 ? "You marked this episode as watched at " + new Date($scope.episode.get('watchedAt')).toLocaleString() : "Mark this episode as watched";
            }
            $scope.markWatched = function() {

                $scope.episode.set('watched', $scope.episode.get('watched') == '1' ? '0' : '1');
                $scope.episode.set('watchedAt', new Date().getTime());

                $scope.episode.Persist();
            }
        }
    }
})