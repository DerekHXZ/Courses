// Generated by CoffeeScript 1.6.2
(function() {
  "use strict";  window.rootCtrl = function($scope, Course, Calendar) {
    var calendar, closeModal, openModal;

    calendar = new Calendar;
    $scope.hours = Calendar.hours;
    $scope.days = Calendar.days;
    $scope.semesters = Calendar.getValidSemesters();
    $scope.selectedSemester = $scope.semesters[0];
    $scope.searchResults = [];
    $scope.courseCalendar = calendar.courseCalendar;
    $scope.modalSection = {};
    calendar.fillFromURL($scope.selectedSemester);
    $scope.getTotalPoints = function() {
      return calendar.totalPoints();
    };
    $scope.search = function() {
      if (!$scope.searchQuery || $scope.searchQuery.length === 0) {
        $scope.clearResults();
        return;
      }
      return Course.search($scope.searchQuery, $scope.selectedSemester).then(function(data) {
        return $scope.searchResults = data;
      });
    };
    $scope.clearResults = function() {
      $scope.searchResults = [];
      return $scope.searchQuery = "";
    };
    $scope.courseSelect = function(course) {
      $scope.clearResults();
      return course.getSections().then(function(status) {
        if (!status) {
          return;
        }
        return calendar.addCourse(course);
      });
    };
    $scope.removeCourse = function(id) {
      closeModal();
      calendar.removeCourse(id);
      return calendar.updateURL();
    };
    $scope.sectionSelect = function(subsection) {
      var section;

      section = subsection.parent;
      if (section.parent.status) {
        calendar.sectionChosen(section);
        calendar.updateURL();
        return console.log('updating url');
      } else {
        openModal();
        return $scope.modalSection = section;
      }
    };
    closeModal = function() {
      return $('#sectionModal').foundation('reveal', 'close');
    };
    openModal = function() {
      return $('#sectionModal').foundation('reveal', 'open');
    };
    return $scope.changeSections = function(section) {
      var course;

      closeModal();
      course = section.parent;
      return calendar.changeSections(course);
    };
  };

}).call(this);
