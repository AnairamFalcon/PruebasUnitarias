import { expect } from 'expect';
import { response } from 'express';
import sinon from 'sinon';
import request from 'supertest';
import app from '../src/app';

import GreetingBuilderMock from './test-doubles/GreetingBuilderMock';

/*El stub es como un metodo feik, paraque jale el codigo debe restaurarse, 
el sandbox funciona para no restaurarlos individualmente*/

describe('App tests', ()=>{

    const validName="Esteban"
    const invalidName="Grace"

    let sandbox:sinon.SinonSandbox;
    let greetingBuilderMock:GreetingBuilderMock;

    before(()=>{
        sandbox=sinon.createSandbox();
    });

    beforeEach(()=>{
        greetingBuilderMock=new GreetingBuilderMock(sandbox);
    });

    afterEach(()=>{
        sandbox.restore();
    });
    // after(()=>{});

    it('should respond 200 OK with a greeting message', async()=>{
        
        const expectedGreeting=`Hello ${validName}!`;
        const expectedBody={greeting: expectedGreeting}

        greetingBuilderMock.withBuildReturning(expectedGreeting);

        const response = await request(app).get(`/greeting/${validName}`).expect(200);
        expect(response.body).toEqual(expectedBody);
        greetingBuilderMock.expectConstructorWasCalledWithName(validName);
        greetingBuilderMock.expectBuildWasCalled();
    });

    it('should respond 400 BadRequest if a name is invalid', async ()=>{
        greetingBuilderMock.withBuildThrowingInvalidNameException();
        
        await request(app).
        get(`/greeting/${invalidName}`).expect(400);

        greetingBuilderMock.expectConstructorWasCalledWithName(invalidName);
        greetingBuilderMock.expectBuildWasCalled();
    });

    it('should respond 500 InternalServerError if an uknown error occurs', async ()=>{
        greetingBuilderMock.withBuildThrowingUknownError();
        
        await request(app).
        get(`/greeting/${validName}`).expect(500);

        greetingBuilderMock.expectConstructorWasCalledWithName(validName);
        greetingBuilderMock.expectBuildWasCalled();
    });

});