var Help = require('./test-helper');
const Store = require('store');

describe('Authentication', () => {

    var Authentication;
    beforeEach(() => {
        Authentication = Help.bootstrapVue();
        Authentication.$router = {go: ()=> {}};
    });

    it('should exist', () => {
        expect(typeof Authentication).toBe('object');
    });

    it('should have a method for checking if a user is logged in', () => {
        expect(typeof Authentication.$isLoggedIn).toBe('function');
    });

    it('should have a method for logging a user in', () => {
        expect(typeof Authentication.$login).toBe('function');
    });

    it('should have a method for logging out a user', () => {
        expect(typeof Authentication.$logout).toBe('function');
    });

    it('should authenticate against the server when logging in', () => {
        spyOn(Authentication, '$http').and.callThrough();
        spyOn(Authentication, '$handleSuccessfullLogin');

        Authentication.$login('mail@testmail.se', 'somepassword');

        expect(Authentication.$http)
            .toHaveBeenCalled();
        expect(Authentication.$http)
            .toHaveBeenCalledWith({
                url: 'authenticate',
                method: 'POST',
                data:{
                    email: 'mail@testmail.se',
                    password: 'somepassword'
                }
            });
    });

    it('should store the authenticated user', () => {
        let response = {
            data: {token: 'faketoken'}
        };
        spyOn(Authentication.$router, 'go');

        Authentication.$handleSuccessfullLogin(response);

        expect(Authentication.$router.go)
            .toHaveBeenCalledWith(jasmine.objectContaining({path: '/admin'}));
    });

    it('should return false if user is not authenticated', () => {
        Authentication.$http = {headers: {common: []}};
        let authenticated = Authentication.$isLoggedIn();
        expect(authenticated).toBe(false);
    });

    it('should return false if authentication has timed out', () => {
        Authentication.$http = {headers: {common: []}};
        let timeout = Help.getDate(-5);
        Store.set('user', {
            token: 'Bearer faketoken',
            timeout: timeout
        });

        let authenticated = Authentication.$isLoggedIn();
        expect(authenticated).toBe(false);
    });

    it('should logout the user if authentication fails', () => {
        let timeout = Help.getDate(-5);
        spyOn(Authentication, '$logout');

        Store.set('user', {
            token: 'Bearer faketoken',
            timeout: timeout
        });

        Authentication.$isLoggedIn();

        expect(Authentication.$logout).toHaveBeenCalled();
    });

    it('should be able to logout a user', () => {
        Authentication.$http = {headers: {common: []}};
        let timeout = Help.getDate(5);
        Store.set('user', {
            token: 'Bearer faketoken',
            timeout: timeout
        });

        Authentication.$logout();

        expect(typeof Store.get('user')).toBe('undefined');
    });

    it('should return true if authentication has not timed out', () => {
        let timeout = Help.getDate(5);
        Store.set('user', {
            token: 'Bearer faketoken',
            timeout: timeout
        });

        let authenticated = Authentication.$isLoggedIn();
        expect(authenticated).toBe(true);
    });
});

