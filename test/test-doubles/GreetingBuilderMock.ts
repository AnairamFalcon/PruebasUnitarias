import sinon from 'sinon';
import { expect } from 'expect';
import GreetingBuilder, * as greetingBuilderModule from '../../src/GreetingBuilder';

export default class GreetingBuilderMock{

    private instanceStub:
    sinon.SinonStubbedInstance<greetingBuilderModule.default>;

    private constructorStub:sinon.SinonStub;

    public constructor (sandbox:sinon.SinonSandbox){
        this.instanceStub=sandbox.createStubInstance(
            greetingBuilderModule.default
            );

            this.constructorStub=sandbox.stub(
                greetingBuilderModule, 
                'default'
            );

            this.constructorStub.returns(this.instanceStub);
    }

    public withBuildReturning(expectedGreeting:string):void{
        this.instanceStub.build.returns(expectedGreeting);
    }

    public withBuildThrowingInvalidNameException():void{
        this.instanceStub.build.throws(new Error('InvalidNameException'));
    }

    public withBuildThrowingUknownError():void{
        this.instanceStub.build.throws(new Error('Avada Kedabvra'));
    }

    public expectConstructorWasCalledWithName(name:string):void{
        expect(this.constructorStub.calledOnce).toBe(true);
        const constructorCall=this.constructorStub.getCall(0);
        expect(constructorCall.args[0]).toBe(name);
    }

    public expectBuildWasCalled():void{
        expect(this.instanceStub.build.calledOnce).toBe(true);
    }
}