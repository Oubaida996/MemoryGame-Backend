
const QuestionsModel = require('../schemas/question.schema');// It is module

class Question {

    //===================Start addQuestion methode
    addQuestion(question) {
        return new Promise((resolve, reject) => {
            question["createdAt"] = new Date();
            question["updatedAt"] = new Date();

            let newQuestion = new QuestionsModel(question);

            newQuestion.save().then((doc) => {
                resolve(doc);
            }).catch((err) => {
                reject(err);
            });


        });
    }
    //====================End addQuestion methode



    //===================Start getQuestions methode
    getQuestions() {

        return new Promise((resolve, reject) => {
            console.log('dddd');
            QuestionsModel.find({}).then((data) => {

                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //====================End getQuestions methode

}



module.exports = Question;