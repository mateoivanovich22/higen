import questionsModel from "../models/questions.js";

class QuestionsManager {
    constructor() {}

    async createQuestion(email, question){
        const message = {
            email: email,
            question: question,
        }
        try {
            const pushQuestion = await questionsModel.create(message);

            return pushQuestion;

        } catch (error) {
            console.log(error);
            throw new Error;
        }
    }
}

export default QuestionsManager