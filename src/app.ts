import express from 'express';
import GreetingBuilder from './GreetingBuilder';

const app=express();

app.get('/greeting/:name', (req, res)=>{
    try{
        const {name}=req.params;

        const greetingBuilder=new GreetingBuilder(name);
        const greeting=greetingBuilder.build();

        res.status(200).json({greeting});
    }catch (e){
        if((<Error>e).message=='InvalidNameException'){
            res.status(400).end();
        }else{
            res.status(500).end();
        }
    }
});

export default app;