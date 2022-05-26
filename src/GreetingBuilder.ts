export default class GreetingBuilder{

    private readonly name:string;

    public constructor(name:string){
        this.name=name;
    }

    public build():string{
        this.throwIfNameIsInvalid();
        
        return `Hello ${this.name}!`
    }

    private throwIfNameIsInvalid(): void{
        if(this.name==='Grace'){
            throw new Error('InvalidNameException');
        }
    }
}