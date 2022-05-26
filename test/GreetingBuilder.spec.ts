import expect from 'expect';
import GreetingBuilder from '../src/GreetingBuilder';

describe('GreetingBuilder tests', ()=>{

    const validName='Esteban';
    const invalidName='Grace';

    it('should greet a person', () => {
        const expectedGreeting=`Hello ${validName}!`;

        const greetinBuilder = new GreetingBuilder(validName);
        const greeting = greetinBuilder.build();

        expect(greeting).toBe(expectedGreeting);
    });

    it('should throw InvalidNameException if a person name is "Grace"', () => {
        const greetingBuilder = new GreetingBuilder("Grace");
        expect(greetingBuilder.build.bind(greetingBuilder)).toThrow('InvalidNameException');
    });
});