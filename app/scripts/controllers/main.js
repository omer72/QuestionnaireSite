'use strict';

angular.module('questionnaireSiteApp')
    .controller('MainCtrl', function ($scope) {
        $scope.questions = [];
        $scope.model={};
        $scope.answers={};
        $scope.done = "done";
        $scope.addQuestion = function(){
            var question = {};
            $scope.questions.push(question);
        }

        $scope.publishQuestion = function(){
            var temp = JSON.stringify($scope.questions);
            console.log(temp);
            $scope.model.questionnaireId = Math.floor((Math.random() * 100) + 1);
            var QuestionList = Parse.Object.extend("questionList");
            var questionList = new QuestionList();

            questionList.save({
                male_female_both: $scope.model.male_female_both,
                questionnaireId: $scope.model.questionnaireId.toString(),
                subject: $scope.model.subject
            }, {
                success: function(questionList) {
                    $scope.done += questionList;// The object was saved successfully.
                },
                error: function(gameScore, error) {
                    // The save failed.
                    // error is a Parse.Error with an error code and message.
                }
            });
            var Questionnaire = Parse.Object.extend("questionnaire");
            for (var index = 0 ; index < $scope.questions.length;index ++) {
                var questionnaire = new Questionnaire();

                questionnaire.save({
                    "answer_1": $scope.questions[index].answer_1,
                    "answer_1_value": $scope.questions[index].answer_1_value,
                    "answer_2": $scope.questions[index].answer_2,
                    "answer_2_value": $scope.questions[index].answer_2_value,
                    "answer_3": $scope.questions[index].answer_3,
                    "answer_3_value": $scope.questions[index].answer_3_value,
                    "answer_4": $scope.questions[index].answer_4,
                    "answer_4_value": $scope.questions[index].answer_4_value,
                    "question": $scope.questions[index].question,
                    "questionHeader": $scope.model.subject,
                    questionnaireId: $scope.model.questionnaireId.toString()
                }, {
                    success: function (questionnaire) {
                        $scope.done += questionnaire;// The object was saved successfully.
                    },
                    error: function (gameScore, error) {
                        // The save failed.
                        // error is a Parse.Error with an error code and message.
                    }
                });
            }
            var Answers = Parse.Object.extend("answers");
            var answers = new Answers();

            answers.save({
                "answer_1": $scope.answers.answer_1,
                "answer_2": $scope.answers.answer_2,
                "answer_3": $scope.answers.answer_3,
                "answer_4": $scope.answers.answer_4,
                questionnaireId: $scope.model.questionnaireId.toString()
            }, {
                success: function (answers) {
                    $scope.done += answers;// The object was saved successfully.
                },
                error: function (gameScore, error) {
                    // The save failed.
                    // error is a Parse.Error with an error code and message.
                }
            });
        }


    });
