import { runDBCallAsync as createAccount} from '../signup/page';
import { runDBCallAsync as loginAccount } from '../login/page';

beforeAll(() => {
  // Mock window object
  global.window = {
    location: jest.fn(),
    confirm: jest.fn(),
    localStorage: {
      getItem: jest.fn(),
      setItem: jest.fn(),
    },
  };
});

afterAll(() => {
  delete global.window;
});

test('adding a valid user', async () => {
    const name = "TestName";
    const email = "TestEmail@gmail.com";
    const pass = "pass";
    const confirmPass = "pass";
    const setOpenInvalid = jest.fn();
    const setOpenIncomplete = jest.fn();
    const setOpenInconsistent = jest.fn();
      
    // Check console print
    const consoleSpy = jest.spyOn(console, 'log');

    const result = await createAccount(
        `http://localhost:3000/api/newregister?name=${name}&email=${email}&pass=${pass}&confirmPass=${confirmPass}`,
        setOpenInvalid,
        setOpenIncomplete,
        setOpenInconsistent
    )
    
    expect(consoleSpy).toHaveBeenCalledWith("login is valid!");
    consoleSpy.mockRestore();
});

test('adding an invalid user', async () => {
    const name = "TestName";
    const email = "TestEmail@gmail.com";
    const pass = "pass";
    const confirmPass = "pass";
    const setOpenInvalid = jest.fn();
    const setOpenIncomplete = jest.fn();
    const setOpenInconsistent = jest.fn();
      
    // Check console print
    const consoleSpy = jest.spyOn(console, 'log');

    const result = await createAccount(
        `http://localhost:3000/api/newregister?name=${name}&email=${email}&pass=${pass}&confirmPass=${confirmPass}`,
        setOpenInvalid,
        setOpenIncomplete,
        setOpenInconsistent
    )
    
    expect(consoleSpy).toHaveBeenCalledWith("not valid");
    consoleSpy.mockRestore();
});

test('adding an incomplete user', async () => {
    const name = "";
    const email = "TestEmailIncomplete@gmail.com";
    const pass = "pass";
    const confirmPass = "pass";
    const setOpenInvalid = jest.fn();
    const setOpenIncomplete = jest.fn();
    const setOpenInconsistent = jest.fn();
      
    // Check console print
    const consoleSpy = jest.spyOn(console, 'log');

    const result = await createAccount(
        `http://localhost:3000/api/newregister?name=${name}&email=${email}&pass=${pass}&confirmPass=${confirmPass}`,
        setOpenInvalid,
        setOpenIncomplete,
        setOpenInconsistent
    )
    
    expect(consoleSpy).toHaveBeenCalledWith("not complete");
    consoleSpy.mockRestore();
});

test('adding an inconsistent user', async () => {
    const name = "TestName";
    const email = "TestEmailInconsistent@gmail.com";
    const pass = "pass";
    const confirmPass = "pas";
    const setOpenInvalid = jest.fn();
    const setOpenIncomplete = jest.fn();
    const setOpenInconsistent = jest.fn();
      
    // Check console print
    const consoleSpy = jest.spyOn(console, 'log');

    const result = await createAccount(
        `http://localhost:3000/api/newregister?name=${name}&email=${email}&pass=${pass}&confirmPass=${confirmPass}`,
        setOpenInvalid,
        setOpenIncomplete,
        setOpenInconsistent
    )
    
    expect(consoleSpy).toHaveBeenCalledWith("not consistent");
    consoleSpy.mockRestore();
});

test('logging in success', async () => {

    // Mock alert
    global.alert = jest.fn();

    const email = "TestEmail@gmail.com";
    const pass = "pass";
    const setOpen = jest.fn();

    const consoleSpy = jest.spyOn(console, 'log');

    const result = await loginAccount(`http://localhost:3000/api/login?email=${email}&pass=${pass}`, setOpen)

    expect(consoleSpy).toHaveBeenCalledWith("login valid");
    consoleSpy.mockRestore();
})

test('logging in fail', async () => {

    // Mock alert
    global.alert = jest.fn();

    const email = "TestEmail@gmail.com";
    const pass = "pas";
    const setOpen = jest.fn();

    const consoleSpy = jest.spyOn(console, 'log');

    const result = await loginAccount(`http://localhost:3000/api/login?email=${email}&pass=${pass}`, setOpen)

    expect(consoleSpy).toHaveBeenCalledWith("not valid");
    consoleSpy.mockRestore();
})

test('deleting user exists', async () => {

    const email = "TestEmail@gmail.com";
    const pass = "pass";

    const result = await fetch(`http://localhost:3000/api/deleteUser?email=${email}&pass=${pass}`);

    const data = await result.json();
    expect(data.data).toBe("true")
})

test('deleting user does no exist', async () => {

    const email = "TestEmail@gmail.com";
    const pass = "pass";

    const result = await fetch(`http://localhost:3000/api/deleteUser?email=${email}&pass=${pass}`);

    const data = await result.json();
    expect(data.data).toBe("false")
})
