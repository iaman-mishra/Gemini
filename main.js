const { GoogleGenerativeAI } =require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const express=require("express");
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(express.json());


//------------------------------------------Endpoints------------------------------------------------------------

app.get("/",async(req,res)=>{
    res.send("Hello World Welcome to world of Mishra Ji ka Gemini");
})

app.get("/ask",async (req,res)=>{
    try {
        const prompt=req.body.question;
        const response = await genrate(prompt);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
});

const genrate=async (prompt)=>{
    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text();

    } catch (error) {
        console.log(error);
    }
}




app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});

